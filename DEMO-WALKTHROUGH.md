# How It Works - Complete Walkthrough

## 🎬 End-to-End Flow

### Step-by-Step: From New Hire Request to Provisioned User

```
┌─────────────────────────────────────────────────────────────────┐
│                     NEW HIRE ONBOARDING FLOW                     │
└─────────────────────────────────────────────────────────────────┘

1. HR adds new hire to SharePoint
   ↓
2. Power Automate detects new item (trigger)
   ↓
3. Flow generates correlation ID for tracking
   ↓
4. Flow calls Azure Function /api/provision
   ↓
5. Function creates user in Azure AD
   ↓
6. Function assigns M365 license
   ↓
7. Function adds user to groups
   ↓
8. Function returns success + UPN
   ↓
9. Flow posts welcome message to Teams
   ↓
10. Flow logs run to SharePoint "Onboarding Runs"
   ↓
11. Flow emails manager with details
   ↓
12. New hire can log in! ✅
```

**Time:** < 10 minutes (vs 5 days manual)

---

## 📊 Component Breakdown

### Component 1: SharePoint List (Request Intake)

**Purpose:** HR submits new hire requests

**Location:** `https://contoso.sharepoint.com/sites/HR`

**List Name:** New-Hire Requests

**Fields:**
```
FirstName:      John
LastName:       Doe
PersonalEmail:  john.doe@personal.com
ManagerUPN:     jane.smith@contoso.com
Role:           Employee (dropdown: Employee, Contractor, Intern)
Department:     Engineering
StartDate:      2025-11-15
```

**How to create:** Run `infra/sharepoint/provision-sharepoint.ps1`

**What happens:** When HR adds an item, Power Automate triggers automatically

---

### Component 2: Power Automate Flow (Orchestration)

**Purpose:** Orchestrates the entire workflow

**Trigger:** "When an item is created" in SharePoint "New-Hire Requests"

**Key Actions:**

**Action 1: Initialize Variables**
```json
{
  "correlationId": "guid()"
}
```

**Action 2: Compose Payload**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "jobTitle": "Employee",
  "department": "Engineering",
  "manager": "jane.smith@contoso.com",
  "startDate": "2025-11-15",
  "personalEmail": "john.doe@personal.com"
}
```

**Action 3: HTTP POST to Azure Function**
```http
POST https://func-newhire-contoso.azurewebsites.net/api/provision
Headers:
  Content-Type: application/json
  x-functions-key: <function-key>
Body: <payload from Action 2>
```

**Action 4: Parse Response**
```json
{
  "upn": "john.doe@contoso.com",
  "correlationId": "abc-123-def-456",
  "userId": "user-id-789",
  "groups": ["group-id-1", "group-id-2"],
  "licenseAssigned": true
}
```

**Action 5: Post to Teams**
```
Welcome john.doe@contoso.com! 🎉
Your account is ready for your first day on 2025-11-15.

Next Steps:
- Check email for login instructions
- Complete IT setup checklist
- Review HR onboarding materials
```

**Action 6: Log to SharePoint**
```
List: Onboarding Runs
Fields:
  CorrelationId: abc-123-def-456
  UserPrincipalName: john.doe@contoso.com
  FirstName: John
  LastName: Doe
  Department: Engineering
  Status: Success
  CompletedAt: 2025-11-05 14:30:00
  DurationSeconds: 45
```

**Action 7: Email Manager**
```
To: jane.smith@contoso.com
Subject: New hire onboarding complete: John Doe

The onboarding automation has successfully provisioned john.doe@contoso.com.

Details:
- UPN: john.doe@contoso.com
- User ID: user-id-789
- Correlation ID: abc-123-def-456

The new hire can log in and access their onboarding Teams workspace.
```

---

### Component 3: Azure Function (User Provisioning)

**Purpose:** Creates user in Azure AD with Microsoft Graph API

**Endpoints:**
- `/api/provision` - Create user
- `/api/rollback` - Undo provision

**How `/api/provision` Works:**

**Step 1: Validate Payload**
```typescript
// Check required fields
if (!firstName || !lastName || !jobTitle || !department) {
  return 400 Bad Request
}

// Validate name format (no special characters)
if (firstName contains invalid chars) {
  return 400 Bad Request
}
```

**Step 2: Generate UPN**
```typescript
const upn = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@contoso.com`
// Result: john.doe@contoso.com
```

**Step 3: Get Graph Access Token**
```typescript
// Using MSAL with client credentials
const credential = new ClientSecretCredential(
  tenantId,    // from env: GRAPH_TENANT_ID
  clientId,    // from env: GRAPH_CLIENT_ID
  clientSecret // from env: GRAPH_CLIENT_SECRET
)

const token = await credential.getToken("https://graph.microsoft.com/.default")
```

**Step 4: Create User in Azure AD**
```typescript
// Graph API call
POST https://graph.microsoft.com/v1.0/users
{
  "accountEnabled": true,
  "displayName": "John Doe",
  "mailNickname": "john.doe",
  "userPrincipalName": "john.doe@contoso.com",
  "passwordProfile": {
    "forceChangePasswordNextSignIn": true,
    "password": "<generated-strong-password>"
  },
  "givenName": "John",
  "surname": "Doe",
  "jobTitle": "Employee",
  "department": "Engineering"
}
```

