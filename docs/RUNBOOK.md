# M365 New-Hire Onboarding Automation - Runbook

**Version:** 1.0
**Last Updated:** 2025-11-05
**Deployment Time:** 48 hours

---

## Overview

This runbook provides step-by-step instructions for deploying the complete M365 new-hire onboarding automation (FTD Pack) to a customer tenant.

**What This Automates:**
- User provisioning in Azure AD
- License assignment
- Group memberships
- Teams workspace creation
- Manager notifications
- Run logging and KPIs

**Time Savings:** Reduces onboarding from 5 days to ≤1 day
**Manual Steps Eliminated:** 10-20 per hire

---

## Prerequisites

### Customer Requirements

**Microsoft 365:**
- Microsoft 365 E3 or E5 licenses
- SharePoint Online
- Microsoft Teams
- Power Automate (Premium connector license for HTTP actions)

**Permissions Needed:**
- Global Administrator or equivalent for initial setup
- Application Administrator for app registrations
- SharePoint Site Owner for HR site

### Development Environment

**Tools Required:**
- Azure CLI 2.60+
- PowerShell 7+
- PnP.PowerShell module
- Node.js 18+ (for Functions local dev)
- Azure Functions Core Tools v4

**Installation:**
```powershell
# Azure CLI
winget install Microsoft.AzureCLI

# PowerShell 7
winget install Microsoft.PowerShell

# PnP.PowerShell
Install-Module -Name PnP.PowerShell -Scope CurrentUser

# Node.js
winget install OpenJS.NodeJS.LTS

# Azure Functions Core Tools
npm install -g azure-functions-core-tools@4
```

---

## Deployment Steps (48-Hour Timeline)

### Phase 1: Azure Setup (Hours 0-4)

#### Step 1.1: Create Azure Resources

```bash
# Login to Azure
az login

# Set subscription
az account set --subscription "<SUBSCRIPTION_ID>"

# Create resource group
az group create \
  --name rg-newhire-automation \
  --location eastus

# Create Function App
az functionapp create \
  --name func-newhire-<customer-name> \
  --resource-group rg-newhire-automation \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --storage-account <storage-account-name>

# Create Application Insights
az monitor app-insights component create \
  --app ai-newhire-automation \
  --location eastus \
  --resource-group rg-newhire-automation
```

#### Step 1.2: Register Azure AD Application

1. Go to Azure Portal → Azure Active Directory → App registrations
2. Click "New registration"
   - Name: `M365-NewHire-Automation`
   - Supported account types: Single tenant
   - Redirect URI: Leave blank
3. After creation, note:
   - Application (client) ID
   - Directory (tenant) ID
4. Go to "Certificates & secrets"
   - Create new client secret
   - Note the secret value (shown only once)
5. Go to "API permissions"
   - Add permissions:
     - `User.ReadWrite.All`
     - `Group.ReadWrite.All`
     - `Directory.ReadWrite.All`
     - `Team.Create`
   - Click "Grant admin consent"

#### Step 1.3: Deploy Azure Functions

```bash
cd apps/azfunc-provision

# Install dependencies
npm install

# Build
npm run build

# Deploy
func azure functionapp publish func-newhire-<customer-name>

# Configure app settings
az functionapp config appsettings set \
  --name func-newhire-<customer-name> \
  --resource-group rg-newhire-automation \
  --settings \
    GRAPH_TENANT_ID="<tenant-id>" \
    GRAPH_CLIENT_ID="<client-id>" \
    GRAPH_CLIENT_SECRET="<client-secret>" \
    FTD_DOMAIN="customer.com" \
    FTD_FROM_ADDRESS="noreply@customer.com"
```

**Validation:**
```bash
# Get function URL
az functionapp function show \
  --name func-newhire-<customer-name> \
  --resource-group rg-newhire-automation \
  --function-name provision

# Test provision endpoint
curl -X POST https://func-newhire-<customer-name>.azurewebsites.net/api/provision \
  -H "Content-Type: application/json" \
  -H "x-functions-key: <function-key>" \
  -d '{"firstName":"Test","lastName":"User","jobTitle":"Engineer","department":"IT"}'
```

---

### Phase 2: SharePoint Setup (Hours 4-8)

#### Step 2.1: Connect to SharePoint

```powershell
# Connect to SharePoint HR site
Connect-PnPOnline -Url "https://<customer>.sharepoint.com/sites/HR" -Interactive
```

#### Step 2.2: Provision Lists

