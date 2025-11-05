# Azure Deployment Guide

**Project:** saas202521
**Last Updated:** 2025-11-05
**Target Platform:** Microsoft Azure

---

## Overview

This guide provides complete instructions for deploying your application to Microsoft Azure using Azure Container Apps, Azure Database for PostgreSQL, and automated CI/CD via GitHub Actions.

### Architecture

```
GitHub Repository
    ↓ (push code)
GitHub Actions (CI/CD)
    ↓ (build & test)
Azure Container Registry (store images)
    ↓ (deploy)
Azure Container Apps (run app)
    ↓ (connect to)
Azure PostgreSQL + Redis (data layer)
```

---

## Prerequisites

### Required Tools

- **Azure CLI**: `az --version` (install: https://aka.ms/azure-cli)
- **Docker**: `docker --version` (for local testing)
- **Git**: `git --version`
- **GitHub CLI** (optional): `gh --version`

### Required Accounts

- **Azure Account** with active subscription
- **GitHub Account** with repository access
- **Permissions**: Contributor role on Azure subscription

### Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

---

## Quick Start (First Deployment)

### Step 1: Login to Azure

```bash
# Login to Azure
az login

# Set your subscription (if you have multiple)
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# Verify
az account show
```

### Step 2: Run Setup Script

```bash
cd C:devopsaas202521
bash scripts/setup-azure-resources.sh
```

**This script will:**
- Create Azure Resource Group
- Provision Azure Container Registry
- Create Azure PostgreSQL Flexible Server
- Create Azure Cache for Redis
- Set up Azure Key Vault for secrets
- Create Azure Container Apps Environment
- Configure networking and firewall rules

**Time:** ~10-15 minutes

### Step 3: Configure GitHub Secrets

The setup script will output values you need to add to GitHub:

1. Go to: `https://github.com/YOUR_ORG/saas202521/settings/secrets/actions`

2. Add these secrets:

```
AZURE_CREDENTIALS          # JSON output from setup script
AZURE_REGISTRY_NAME        # Container registry name
AZURE_REGISTRY_USERNAME    # Registry username
AZURE_REGISTRY_PASSWORD    # Registry password
DATABASE_URL_STAGING       # Staging database connection string
DATABASE_URL_PRODUCTION    # Production database connection string
```

### Step 4: Push Code to Trigger Deployment

```bash
# Create develop branch (for staging)
git checkout -b develop
git push origin develop

# Deployment starts automatically via GitHub Actions
# Check: https://github.com/YOUR_ORG/saas202521/actions
```

**Staging will be live at:** `https://saas202521-staging.azurecontainerapps.io`

### Step 5: Deploy to Production

```bash
# Merge to main and create release tag
git checkout main
git merge develop
git tag -a v1.0.0 -m "First production release"
git push origin main --tags

# Production deployment starts automatically
```

**Production will be live at:** `https://saas202521.azurecontainerapps.io`

---

## Azure Resources Created

### Resource Group: `saas202521-rg`

All resources are organized in one resource group for easy management.

### Container Registry: `saas202521acr`

**Purpose:** Stores Docker images
**SKU:** Basic (upgradeable to Standard/Premium)
**URL:** `saas202521acr.azurecr.io`

### Container Apps Environment: `saas202521-env`

**Purpose:** Hosts container apps
**Region:** East US (configurable)
**Networking:** VNet integrated with private endpoints

### Container Apps

1. **saas202521-staging** (staging environment)
   - URL: `https://saas202521-staging.azurecontainerapps.io`
   - Min replicas: 1, Max replicas: 3
   - Auto-deploys on push to `develop` branch

2. **saas202521-prod** (production environment)
   - URL: `https://saas202521.azurecontainerapps.io`
   - Min replicas: 2, Max replicas: 10
   - Deploys on release tags only

### PostgreSQL Flexible Server: `saas202521-db`

**Purpose:** Primary database
**Version:** PostgreSQL 16
**SKU:** Burstable B1ms (1 vCore, 2GB RAM)
**Storage:** 32GB (auto-grows to 128GB)
**Backup:** 7-day retention
**High Availability:** Configurable (disabled by default to save cost)

**Databases:**
- `saas202521_staging` - Staging environment
- `saas202521_production` - Production environment

### Redis Cache: `saas202521-redis`

**Purpose:** Caching and session storage
**SKU:** Basic C0 (250MB cache)
**Port:** 6380 (SSL)
**Persistence:** Disabled (ephemeral cache)

### Key Vault: `saas202521-kv`

**Purpose:** Secure storage for secrets
**Access:** Managed Identity from Container Apps
**Secrets stored:**
- Database passwords
- Redis connection strings
- API keys (Stripe, SendGrid, etc.)
- JWT secrets

### Blob Storage: `saas202521storage`

**Purpose:** File and media storage
**SKU:** Standard LRS
**Containers:**
- `media` - User uploads
- `static` - Static assets
- `backups` - Database backups

---

## Cost Estimate

### Development/Staging (Low Traffic)

| Resource | SKU | Monthly Cost |
|----------|-----|--------------|
| Container Apps | 0.5 vCPU, 1GB RAM | ~$15 |
| PostgreSQL | B1ms (1 vCore, 2GB) | ~$30 |
| Redis | Basic C0 (250MB) | ~$16 |
| Storage | 10GB | ~$0.50 |
| **Total** | | **~$62/month** |

### Production (Moderate Traffic)

| Resource | SKU | Monthly Cost |
|----------|-----|--------------|
| Container Apps | 2 vCPU, 4GB RAM (scaled) | ~$80 |
| PostgreSQL | GP_Standard_D2s_v3 (2 vCore, 8GB) | ~$140 |
| Redis | Standard C1 (1GB) | ~$75 |
| Storage | 50GB + bandwidth | ~$5 |
| **Total** | | **~$300/month** |

**Note:** Costs scale with usage. Azure Container Apps only charges for active usage.

---

## Deployment Workflow

### Branch Strategy

```
main (production)
  ↑
  merge from develop
  ↑
develop (staging)
  ↑
  merge from feature/*
  ↑
feature/* (local development)
```

### Automatic Deployments

1. **Push to `develop`** → Deploys to **staging**
   - Runs tests
   - Builds Docker image
   - Deploys to staging Container App
   - Runs smoke tests

2. **Create release tag** → Deploys to **production**
   - Runs full test suite
   - Builds production Docker image
   - Deploys to production Container App
   - Runs health checks
   - Sends notification

### Manual Deployments

```bash
# Deploy specific version to staging
bash scripts/deploy-azure.sh staging v1.2.3

# Deploy specific version to production
bash scripts/deploy-azure.sh production v1.2.3

# Rollback production to previous version
bash scripts/deploy-azure.sh production v1.2.2 --rollback
```

---

## Database Management

### Running Migrations

**Automatic (via GitHub Actions):**
Migrations run automatically after successful deployment.

**Manual:**
```bash
# Staging
bash scripts/migrate-db-azure.sh staging

# Production
bash scripts/migrate-db-azure.sh production
```

### Database Backups

**Automatic Backups:**
- Azure PostgreSQL creates backups automatically
- Retention: 7 days (configurable up to 35 days)
- Point-in-time restore available

**Manual Backup:**
```bash
# Create manual backup
bash scripts/backup-db-azure.sh production

# Restore from backup
bash scripts/restore-db-azure.sh production backup-2025-01-15.sql
```

### Connecting to Database

**From local machine:**
```bash
# Get connection string from Key Vault
az keyvault secret show \
  --vault-name saas202521-kv \
  --name DATABASE-URL-PRODUCTION \
  --query value -o tsv

# Connect with psql
psql "postgresql://username:password@saas202521-db.postgres.database.azure.com:5432/saas202521_production?sslmode=require"
```

**Using Azure Cloud Shell:**
```bash
# Access Cloud Shell at: https://shell.azure.com
# PostgreSQL client is pre-installed
```

---

## Monitoring and Debugging

### Application Logs

**Via Azure Portal:**
1. Navigate to: `https://portal.azure.com`
2. Find your Container App: `saas202521-prod`
3. Click "Log stream" in left menu
4. View real-time logs

**Via Azure CLI:**
```bash
# Stream logs (staging)
az containerapp logs show \
  --name saas202521-staging \
  --resource-group saas202521-rg \
  --follow

# Stream logs (production)
az containerapp logs show \
  --name saas202521-prod \
  --resource-group saas202521-rg \
  --follow
```

### Application Insights (Optional)

Enable Application Insights for advanced monitoring:

```bash
# Create Application Insights
az monitor app-insights component create \
  --app saas202521-insights \
  --location eastus \
  --resource-group saas202521-rg

# Get instrumentation key
az monitor app-insights component show \
  --app saas202521-insights \
  --resource-group saas202521-rg \
  --query instrumentationKey -o tsv
```

Add to environment variables in Container App.

### Metrics and Alerts

**Key Metrics to Monitor:**
- CPU and memory usage
- HTTP response times
- Error rates (4xx, 5xx)
- Database connection pool
- Redis cache hit rate

**Set up alerts:**
```bash
# Alert on high error rate
az monitor metrics alert create \
  --name high-error-rate \
  --resource-group saas202521-rg \
  --scopes /subscriptions/{sub-id}/resourceGroups/saas202521-rg/providers/Microsoft.App/containerApps/saas202521-prod \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m
```

---

## Scaling

### Automatic Scaling

Container Apps scale automatically based on:
- HTTP request load
- CPU utilization
- Memory utilization
- Custom metrics

**Configuration (in `technical/infrastructure/azure/container-app.yaml`):**

```yaml
scale:
  minReplicas: 2
  maxReplicas: 10
  rules:
    - name: http-scaling
      http:
        metadata:
          concurrentRequests: 50
```

### Manual Scaling

```bash
# Scale production to specific replica count
az containerapp update \
  --name saas202521-prod \
  --resource-group saas202521-rg \
  --min-replicas 3 \
  --max-replicas 20
```

---

## Security

### Managed Identity

Container Apps use Azure Managed Identity to access:
- Key Vault (for secrets)
- Container Registry (for pulling images)
- Storage Account (for file uploads)

**No credentials stored in environment variables.**

### Network Security

- **PostgreSQL**: Firewall restricted to Container Apps only
- **Redis**: VNet integrated, not publicly accessible
- **Key Vault**: Private endpoint, accessible only from Container Apps
- **HTTPS**: Automatic SSL/TLS certificates via Azure

### Secret Rotation

```bash
# Rotate database password
az postgres flexible-server update \
  --name saas202521-db \
  --resource-group saas202521-rg \
  --admin-password "NEW_PASSWORD"

# Update Key Vault
az keyvault secret set \
  --vault-name saas202521-kv \
  --name DATABASE-PASSWORD \
  --value "NEW_PASSWORD"

# Restart Container Apps to pick up new secret
az containerapp restart \
  --name saas202521-prod \
  --resource-group saas202521-rg
```

---

## Troubleshooting

### Deployment Fails

**Check GitHub Actions logs:**
```
https://github.com/YOUR_ORG/saas202521/actions
```

**Common issues:**
- ❌ **Build fails**: Check Dockerfile syntax, ensure dependencies in requirements.txt/package.json
- ❌ **Push to registry fails**: Verify AZURE_REGISTRY_PASSWORD secret is correct
- ❌ **Deployment fails**: Check Container App logs for startup errors

### App Returns 500 Errors

**Check application logs:**
```bash
az containerapp logs show \
  --name saas202521-prod \
  --resource-group saas202521-rg \
  --follow
```

**Common causes:**
- Database connection failed (check firewall rules)
- Missing environment variables
- Database migrations not run
- Redis connection failed

### Database Connection Issues

**Verify firewall rules:**
```bash
# Show firewall rules
az postgres flexible-server firewall-rule list \
  --name saas202521-db \
  --resource-group saas202521-rg

# Add Container Apps to firewall (if needed)
# This is done automatically by setup script
```

**Test connection:**
```bash
# From Container App console
az containerapp exec \
  --name saas202521-prod \
  --resource-group saas202521-rg \
  --command "psql $DATABASE_URL"
```

### Slow Performance

**Check resource usage:**
```bash
az monitor metrics list \
  --resource /subscriptions/{sub-id}/resourceGroups/saas202521-rg/providers/Microsoft.App/containerApps/saas202521-prod \
  --metric "CpuPercentage" \
  --start-time 2025-01-01T00:00:00Z \
  --end-time 2025-01-01T23:59:59Z
```

**Solutions:**
- Scale up: Increase CPU/memory per replica
- Scale out: Increase max replicas
- Optimize queries: Check database slow query log
- Increase cache: Upgrade Redis tier

---

## Disaster Recovery

### Backup Strategy

**Database:**
- Automatic backups: Daily (7-day retention)
- Manual backups: Before major releases
- Point-in-time restore: Any time within retention period

**Container Images:**
- All images stored in Container Registry
- Tagged with git commit SHA
- Retained indefinitely (until manually deleted)

**Configuration:**
- Infrastructure as Code (Bicep templates) in git
- Environment variables in Key Vault
- Easy to recreate entire environment

### Recovery Procedures

**Database Restore:**
```bash
# Restore to specific point in time
az postgres flexible-server restore \
  --resource-group saas202521-rg \
  --name saas202521-db-restored \
  --source-server saas202521-db \
  --restore-time "2025-01-15T10:30:00Z"
```

**Rollback Deployment:**
```bash
# Find previous working version
az containerapp revision list \
  --name saas202521-prod \
  --resource-group saas202521-rg

# Activate previous revision
az containerapp revision activate \
  --name saas202521-prod \
  --resource-group saas202521-rg \
  --revision saas202521-prod--previous-revision
```

**Complete Environment Recovery:**
```bash
# Provision new environment from scratch
bash scripts/setup-azure-resources.sh --new

# Restore database backup
bash scripts/restore-db-azure.sh production latest-backup.sql

# Deploy latest working version
bash scripts/deploy-azure.sh production v1.2.3
```

---

## Cleanup / Teardown

### Remove All Resources

```bash
# Delete entire resource group (removes ALL Azure resources)
az group delete \
  --name saas202521-rg \
  --yes --no-wait

# Remove GitHub secrets (manual via GitHub UI)
# Remove DNS records (if using custom domain)
```

**Warning:** This is irreversible. Ensure you have backups of any data you need.

---

## Next Steps

1. ✅ Complete first deployment (follow Quick Start)
2. ✅ Set up monitoring alerts
3. ✅ Configure custom domain (optional)
4. ✅ Enable Application Insights (recommended)
5. ✅ Set up staging data seeding
6. ✅ Document app-specific deployment notes
7. ✅ Train team on monitoring and debugging

---

## Resources

- **Azure Container Apps Docs**: https://learn.microsoft.com/azure/container-apps/
- **Azure PostgreSQL Docs**: https://learn.microsoft.com/azure/postgresql/
- **Azure CLI Reference**: https://learn.microsoft.com/cli/azure/
- **Project Repository**: https://github.com/ChrisStephens1971/saas202521
- **Azure Portal**: https://portal.azure.com

---

**Questions?** Contact DevOps team or post in #dev-help Slack channel.
