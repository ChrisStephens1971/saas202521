# SharePoint List Provisioning

Idempotent PowerShell script to provision the "New-Hire Requests" SharePoint list from JSON schema.

## Overview

This script creates or updates a SharePoint list with fields defined in `sharepoint-list-schema.json`. Running the script multiple times is safe - it only applies changes when needed (idempotent).

## Prerequisites

- **PnP.PowerShell module**: `Install-Module -Name PnP.PowerShell -Scope CurrentUser`
- **SharePoint site**: HR site or designated site for new-hire workflows
- **Permissions**: Site Owner or Site Collection Admin

## Installation

### Install PnP.PowerShell

```powershell
# Install module (one-time)
Install-Module -Name PnP.PowerShell -Scope CurrentUser

# Verify installation
Get-Module -Name PnP.PowerShell -ListAvailable
```

## Usage

### 1. Connect to SharePoint

```powershell
# Interactive login (recommended for first-time)
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/HR" -Interactive

# Or use app-only authentication
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/HR" `
    -ClientId "your-client-id" `
    -ClientSecret "your-client-secret" `
    -Tenant "contoso.onmicrosoft.com"
```

### 2. Run Provisioning Script

```powershell
# Dry run (see what would change)
.\provision-sharepoint.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/HR" `
    -WhatIf

# Apply changes
.\provision-sharepoint.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/HR"

# With verbose logging
.\provision-sharepoint.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/HR" `
    -Verbose

# Custom list name
.\provision-sharepoint.ps1 `
    -SiteUrl "https://contoso.sharepoint.com/sites/HR" `
    -ListName "Custom Onboarding Requests"
```

### 3. Verify Provisioning

```powershell
# Check list exists
Get-PnPList -Identity "New-Hire Requests"

# View list fields
Get-PnPField -List "New-Hire Requests" | Select-Object Title, TypeAsString, Required
```

## List Schema

The list is created with the following fields (from `sharepoint-list-schema.json`):

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| FirstName | Text | Yes | New hire's first name |
| LastName | Text | Yes | New hire's last name |
| PersonalEmail | Text | Yes | Personal email for onboarding communications |
| ManagerUPN | Text | Yes | Manager's UPN (user principal name) |
| Role | Choice | No | Employee type: Employee, Contractor, Intern |
| Department | Text | No | Department name |
| StartDate | DateTime | Yes | New hire start date |

## Idempotency

The script is **idempotent** - you can run it multiple times safely:

**First run:**
```
Creating new list: New-Hire Requests
Adding field: FirstName
Adding field: LastName
...
✅ Provisioning complete: Changes applied
```

**Second run (no changes):**
```
List already exists: New-Hire Requests
Field already exists: FirstName
Field already exists: LastName
...
✅ Provisioning complete: No changes needed (idempotent)
```

**Run after schema update:**
```
List already exists: New-Hire Requests
Field already exists: FirstName
Adding field: NewFieldName
✅ Provisioning complete: Changes applied
```

## Logging

All operations are logged to `provision.log` in the same directory:

```
[2025-11-05 10:30:00] [INFO] === SharePoint List Provisioning Started ===
[2025-11-05 10:30:01] [INFO] Connected to SharePoint site: https://contoso.sharepoint.com/sites/HR
[2025-11-05 10:30:02] [INFO] List already exists: New-Hire Requests
[2025-11-05 10:30:03] [INFO] Field already exists: FirstName
...
[2025-11-05 10:30:10] [INFO] === Provisioning complete: No changes needed ===
```

## Parameters

### -SiteUrl (Required)
SharePoint site URL where the list will be created.

```powershell
-SiteUrl "https://contoso.sharepoint.com/sites/HR"
```

### -ListName (Optional)
Name of the list to create/update. Default: "New-Hire Requests"

```powershell
-ListName "Custom List Name"
```

### -SchemaPath (Optional)
Path to sharepoint-list-schema.json. Default: `../../project-brief/automation/sharepoint-list-schema.json`

```powershell
-SchemaPath "C:\path\to\custom-schema.json"
```

### -WhatIf (Optional)
Dry run mode - shows what changes would be made without applying them.

```powershell
-WhatIf
```

### -Verbose (Optional)
Enable verbose logging to console.

```powershell
-Verbose
```

## Troubleshooting

### Error: "Not connected to SharePoint"
**Solution:** Run `Connect-PnPOnline` first before running the script.

```powershell
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/HR" -Interactive
```

### Error: "Schema file not found"
**Solution:** Ensure you're running the script from the `infra/sharepoint` directory, or provide the full path to the schema file.

```powershell
-SchemaPath "C:\full\path\to\sharepoint-list-schema.json"
```

### Error: "Access denied"
**Solution:** Ensure you have Site Owner or Site Collection Admin permissions on the target site.

### Fields not updating
**Solution:** Some field properties (like type) cannot be changed after creation. You may need to delete and recreate the field.

```powershell
Remove-PnPField -List "New-Hire Requests" -Identity "FieldName" -Force
.\provision-sharepoint.ps1 -SiteUrl "..." # Re-run to recreate
```

## Updating the Schema

To add or modify fields:

1. Edit `project-brief/automation/sharepoint-list-schema.json`
2. Add new field definitions or modify existing ones
3. Run the provisioning script again

```json
{
  "ListName": "New-Hire Requests",
  "Fields": [
    {
      "name": "NewFieldName",
      "type": "Text",
      "required": false
    }
  ]
}
```

## Supported Field Types

- **Text**: Single line of text
- **DateTime**: Date and time picker
- **Choice**: Dropdown with predefined options

To add more field types, extend the switch statement in the script.

## Integration with Power Automate

This list is designed to trigger the Power Automate flow when a new item is created:

1. User adds new hire request to this SharePoint list
2. Power Automate flow triggers automatically
3. Flow calls Azure Function `/api/provision` endpoint
4. User is created in M365 with license and groups

## Testing

### Test with WhatIf

```powershell
# See what would happen without making changes
.\provision-sharepoint.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/HR" -WhatIf -Verbose
```

### Test Idempotency

```powershell
# Run twice, second run should show "No changes needed"
.\provision-sharepoint.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/HR"
.\provision-sharepoint.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/HR"
```

### Verify Field Creation

```powershell
# List all fields
Get-PnPField -List "New-Hire Requests" | Select-Object Title, TypeAsString, Required | Format-Table

# Check specific field
Get-PnPField -List "New-Hire Requests" -Identity "FirstName"
```

## Cleanup

To remove the list (for testing):

```powershell
Remove-PnPList -Identity "New-Hire Requests" -Force
```

## Next Steps

- **PR 3**: Teams onboarding template provisioning
- **PR 4**: Power Automate flow that triggers on new items in this list
- **PR 5**: Azure Function integration for user provisioning

## Related Documentation

- PnP PowerShell: https://pnp.github.io/powershell/
- SharePoint REST API: https://learn.microsoft.com/sharepoint/dev/sp-add-ins/working-with-lists-and-list-items-with-rest
- Schema file: `project-brief/automation/sharepoint-list-schema.json`

---

**Status:** PR 2 - Idempotent SharePoint provisioning complete
