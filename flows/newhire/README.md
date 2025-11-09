# Power Automate New-Hire Flow

Automated workflow that triggers when a new hire request is added to SharePoint and orchestrates the entire onboarding process.

## Flow Overview

**Trigger:** When item created in SharePoint "New-Hire Requests" list

**Actions:**
1. Generate correlation ID for tracking
2. Compose provision payload from SharePoint item
3. Call Azure Function `/api/provision` endpoint
4. Post welcome message to Teams onboarding channel
5. Log run details to SharePoint "Onboarding Runs" list
6. Send success email to manager
7. Handle failures with error logging and alerts

## Import Instructions

1. Open Power Automate (https://make.powerautomate.com)
2. Click "My flows" → "Import" → "Import Package (Legacy)"
3. Upload `definition.json`
4. Configure connections:
   - SharePoint Online
   - Microsoft Teams
   - Office 365 Outlook
5. Update parameters:
   - `functionAppUrl`: Your Azure Function URL
   - SharePoint site URLs (replace YOURSITE placeholders)
   - Teams channel IDs
6. Save and turn on the flow

## Configuration Required

Before running, update these values in the flow:

- **SharePoint Site URL**: Replace `https://YOURSITE.sharepoint.com/sites/HR`
- **Function App URL**: Set in parameters
- **Teams Channel ID**: Get from Teams → More options → Get link to channel
- **Notification Email**: Update failure alert recipient

## Testing

1. Add test item to "New-Hire Requests" SharePoint list
2. Monitor flow run history in Power Automate
3. Check "Onboarding Runs" list for logs
4. Verify user created in Azure AD
5. Check Teams for welcome message

## Error Handling

Flow includes comprehensive error handling:
- **Success**: Manager gets notification email with user details
- **Failure**: IT support gets urgent alert with correlation ID and error details
- **All runs**: Logged to SharePoint with status and duration

## Next Steps

- **PR 5**: Real Graph API implementation in Azure Functions
- **PR 6**: Complete runbook with flow troubleshooting guide
