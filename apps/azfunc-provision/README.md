# Azure Functions - M365 User Provisioning

Azure Functions app for automating Microsoft 365 new-hire user provisioning and rollback.

## Overview

This Functions app provides two HTTP endpoints:

- **`/api/provision`** - Create a new M365 user with license and group assignments
- **`/api/rollback`** - Disable user, remove license, and clean up groups (best-effort)

Both endpoints use structured logging with correlation IDs for traceability.

## Prerequisites

- Node.js 18+ and npm 9+
- Azure Functions Core Tools v4 (`npm install -g azure-functions-core-tools@4`)
- Azure subscription (for deployment)
- Microsoft 365 tenant with admin access

## Local Development Setup

### 1. Install Dependencies

```bash
cd apps/azfunc-provision
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Azure AD / Entra ID Configuration
GRAPH_TENANT_ID=your-tenant-id-here
GRAPH_CLIENT_ID=your-client-id-here
GRAPH_CLIENT_SECRET=your-client-secret-here

# Azure Configuration
AZURE_SUBSCRIPTION_ID=your-subscription-id-here
APPINSIGHTS_CONNECTION_STRING=your-app-insights-connection-string-here

# FTD Configuration
FTD_FROM_ADDRESS=noreply@example.com
FTD_DOMAIN=example.com

# Local Development (optional)
ENVIRONMENT=development
```

### 3. Build and Start

```bash
npm run build
npm start
```

The Functions app will start on `http://localhost:7071`.

## Testing

### Run Unit Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Test Coverage

```bash
npm test -- --coverage
```

## API Endpoints

### POST /api/provision

Create a new M365 user with license and group assignments.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "jobTitle": "Software Engineer",
  "department": "Engineering",
  "manager": "jane.smith@example.com"
}
```

**Response (Success):**

```json
{
  "upn": "john.doe@example.com",
  "correlationId": "abc-123-def-456",
  "userId": "user-id-123",
  "groups": ["group-id-1", "group-id-2"],
  "licenseAssigned": true,
  "message": "User provisioned successfully"
}
```

**Response (Error):**

```json
{
  "error": "Validation failed",
  "details": ["firstName is required and must be a string"],
  "correlationId": "abc-123-def-456"
}
```

### POST /api/rollback

Disable user, remove license, and clean up groups.

**Request Body:**

```json
{
  "upn": "john.doe@example.com",
  "groups": ["group-id-1", "group-id-2"],
  "siteId": "site-id-123",
  "correlationId": "abc-123-def-456"
}
```

**Response (Success):**

```json
{
  "rolledBack": true,
  "correlationId": "xyz-789-abc-012",
  "upn": "john.doe@example.com",
  "operations": {
    "userDisabled": true,
    "licenseRemoved": true,
    "groupsRemoved": ["group-id-1", "group-id-2"],
    "siteDeleted": true
  },
  "message": "Rollback completed successfully"
}
```

## Testing Endpoints with cURL

### Provision User

```bash
curl -X POST http://localhost:7071/api/provision \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Software Engineer",
    "department": "Engineering"
  }'
```

### Rollback User

```bash
curl -X POST http://localhost:7071/api/rollback \
  -H "Content-Type: application/json" \
  -d '{
    "upn": "john.doe@example.com",
    "groups": ["group-1"],
    "correlationId": "abc-123"
  }'
```

## Graph API Permissions Required

The Azure AD app registration needs the following **Application Permissions**:

- `User.ReadWrite.All` - Create and manage users
- `Group.ReadWrite.All` - Add users to groups
- `Directory.ReadWrite.All` - Read directory data
- `Organization.Read.All` - Read organization settings

**Grant admin consent** in Azure Portal after adding these permissions.

## Project Structure

```
apps/azfunc-provision/
├── src/
│   ├── index.ts              # Main functions (provision, rollback)
│   └── lib/
│       ├── graphClient.ts    # Microsoft Graph client setup
│       ├── logging.ts        # Application Insights logging
│       └── validation.ts     # Payload validation
├── tests/
│   └── validation.test.ts    # Unit tests
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── host.json                 # Azure Functions configuration
├── jest.config.js            # Jest test configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Logging and Correlation IDs

Every request generates a unique `correlationId` for traceability. All logs include:

- `correlationId` - Unique identifier for this operation
- `operation` - "provision" or "rollback"
- `status` - "started", "success", or "error"
- `timestamp` - ISO 8601 timestamp
- Additional context (upn, payload, error details)

Logs are written to console (local) and Application Insights (cloud).

## Mock Mode

In PR 1, the functions run in **mock mode** - they validate payloads and return success responses without making real Graph API calls.

Real Graph integration will be added in **PR 5**.

To test locally without Graph credentials:

1. Leave `.env` fields empty or use placeholder values
2. Start the functions: `npm start`
3. Functions will log "Running in mock mode" and return mock responses

## Deployment

### Deploy to Azure

```bash
# Login to Azure
az login

# Create Function App (if not exists)
az functionapp create \
  --resource-group <resource-group> \
  --consumption-plan-location <location> \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name <function-app-name> \
  --storage-account <storage-account>

# Deploy
npm run build
func azure functionapp publish <function-app-name>
```

### Configure Application Settings

Set environment variables in Azure Portal or via CLI:

```bash
az functionapp config appsettings set \
  --name <function-app-name> \
  --resource-group <resource-group> \
  --settings \
    GRAPH_TENANT_ID="<tenant-id>" \
    GRAPH_CLIENT_ID="<client-id>" \
    GRAPH_CLIENT_SECRET="<client-secret>" \
    FTD_DOMAIN="example.com"
```

**Important:** Never commit `.env` or `local.settings.json` to source control.

## Troubleshooting

### Functions won't start

- Check Node.js version: `node --version` (must be 18+)
- Check Functions Core Tools: `func --version` (must be 4.x)
- Run `npm install` to ensure dependencies are installed
- Check for port conflicts on 7071

### Tests failing

- Run `npm run build` before running tests
- Check Jest configuration in `jest.config.js`
- Ensure test files are in `tests/` directory

### Graph API errors

- Verify app registration has correct permissions
- Ensure admin consent has been granted
- Check tenant ID, client ID, and secret are correct
- Test Graph API access independently first

## Development Workflow

1. Make changes to `src/` files
2. Run tests: `npm test`
3. Build: `npm run build`
4. Start locally: `npm start`
5. Test with cURL or Postman
6. Commit changes (never commit `.env` files)

## Next Steps (Future PRs)

- **PR 2:** SharePoint list provisioning (PowerShell)
- **PR 3:** Teams onboarding template apply
- **PR 4:** Power Automate flow export + docs
- **PR 5:** Implement real Graph API calls (user creation, licenses, groups)
- **PR 6:** Runbook + rollback docs + FTD pack assembly
- **PR 7:** KPI extraction + case study automation

## Support

For issues or questions:

- Check CLAUDE_TASKFILE.md for implementation details
- Review project documentation in `project-brief/`
- Reference Microsoft Graph API docs: https://learn.microsoft.com/graph

---

**Status:** PR 1 - Mock implementation complete, real Graph integration in PR 5
