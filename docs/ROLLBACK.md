# Rollback Procedures

Quick reference for rolling back failed or incorrect new-hire provisions.

## When to Rollback

- Provision failed halfway through
- Wrong user information entered
- User needs to be reprovisioned with different settings
- Testing/sandbox cleanup

## Quick Rollback (Automated)

### Using Azure Function

```bash
curl -X POST https://func-newhire-<customer>.azurewebsites.net/api/rollback \
  -H "Content-Type: application/json" \
  -H "x-functions-key: <key>" \
  -d '{
    "upn": "john.doe@customer.com",
    "groups": ["group-id-1", "group-id-2"],
    "siteId": "site-id-123",
    "correlationId": "original-correlation-id"
  }'
```

**What This Does:**
- Disables the user account
- Removes license assignments
- Removes from groups
- Attempts to delete Teams site (best-effort)

## Manual Rollback Steps

If automated rollback fails, perform manual cleanup:

### Step 1: Disable User

```powershell
Connect-MgGraph -Scopes "User.ReadWrite.All"

# Disable account
Update-MgUser -UserId "john.doe@customer.com" -AccountEnabled:$false

# OR delete user (soft delete, recoverable for 30 days)
Remove-MgUser -UserId "john.doe@customer.com"
```

### Step 2: Remove Licenses

```powershell
# Get assigned licenses
$user = Get-MgUser -UserId "john.doe@customer.com" -Property AssignedLicenses
$user.AssignedLicenses | Format-Table SkuId

# Remove all licenses
Set-MgUserLicense -UserId "john.doe@customer.com" `
  -AddLicenses @() `
  -RemoveLicenses @($user.AssignedLicenses.SkuId)
```

### Step 3: Remove from Groups

```powershell
# Get user's groups
$groups = Get-MgUserMemberOf -UserId "john.doe@customer.com"

# Remove from each group
foreach ($group in $groups) {
  Remove-MgGroupMemberByRef -GroupId $group.Id -DirectoryObjectId $user.Id
}
```

### Step 4: Delete Teams Site

```powershell
Connect-PnPOnline -Url "https://<customer>.sharepoint.com" -Interactive

# Find and delete the team
$team = Get-PnPTeam | Where-Object { $_.DisplayName -like "*Onboarding*john.doe*" }
Remove-PnPTeam -Identity $team.GroupId -Force
```

### Step 5: Clean Up SharePoint Logs

```powershell
# Mark run as rolled back
$runItem = Get-PnPListItem -List "Onboarding Runs" -Query "<View><Query><Where><Eq><FieldRef Name='UserPrincipalName'/><Value Type='Text'>john.doe@customer.com</Value></Eq></Where></Query></View>"

Set-PnPListItem -List "Onboarding Runs" -Identity $runItem.Id -Values @{
  "Status" = "Rolled Back"
  "ErrorMessage" = "Manual rollback performed"
}
```

## Troubleshooting Rollback

### User Not Found

**Error:** User with UPN not found

**Cause:** User was never created or already deleted

**Action:** Check Azure AD deleted users, restore if needed:
```powershell
Restore-MgDirectoryDeletedItem -DirectoryObjectId <user-id>
```

### Insufficient Permissions

**Error:** Insufficient privileges to complete operation

**Cause:** Missing admin permissions

**Action:** Re-authenticate with higher privileges:
```powershell
Connect-MgGraph -Scopes "User.ReadWrite.All","Group.ReadWrite.All","Directory.ReadWrite.All"
```

### Site Deletion Failed

**Error:** Cannot delete Teams site

**Cause:** Site is still in use or has retention policy

**Action:** Manually delete from SharePoint Admin Center or wait 24 hours and retry

## Partial Rollback

If only specific components need rollback:

**License Only:**
```powershell
Set-MgUserLicense -UserId "<upn>" -RemoveLicenses @("<sku-id>") -AddLicenses @()
```

**Groups Only:**
```powershell
Remove-MgGroupMemberByRef -GroupId "<group-id>" -DirectoryObjectId "<user-id>"
```

**Teams Site Only:**
```powershell
Remove-PnPTeam -Identity "<team-id>" -Force
```

## Prevention

To avoid needing rollbacks:

1. **Validate input** before submission
2. **Use test accounts** in sandbox first
3. **Review details** before clicking submit
4. **Enable approvals** in Power Automate flow (optional)

## Recovery

If rollback was done in error:

1. Check Azure AD deleted users (recoverable for 30 days)
2. Restore user: `Restore-MgDirectoryDeletedItem -DirectoryObjectId <id>`
3. Re-run provision flow with same details
4. Reassign to original groups

## Logging

All rollbacks should be logged:
- Update "Onboarding Runs" SharePoint list
- Add correlation ID reference
- Note reason for rollback
- Document who performed rollback

---

**Always test rollback procedures in sandbox before running in production!**
