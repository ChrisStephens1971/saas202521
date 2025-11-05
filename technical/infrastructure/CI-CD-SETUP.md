# CI/CD Setup Guide

**Project:** saas202521
**CI/CD Platform:** GitHub Actions
**Target:** Microsoft Azure

---

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). Every push triggers automated workflows that test, build, and deploy your application.

### Workflow Files

All workflows are in `.github/workflows/`:

- `ci.yml` - Runs on every pull request (lint, test, build)
- `deploy-staging.yml` - Auto-deploys to staging when code merges to `develop`
- `deploy-production.yml` - Deploys to production on release tags
- `azure-container-build.yml` - Reusable workflow for building Docker images

---

## GitHub Actions Overview

### What is GitHub Actions?

GitHub Actions is GitHub's built-in CI/CD tool. It runs workflows automatically when certain events happen (push, pull request, tag creation, etc.).

### Key Concepts

- **Workflow**: A YAML file defining automation steps
- **Job**: A group of steps that run on the same runner
- **Step**: Individual task (checkout code, run tests, deploy)
- **Runner**: Virtual machine that executes jobs
- **Secret**: Encrypted environment variable (passwords, API keys)

---

## Setup Instructions

### Step 1: Verify Workflow Files Exist

Check that these files are in your repository:

```bash
ls -la .github/workflows/
```

You should see:
```
ci.yml
deploy-staging.yml
deploy-production.yml
azure-container-build.yml
```

### Step 2: Configure GitHub Secrets

**Navigate to:**
```
https://github.com/YOUR_ORG/saas202521/settings/secrets/actions
```

**Required Secrets:**

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `AZURE_CREDENTIALS` | Service Principal JSON | Run `bash scripts/setup-azure-resources.sh` |
| `AZURE_REGISTRY_NAME` | Container Registry name | `saas202521acr` |
| `AZURE_REGISTRY_USERNAME` | Registry username | From setup script output |
| `AZURE_REGISTRY_PASSWORD` | Registry password | From setup script output |
| `DATABASE_URL_STAGING` | Staging database URL | From Azure Key Vault |
| `DATABASE_URL_PRODUCTION` | Production database URL | From Azure Key Vault |
| `REDIS_URL_STAGING` | Staging Redis URL | From Azure Key Vault |
| `REDIS_URL_PRODUCTION` | Production Redis URL | From Azure Key Vault |

**Optional Secrets (for notifications):**

| Secret Name | Description |
|-------------|-------------|
| `SLACK_WEBHOOK_URL` | Slack webhook for deployment notifications |
| `DISCORD_WEBHOOK_URL` | Discord webhook for deployment notifications |

### Step 3: Get Azure Credentials

**Create Service Principal:**

```bash
# Login to Azure
az login

# Create service principal for GitHub Actions
az ad sp create-for-rbac \
  --name "saas202521-github-actions" \
  --role contributor \
  --scopes /subscriptions/{SUBSCRIPTION_ID}/resourceGroups/saas202521-rg \
  --sdk-auth

# Copy the entire JSON output
```

**Output format:**
```json
{
  "clientId": "...",
  "clientSecret": "...",
  "subscriptionId": "...",
  "tenantId": "...",
  "activeDirectoryEndpointUrl": "...",
  "resourceManagerEndpointUrl": "...",
  "activeDirectoryGraphResourceId": "...",
  "sqlManagementEndpointUrl": "...",
  "galleryEndpointUrl": "...",
  "managementEndpointUrl": "..."
}
```

**Add to GitHub Secrets as `AZURE_CREDENTIALS`**

### Step 4: Enable Actions

1. Go to: `https://github.com/YOUR_ORG/saas202521/settings/actions`
2. Under "Actions permissions", select "Allow all actions and reusable workflows"
3. Click "Save"

### Step 5: Test CI Workflow

```bash
# Create feature branch
git checkout -b test-ci

# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: CI workflow"
git push origin test-ci

# Create pull request
gh pr create --title "Test CI" --body "Testing CI workflow"
```

**Check results:**
```
https://github.com/YOUR_ORG/saas202521/actions
```

You should see `ci.yml` workflow running.

---

## Workflow Breakdown

### CI Workflow (`ci.yml`)

**Triggers:** Pull requests to `main` or `develop`

**Jobs:**