```powershell
cd infra/sharepoint

# Dry run first
.\provision-sharepoint.ps1 `
  -SiteUrl "https://<customer>.sharepoint.com/sites/HR" `
  -WhatIf -Verbose

# Apply provisioning
.\provision-sharepoint.ps1 `
  -SiteUrl "https://<customer>.sharepoint.com/sites/HR" `
  -Verbose
```

**Validation:**
```powershell
# Verify list exists
Get-PnPList -Identity "New-Hire Requests"

# Check fields
Get-PnPField -List "New-Hire Requests" | Select-Object Title, TypeAsString, Required
```

#### Step 2.3: Create Run Log List

```powershell
# Create "Onboarding Runs" list for logging
New-PnPList -Title "Onboarding Runs" -Template GenericList

# Add fields
Add-PnPField -List "Onboarding Runs" -DisplayName "CorrelationId" -InternalName "CorrelationId" -Type Text
Add-PnPField -List "Onboarding Runs" -DisplayName "UserPrincipalName" -InternalName "UserPrincipalName" -Type Text
Add-PnPField -List "Onboarding Runs" -DisplayName "FirstName" -InternalName "FirstName" -Type Text
Add-PnPField -List "Onboarding Runs" -DisplayName "LastName" -InternalName "LastName" -Type Text
Add-PnPField -List "Onboarding Runs" -DisplayName "Department" -InternalName "Department" -Type Text
Add-PnPField -List "Onboarding Runs" -DisplayName "Status" -InternalName "Status" -Type Choice -Choices "Success","Failed"
Add-PnPField -List "Onboarding Runs" -DisplayName "ErrorMessage" -InternalName "ErrorMessage" -Type Note
Add-PnPField -List "Onboarding Runs" -DisplayName "CompletedAt" -InternalName "CompletedAt" -Type DateTime
Add-PnPField -List "Onboarding Runs" -DisplayName "DurationSeconds" -InternalName "DurationSeconds" -Type Number
```

---

### Phase 3: Teams Template (Hours 8-12)

```powershell
cd infra/teams

# Connect if not already
Connect-PnPOnline -Url "https://<customer>.sharepoint.com" -Interactive

# Dry run
.\apply-teams-template.ps1 -DryRun -Verbose

# Create template team
.\apply-teams-template.ps1 -DisplayNamePrefix "Onboarding-Template" -Verbose
```

**Note the returned Team ID and Site ID** for Power Automate configuration.

---

### Phase 4: Power Automate Flow (Hours 12-24)

#### Step 4.1: Import Flow

1. Go to https://make.powerautomate.com
2. Select target environment
3. Click "My flows" → "Import" → "Import Package (Legacy)"
4. Upload `flows/newhire/definition.json`
5. Configure connections:
   - SharePoint Online: Connect to HR site
   - Microsoft Teams: Connect
   - Office 365 Outlook: Connect
6. Click "Import"

#### Step 4.2: Configure Flow

Edit the imported flow and update:

**SharePoint Trigger:**
```
Site Address: https://<customer>.sharepoint.com/sites/HR
List Name: New-Hire Requests
```

**HTTP Action (Provision):**
```
URI: https://func-newhire-<customer-name>.azurewebsites.net/api/provision
Headers:
  x-functions-key: <function-key>
```

**Teams Message:**
```
Team: <Team ID from Step 3>
Channel: General (or custom channel ID)
```

**Run Log (Create Item):**
```
Site Address: https://<customer>.sharepoint.com/sites/HR
List Name: Onboarding Runs
```

**Email Actions:**
```
Manager notification: To field uses ManagerUPN from trigger
Failure alert: Update recipient to IT support email
```

#### Step 4.3: Test Flow

```powershell
# Add test item to SharePoint
Add-PnPListItem -List "New-Hire Requests" -Values @{
  "FirstName" = "Test"
  "LastName" = "User"
  "PersonalEmail" = "test@personal.com"
  "ManagerUPN" = "manager@customer.com"
  "Role" = "Employee"
  "Department" = "IT"
  "StartDate" = (Get-Date).AddDays(7)
}
```

Monitor:
1. Power Automate run history
2. Azure Function logs (Application Insights)
3. SharePoint "Onboarding Runs" list
4. Manager's email inbox

---

### Phase 5: Documentation & Training (Hours 24-36)

#### Step 5.1: Create Customer Documentation

Create these documents for customer:

1. **User Guide**: How to add new hire requests
2. **Manager Guide**: What to expect, how to track progress
3. **IT Admin Guide**: Troubleshooting, common issues
4. **Rollback Procedures**: How to undo failed provisions

#### Step 5.2: Train Customer Team

**HR Team:**
- How to add new hire requests to SharePoint
- What information is required
- How to track status