**Step 5: Assign License**
```typescript
// Assign M365 E3 license
POST https://graph.microsoft.com/v1.0/users/{userId}/assignLicense
{
  "addLicenses": [
    {
      "skuId": "<E3-SKU-ID>"
    }
  ],
  "removeLicenses": []
}
```

**Step 6: Add to Groups**
```typescript
// Based on department mapping
const groups = departmentToGroups[department]
// ["All-Employees", "Engineering-Team"]

for (const groupId of groups) {
  POST https://graph.microsoft.com/v1.0/groups/{groupId}/members/$ref
  {
    "@odata.id": "https://graph.microsoft.com/v1.0/users/{userId}"
  }
}
```

**Step 7: Log to Application Insights**
```typescript
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  correlationId: "abc-123-def-456",
  operation: "provision",
  status: "success",
  upn: "john.doe@contoso.com",
  userId: "user-id-789",
  groups: ["group-id-1", "group-id-2"]
}))
```

**Step 8: Return Success**
```json
{
  "upn": "john.doe@contoso.com",
  "correlationId": "abc-123-def-456",
  "userId": "user-id-789",
  "groups": ["group-id-1", "group-id-2"],
  "licenseAssigned": true,
  "message": "User provisioned successfully"
}
```

---

### Component 4: Teams Workspace Creation

**Purpose:** Create onboarding Teams workspace for new hire

**Script:** `infra/teams/apply-teams-template.ps1`

**What it creates:**
```
Team Name: Onboarding - 20251105-1430
Channels:
  - General (auto-created)
  - Welcome (with Wiki tab)
  - HR
  - IT-Setup
  - Manager-Checklist
```

**PowerShell Example:**
```powershell
# Create team
$team = New-PnPTeam -DisplayName "Onboarding - 20251105-1430" `
  -Description "Onboarding workspace"

# Add channels
Add-PnPTeamsChannel -Team $team.GroupId -DisplayName "Welcome"
Add-PnPTeamsChannel -Team $team.GroupId -DisplayName "HR"
Add-PnPTeamsChannel -Team $team.GroupId -DisplayName "IT-Setup"
Add-PnPTeamsChannel -Team $team.GroupId -DisplayName "Manager-Checklist"

# Return site ID
Write-Host "Site ID: $($team.SiteId)"
```

---

### Component 5: KPI Tracking

**Purpose:** Measure automation performance

**Script:** `ops/extract-kpis.ps1`

**What it measures:**

**Query SharePoint "Onboarding Runs" List:**
```powershell
$items = Get-PnPListItem -List "Onboarding Runs" -Query @"
<View>
  <Query>
    <Where>
      <Geq>
        <FieldRef Name='Created' />
        <Value Type='DateTime'>2025-10-05T00:00:00Z</Value>
      </Geq>
    </Where>
  </Query>
</View>
"@
```

**Calculate Metrics:**
```powershell
$totalRuns = $items.Count  # 25
$successfulRuns = ($items | Where Status -eq "Success").Count  # 24
$successRate = ($successfulRuns / $totalRuns) * 100  # 96%

$avgDuration = ($items | Measure-Object DurationSeconds -Average).Average / 60  # 8.5 minutes