1. **Lint**
   - Python: `ruff`, `black`, `mypy`
   - Node.js: `eslint`, `prettier`

2. **Test**
   - Python: `pytest` with coverage
   - Node.js: `jest` with coverage

3. **Build**
   - Tests Docker build (doesn't push to registry)
   - Verifies Dockerfile syntax

**Configuration:**

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lint Python
        run: |
          pip install ruff black mypy
          ruff check .
          black --check .
      - name: Lint JavaScript
        run: |
          npm install
          npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: |
          npm test
          pytest --cov
```

### Staging Deployment (`deploy-staging.yml`)

**Triggers:** Push to `develop` branch

**Jobs:**

1. **Build Docker Image**
   - Detects Python vs Node.js project
   - Builds appropriate Dockerfile
   - Tags with git commit SHA
   - Pushes to Azure Container Registry

2. **Deploy to Staging**
   - Updates Azure Container App
   - Runs database migrations
   - Performs health check

3. **Notify**
   - Sends Slack/Discord notification

**Environment:** `staging`

### Production Deployment (`deploy-production.yml`)

**Triggers:** Push of tag matching `v*.*.*` (e.g., `v1.0.0`, `v2.1.3`)

**Jobs:**

1. **Build Production Image**
   - Same as staging but optimized
   - Tagged with version number
   - Additional security scanning

2. **Deploy to Production**
   - Requires manual approval (optional)
   - Zero-downtime deployment
   - Runs migrations
   - Health checks
   - Smoke tests

3. **Rollback on Failure**
   - Automatically reverts if health checks fail

**Environment:** `production`

---

## Deployment Process

### Deploy to Staging

**Automatic (recommended):**

```bash
# Commit your changes
git add .
git commit -m "feat: add new feature"

# Push to develop
git push origin develop

# GitHub Actions deploys automatically
# Check: https://github.com/YOUR_ORG/saas202521/actions
```

**Manual:**

```bash
# Trigger workflow manually from GitHub UI
# Go to: Actions > Deploy to Staging > Run workflow
```

### Deploy to Production

**Via Release Tag:**

```bash
# Ensure develop is merged to main
git checkout main
git merge develop

# Create release tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial production release"

# Push tag
git push origin v1.0.0

# GitHub Actions deploys automatically
```

**Via GitHub Releases:**

```bash
# Create release via GitHub CLI
gh release create v1.0.0 \
  --title "v1.0.0" \
  --notes "Initial production release"

# Or use GitHub UI:
# https://github.com/YOUR_ORG/saas202521/releases/new
```

---

## Monitoring Workflows

### View Workflow Runs

**Via GitHub UI:**
```
https://github.com/YOUR_ORG/saas202521/actions
```

**Via GitHub CLI:**
```bash
# List recent runs
gh run list --limit 10

# View specific run
gh run view 1234567890

# Watch run in real-time
gh run watch
```

### Workflow Status Badge

Add to README.md:

```markdown
![CI](https://github.com/YOUR_ORG/saas202521/workflows/CI/badge.svg)
![Deploy Staging](https://github.com/YOUR_ORG/saas202521/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/YOUR_ORG/saas202521/workflows/Deploy%20Production/badge.svg)
```

### Email Notifications

GitHub sends email notifications for:
- Workflow failures
- First successful run after failures
- Manual approval requests

**Configure in GitHub settings:**
```
https://github.com/settings/notifications
```

---

## Customizing Workflows

### Change Test Command

Edit `.github/workflows/ci.yml`:

```yaml
- name: Run tests
  run: |
    # Python
    pytest tests/ --cov --cov-report=xml

    # Node.js
    npm test -- --coverage
```

### Add Deployment Approvals

Edit `.github/workflows/deploy-production.yml`:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://saas202521.azurecontainerapps.io
    # GitHub will require manual approval before running
```

**Configure approvers:**
1. Go to: `Settings > Environments > production`
2. Add "Required reviewers"
3. Select team members who can approve

### Add Slack Notifications

Add to end of workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment to ${{ env.ENVIRONMENT }} ${{ job.status }}'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Add Security Scanning

Add new job to `ci.yml`:

```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'

    - name: Upload results to GitHub Security
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
```

---

## Troubleshooting

### Workflow Fails with "Authentication Error"

**Problem:** GitHub Actions can't authenticate with Azure

**Solution:**
1. Verify `AZURE_CREDENTIALS` secret is set correctly
2. Check Service Principal hasn't expired:
   ```bash
   az ad sp list --display-name "saas202521-github-actions"
   ```
3. Regenerate credentials if needed (see Setup Step 3)

### Docker Build Fails

**Problem:** `docker build` command fails in workflow

**Solution:**
1. Test build locally:
   ```bash
   docker build -t test .
   ```
2. Check Dockerfile syntax
3. Verify all dependencies are listed (requirements.txt or package.json)
4. Check for missing environment variables in build args

### Tests Fail in CI But Pass Locally

**Problem:** Tests pass on your machine but fail in GitHub Actions

**Common causes:**
- Database not available (need service container)
- Environment variables not set
- Different package versions
- Time zone differences
- File path differences (Windows vs Linux)

**Solution:**
1. Add database service to workflow:
   ```yaml
   services:
     postgres:
       image: postgres:16
       env:
         POSTGRES_PASSWORD: postgres
   ```
2. Set environment variables in workflow
3. Pin package versions
4. Use `pytest -v` for detailed error messages

### Deployment Succeeds But App Not Working

**Problem:** GitHub Actions shows success but app returns errors

**Solution:**
1. Check Container App logs:
   ```bash
   az containerapp logs show \
     --name saas202521-staging \
     --resource-group saas202521-rg \
     --follow
   ```
2. Verify environment variables are set in Container App
3. Check database connection
4. Verify migrations ran successfully

### Workflow Stuck on "Waiting"

**Problem:** Workflow shows "Waiting for a runner"

**Causes:**
- GitHub runner capacity (wait a few minutes)
- Billing limits reached (check GitHub billing)
- Workflow concurrency limits

**Solution:**
1. Cancel and retry
2. Check GitHub status: https://www.githubstatus.com
3. Reduce concurrent workflows

### Secret Not Found

**Problem:** `Error: Secret AZURE_CREDENTIALS not found`

**Solution:**
1. Verify secret exists:
   ```
   https://github.com/YOUR_ORG/saas202521/settings/secrets/actions
   ```
2. Check secret name matches exactly (case-sensitive)
3. Ensure you're looking at Actions secrets (not Environment secrets)
4. Re-add the secret if necessary

---

## Best Practices

### 1. Always Test Locally First

```bash
# Run tests locally
pytest
npm test

# Test Docker build
docker build -t saas202521:test .
docker run -p 8000:8000 saas202521:test
```

### 2. Use Semantic Versioning

```
v1.0.0 - Major release (breaking changes)
v1.1.0 - Minor release (new features)
v1.1.1 - Patch release (bug fixes)
```

### 3. Write Descriptive Commit Messages

```bash
# Good
git commit -m "feat: add user authentication"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update deployment guide"

# Bad
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

### 4. Keep Workflows Fast

- Cache dependencies
- Run jobs in parallel
- Skip unnecessary steps
- Use appropriate runner sizes

### 5. Monitor Workflow Costs

GitHub Actions usage:
```
https://github.com/organizations/YOUR_ORG/settings/billing
```

---

## Advanced Topics

### Matrix Builds

Test across multiple versions:

```yaml
strategy:
  matrix:
    python-version: [3.10, 3.11, 3.12]
    node-version: [18, 20]

steps:
  - uses: actions/setup-python@v4
    with:
      python-version: ${{ matrix.python-version }}
```

### Caching Dependencies

Speed up builds:

```yaml
- name: Cache Python dependencies
  uses: actions/cache@v3
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}

- name: Cache npm dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('package-lock.json') }}
```

### Reusable Workflows

Create `.github/workflows/reusable-deploy.yml`:

```yaml
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      azure_credentials:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... deployment steps
```

Call from other workflows:

```yaml
jobs:
  deploy-staging:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: staging
    secrets:
      azure_credentials: ${{ secrets.AZURE_CREDENTIALS }}
```

---

## Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Workflow Syntax**: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
- **Azure Login Action**: https://github.com/Azure/login
- **Docker Build-Push Action**: https://github.com/docker/build-push-action
- **Marketplace**: https://github.com/marketplace?type=actions

---

**Questions?** Post in #dev-help or contact DevOps team.