**IT Team:**
- Where to find logs (SharePoint, App Insights)
- How to troubleshoot failures
- Rollback procedures
- When to escalate

**Managers:**
- Notification emails explained
- What to do on new hire's first day
- How to access onboarding Teams workspace

---

### Phase 6: Go-Live & Monitoring (Hours 36-48)

#### Step 6.1: Production Cutover

```powershell
# Verify all components
.\validate-deployment.ps1

# Enable flow for production
Set-AdminPowerAppEnvironment -EnvironmentName <env-id> -EnableFlows $true
```

#### Step 6.2: Monitor First Runs

Watch closely for first 3-5 production runs:
- Check run logs after each provision
- Verify users can log in
- Confirm Teams workspaces created
- Validate manager notifications sent

#### Step 6.3: Set Up Alerts

Configure Azure Monitor alerts:
```bash
# Alert on Function failures
az monitor metrics alert create \
  --name "Function Provision Failures" \
  --resource-group rg-newhire-automation \
  --scopes "/subscriptions/<sub-id>/resourceGroups/rg-newhire-automation/providers/Microsoft.Web/sites/func-newhire-<customer-name>" \
  --condition "count errors > 0" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --action <action-group-id>
```

---

## Post-Deployment

### Week 1: Close Monitoring

- Review all run logs daily
- Track success/failure rates
- Gather feedback from HR and managers
- Document any issues

### Week 2-4: Optimization

- Identify bottlenecks
- Optimize slow steps
- Add additional workflows if requested
- Update documentation based on feedback

---

## Troubleshooting

### Issue: Function Returns 500 Error

**Symptoms:** Power Automate shows HTTP 500 from provision endpoint

**Diagnosis:**
```bash
# Check Application Insights logs
az monitor app-insights query \
  --app ai-newhire-automation \
  --analytics-query "traces | where severityLevel > 2 | order by timestamp desc | take 20"
```

**Common Causes:**
1. Missing Graph API permissions
2. Invalid tenant/client credentials
3. User already exists
4. No available licenses

**Resolution:**
- Verify app registration permissions and admin consent
- Check function app settings (GRAPH_TENANT_ID, etc.)
- Review detailed error in Application Insights

### Issue: SharePoint List Not Triggering Flow

**Symptoms:** New items added but flow doesn't run

**Diagnosis:**
1. Check flow is turned ON in Power Automate
2. Verify SharePoint connection is valid
3. Check flow run history for errors

**Resolution:**
```powershell
# Reconnect SharePoint connection in flow
# Re-save and test flow trigger
```

### Issue: Teams Workspace Not Created

**Symptoms:** User provisioned but no Teams notification

**Diagnosis:**
- Check Teams connection in Power Automate
- Verify Team ID is correct
- Check user has Teams license

**Resolution:**
- Update Team ID in flow
- Ensure Teams license assigned to new user
- Manually create workspace and re-run flow

---

## Rollback Procedures

See `docs/ROLLBACK.md` for detailed rollback steps.

**Quick Rollback:**
```bash
# Call rollback endpoint
curl -X POST https://func-newhire-<customer-name>.azurewebsites.net/api/rollback \
  -H "Content-Type: application/json" \
  -H "x-functions-key: <function-key>" \
  -d '{"upn":"user@customer.com","groups":["group-id"],"correlationId":"abc-123"}'
```

---

## KPIs and Reporting

See `ops/kpi-dashboard.sql` for KPI extraction queries.

**Key Metrics:**
- Time-to-productive: Target ≤1 day
- Success rate: Target >95%
- Manual steps eliminated: 10-20 per hire
- Error rate: Target <5%

---

## Support Contacts

**Technical Issues:**
- Azure Function errors: Check Application Insights
- Power Automate failures: Check run history
- SharePoint issues: Contact SharePoint admin

**Escalation Path:**
1. IT Admin (customer)
2. Implementation team (us)
3. Microsoft Support (if platform issue)

---

## Appendix

### A. Required Licenses

Per new hire:
- Microsoft 365 E3 or E5 license
- Teams license (included in E3/E5)

Per tenant (one-time):
- Power Automate Premium (for HTTP connector)

### B. Security Considerations

- App secret rotates every 90 days
- Function keys should be secured in Key Vault
- Audit logs enabled for all Graph API calls
- Least privilege: only required Graph permissions

### C. Performance Benchmarks

- Function execution: <5 seconds (provision)
- SharePoint trigger latency: <1 minute
- End-to-end: <10 minutes (trigger to completion)

---

**Document Version:** 1.0
**Last Reviewed:** 2025-11-05
**Next Review:** 2025-12-05