$manualHoursSaved = $successfulRuns * 4  # 96 hours (4 hrs/hire baseline)
```

**Output:**
```
📊 KPI Summary (Last 30 Days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Period: 2025-10-05 to 2025-11-05

📈 Performance Metrics
  Total Runs:            25
  Successful:            24
  Failed:                1
  Success Rate:          96%
  Error Rate:            4%

⚡ Efficiency Metrics
  Avg Duration:          8.5 minutes
  Manual Hours Saved:    96 hours
  Departments Served:    5

🏢 Departments
  - Engineering
  - Sales
  - Marketing
  - HR
  - Finance
```

---

## 🔍 Real-World Example

### Scenario: Onboard "Sarah Johnson" from Sales

**1. HR Submission (9:00 AM)**
```
HR Manager opens SharePoint:
https://contoso.sharepoint.com/sites/HR/Lists/New-Hire%20Requests

Clicks "New" and fills form:
  First Name: Sarah
  Last Name: Johnson
  Personal Email: sarah.johnson@gmail.com
  Manager UPN: mike.brown@contoso.com
  Role: Employee
  Department: Sales
  Start Date: 2025-11-20

Clicks "Save"
```

**2. Power Automate Triggers (9:00:15 AM)**
```
Flow detects new item
Generates correlationId: "550e8400-e29b-41d4-a716-446655440000"
Composes payload with Sarah's info
```

**3. Azure Function Called (9:00:30 AM)**
```
POST https://func-newhire-contoso.azurewebsites.net/api/provision
Validates: ✅ All fields present
Generates UPN: sarah.johnson@contoso.com
Gets Graph token: ✅
Creates user in Azure AD: ✅
  User ID: 8f7e6d5c-4b3a-2190-8765-fedcba098765
Assigns license: ✅ M365 E3
Adds to groups: ✅ ["All-Employees", "Sales-Team"]
Returns success
```

**4. Teams Workspace Created (9:01:00 AM)**
```
Team: Onboarding - 20251105-0901
Channels created: Welcome, HR, IT-Setup, Manager-Checklist
Site ID: abc123-def456-ghi789
```

**5. Welcome Message Posted (9:01:15 AM)**
```
Posted to Teams General channel:
"Welcome sarah.johnson@contoso.com! 🎉
Your account is ready for 2025-11-20."
```

**6. Run Logged to SharePoint (9:01:20 AM)**
```
Onboarding Runs list updated:
  Correlation ID: 550e8400-e29b-41d4-a716-446655440000
  UPN: sarah.johnson@contoso.com
  Status: Success
  Duration: 80 seconds
```

**7. Manager Notified (9:01:25 AM)**
```
Email sent to mike.brown@contoso.com:
"New hire onboarding complete: Sarah Johnson
UPN: sarah.johnson@contoso.com
Ready for start date: 2025-11-20"
```

**8. Sarah Receives Credentials (9:05 AM)**
```
Sarah gets email at sarah.johnson@gmail.com:
"Your Contoso account is ready!
Username: sarah.johnson@contoso.com
Temporary password: <secure-password>
You'll be prompted to change on first login."
```

**Total Time:** 5 minutes (vs 5 days manual) ✅

---

## 🛠️ Testing Locally

### Test Azure Functions

**1. Start Functions locally:**
```bash
cd apps/azfunc-provision
npm install
npm run build
npm start
```

**2. Test provision endpoint:**
```bash
curl -X POST http://localhost:7071/api/provision \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "jobTitle": "Engineer",
    "department": "IT"
  }'
```

**Expected response (mock mode):**
```json
{
  "upn": "test.user@example.com",
  "correlationId": "abc-123-def-456",
  "userId": "mock-user-id",
  "groups": ["mock-group-id"],
  "licenseAssigned": true,
  "message": "User provisioned successfully (mock mode)"
}
```

**3. Test validation:**
```bash
# Missing required field
curl -X POST http://localhost:7071/api/provision \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test"
  }'

# Expected: 400 Bad Request with validation errors
```

---

## 🔐 Security Features

**1. Correlation IDs**
- Every request gets unique ID
- Traceable across all systems (Flow → Function → SharePoint)
- Enables debugging and audit trails

**2. Structured Logging**
```json
{
  "timestamp": "2025-11-05T14:30:00Z",
  "correlationId": "abc-123",
  "operation": "provision",
  "status": "success",
  "upn": "john.doe@contoso.com",
  "userId": "user-id-789"
}
```

**3. Error Handling**
- Validation errors return 400 with details
- Graph API failures return 500 with safe error message
- All errors logged to Application Insights
- Failed runs trigger IT support email

**4. Rollback Capability**
```bash
curl -X POST http://localhost:7071/api/rollback \
  -H "Content-Type: application/json" \
  -d '{
    "upn": "john.doe@contoso.com",
    "groups": ["group-id-1"],
    "correlationId": "abc-123"
  }'
```

---

## 📈 Monitoring & Observability

**Where to Find Logs:**

**1. Application Insights (Azure)**
```
Portal → Application Insights → ai-newhire-automation
→ Logs → traces | where operation_Name == "provision"
```

**2. SharePoint "Onboarding Runs" List**
```
https://contoso.sharepoint.com/sites/HR/Lists/Onboarding%20Runs
View all runs with status, duration, errors
```

**3. Power Automate Run History**
```
https://make.powerautomate.com
→ My flows → New-Hire Onboarding Flow → Run history
```

**4. Function App Logs**
```
Azure Portal → Function App → Log stream
Real-time logs from provision/rollback functions
```

---

## 🎯 Success Criteria

**For a successful onboarding:**
- ✅ SharePoint item created
- ✅ Flow runs without errors
- ✅ Function returns 200 status
- ✅ User exists in Azure AD
- ✅ License assigned
- ✅ Groups updated
- ✅ Teams workspace created
- ✅ Manager notified
- ✅ Run logged with "Success" status
- ✅ User can log in on start date

**Time: < 10 minutes end-to-end**

---

## 💡 Key Design Decisions

**1. Mock Mode First**
- Enables development without Azure AD access
- Safe testing without creating real users
- Switch to real mode by configuring credentials

**2. Idempotent Scripts**
- SharePoint provisioning safe to run multiple times
- Teams template won't duplicate resources
- Rollback is repeatable

**3. Modular Components**
- Each piece works independently
- Can test SharePoint without Functions
- Can test Functions without Power Automate

**4. SharePoint for Logging**
- Built into M365 (no additional cost)
- Easy for HR/IT to query
- Powers KPI extraction

**5. Correlation IDs Everywhere**
- Every operation has unique ID
- Traceable from trigger to completion
- Enables debugging across systems

---

**Ready to see it in action? Let's test the Azure Functions locally!**
