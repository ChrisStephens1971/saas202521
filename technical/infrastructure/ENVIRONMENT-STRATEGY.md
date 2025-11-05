# Environment Strategy

**Project:** saas202521
**Environments:** Development, Staging, Production

---

## Overview

This project uses a three-environment strategy to ensure code quality and minimize production issues.

```
Development (Local) → Staging (Azure) → Production (Azure)
```

Each environment serves a specific purpose and has different configurations, permissions, and data.

---

## Environments

### 1. Development (Local)

**Purpose:** Where developers write and test code on their machines

**Location:** Your laptop/workstation

**Technology:**
- Docker Compose for services (PostgreSQL, Redis, MongoDB)
- Local file system
- Hot reload enabled for fast iteration

**Access:**
- URL: `http://localhost:3021`
- API: `http://localhost:8021`
- Database: `localhost:5421`

**Data:**
- Seed data from `scripts/seed-data/`
- Test users and sample content
- Frequently reset/recreated

**Configuration:**
- `.env.local` (not committed to git)
- Full debug logging
- No authentication required for some endpoints
- CORS enabled for `localhost`

**How to Run:**
```bash
# Start all services
docker-compose up -d

# Run migrations
npm run migrate # or python manage.py migrate

# Seed data
npm run seed # or python manage.py seed

# Start development server
npm run dev # or python manage.py runserver
```

### 2. Staging (Azure)

**Purpose:** Pre-production environment for testing and QA

**Location:** Azure Container Apps

**Technology:**
- Azure Container Apps
- Azure Database for PostgreSQL
- Azure Cache for Redis
- Azure Blob Storage

**Access:**
- URL: `https://saas202521-staging.azurecontainerapps.io`
- Restricted to team members (optional authentication)
- VPN not required

**Data:**
- Sanitized copy of production data (optional)
- OR synthetic test data
- Refreshed weekly/monthly
- Safe to break/corrupt

**Configuration:**
- `.env.staging` managed via Azure Key Vault
- Moderate logging
- Real authentication (but test accounts)
- External APIs use test/sandbox mode

**Deployment:**
- Automatic on push to `develop` branch
- GitHub Actions CI/CD
- No manual approval required

**Who Uses It:**
- Developers (testing features)
- QA team (running test suites)
- Product managers (previewing features)
- Stakeholders (demos)

### 3. Production (Azure)

**Purpose:** Live environment serving real users

**Location:** Azure Container Apps

**Technology:**
- Azure Container Apps (higher tier)
- Azure Database for PostgreSQL (with HA)
- Azure Cache for Redis (Standard tier)
- Azure Blob Storage (with CDN)

**Access:**
- URL: `https://saas202521.azurecontainerapps.io`
- OR custom domain: `https://yourdomain.com`
- Public internet access
- Rate limiting enabled
- DDoS protection

**Data:**
- Real user data
- MUST be backed up daily
- MUST comply with data regulations (GDPR, CCPA)
- NEVER corrupt or delete without backups

**Configuration:**
- `.env.production` managed via Azure Key Vault
- Minimal logging (error/warning only)
- Full authentication and authorization
- External APIs use production mode
- Secrets rotated regularly

**Deployment:**
- Manual trigger via release tags (e.g., `v1.0.0`)
- GitHub Actions CI/CD
- Optional manual approval
- Zero-downtime deployment
- Automatic rollback on failure

**Who Uses It:**
- Real users/customers
- Support team (read-only access)
- DevOps (deployment and monitoring)

---

## Environment Comparison

| Feature | Development | Staging | Production |
|---------|-------------|---------|------------|
| **Location** | Local machine | Azure | Azure |
| **URL** | localhost:3021 | staging.azurecontainerapps.io | azurecontainerapps.io |
| **Database** | Docker PostgreSQL | Azure PostgreSQL (B1ms) | Azure PostgreSQL (GP_Standard_D2s) |
| **Data** | Seed data | Test data | Real user data |
| **Deployment** | Manual | Auto (on push to develop) | Manual (on release tag) |
| **Debug Mode** | Enabled | Enabled | **Disabled** |
| **Logging Level** | DEBUG | INFO | ERROR/WARNING |
| **Authentication** | Optional | Required (test accounts) | Required (real users) |
| **Rate Limiting** | Disabled | Enabled (lenient) | Enabled (strict) |
| **External APIs** | Mocked | Sandbox/Test mode | Production mode |
| **Monitoring** | None | Basic (Azure Monitor) | Full (App Insights) |
| **Backups** | None | Daily (7-day retention) | Daily (35-day retention) |
| **Cost** | Free (local) | ~$62/month | ~$300+/month |
| **Uptime SLA** | N/A | None | 99.95% |

---

## Configuration Management

### Environment Variables

Each environment has its own set of environment variables:

**Development (.env.local):**
```bash
NODE_ENV=development
DEBUG=true
DATABASE_URL=postgresql://localhost:5421/saas202521
REDIS_URL=redis://localhost:6421
FRONTEND_URL=http://localhost:3021
CORS_ORIGINS=http://localhost:3021
```

**Staging (Azure Key Vault):**
```bash
NODE_ENV=staging
DEBUG=true
DATABASE_URL=postgresql://saas202521-db.postgres.database.azure.com/saas202521_staging
REDIS_URL=rediss://saas202521-redis.redis.cache.windows.net:6380
FRONTEND_URL=https://saas202521-staging.azurecontainerapps.io
CORS_ORIGINS=https://saas202521-staging.azurecontainerapps.io
```

**Production (Azure Key Vault):**
```bash
NODE_ENV=production
DEBUG=false
DATABASE_URL=postgresql://saas202521-db.postgres.database.azure.com/saas202521_production
REDIS_URL=rediss://saas202521-redis.redis.cache.windows.net:6380
FRONTEND_URL=https://saas202521.azurecontainerapps.io
CORS_ORIGINS=https://saas202521.azurecontainerapps.io,https://yourdomain.com
```

### Secrets Management

**Never commit secrets to git!**

- **Development**: `.env.local` (in `.gitignore`)
- **Staging/Production**: Azure Key Vault

See: [SECRETS-MANAGEMENT.md](./SECRETS-MANAGEMENT.md)

---

## Deployment Flow

### Standard Flow

```
1. Developer works on feature branch (local development)
   ↓
2. Create PR to develop branch
   ↓
3. CI runs tests on PR (GitHub Actions)
   ↓
4. PR approved and merged to develop
   ↓
5. Auto-deploy to staging (GitHub Actions)
   ↓
6. QA tests on staging
   ↓
7. Create PR from develop to main
   ↓
8. PR approved and merged to main
   ↓
9. Create release tag (v1.0.0)
   ↓
10. Deploy to production (GitHub Actions)
```

### Hotfix Flow

For urgent production fixes:

```
1. Create hotfix branch from main
   ↓
2. Fix the issue
   ↓
3. Deploy directly to staging for testing
   ↓
4. Create release tag (v1.0.1)
   ↓
5. Deploy to production
   ↓
6. Merge hotfix back to develop
```

---

## Data Management

### Development Data

**Seed Scripts:**

```bash
# Python (Django)
python manage.py seed

# Node.js
npm run seed
```

**What gets seeded:**
- Admin user (admin@example.com / password)
- 10-50 test users
- Sample products/content
- Test transactions
- Test API keys

**Resetting:**
```bash
# Drop and recreate database
docker-compose down -v
docker-compose up -d
npm run migrate
npm run seed
```

### Staging Data

**Option A: Synthetic Data**
- Use seed scripts (same as development but more data)
- Recommended for early stage projects

**Option B: Sanitized Production Data**
- Copy from production
- Anonymize PII (names, emails, phone numbers)
- Remove payment information
- Recommended for mature projects

**Refresh staging data:**
```bash
bash scripts/refresh-staging-data.sh
```

### Production Data

**Backup Strategy:**
- Automatic daily backups (Azure PostgreSQL)
- Manual backup before major deployments
- 35-day retention
- Point-in-time restore available

**Backup manually:**
```bash
bash scripts/backup-db-azure.sh production
```

**Restore from backup:**
```bash
bash scripts/restore-db-azure.sh production backup-2025-01-15.sql
```

---

## Testing Strategy

### Development Testing

- Unit tests run locally
- Integration tests with local database
- Manual testing in browser
- Hot reload for fast iteration

```bash
# Run tests locally
pytest tests/
npm test
```

### Staging Testing

- Automated tests run in CI/CD
- Manual QA testing
- End-to-end tests (Playwright/Cypress)
- Performance testing
- Security testing

```bash
# Run E2E tests against staging
STAGING_URL=https://saas202521-staging.azurecontainerapps.io npm run test:e2e
```

### Production Testing

- Smoke tests after deployment
- Real user monitoring (RUM)
- Synthetic monitoring (uptime checks)
- A/B testing (optional)

**Smoke tests (automatic after deploy):**
```bash
bash scripts/smoke-test.sh production
```

---

## Monitoring and Logging

### Development

- Console logs
- Browser DevTools
- Docker logs: `docker-compose logs -f`

### Staging

- Azure Monitor (basic metrics)
- Container App logs
- Application logs in Azure

```bash
az containerapp logs show \
  --name saas202521-staging \
  --resource-group saas202521-rg \
  --follow
```

### Production

- Azure Application Insights (full telemetry)
- Real-time alerts
- Performance monitoring
- Error tracking
- User analytics

**Key metrics monitored:**
- Request rate
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- CPU and memory usage
- Database query performance

---

## Access Control

### Development

- No restrictions
- All developers have full access
- No VPN required

### Staging

- Team members only (optional)
- Basic authentication: `staging:password`
- OR: Azure AD authentication
- No VPN required

### Production

- Public access (for users)
- Admin panel: Azure AD authentication
- Database: IP whitelist + SSL required
- API: Rate limiting + authentication

---

## Cost Management

### Development

**Cost:** $0 (runs locally)

### Staging

**Estimated cost:** ~$62/month
- Container Apps: ~$15
- PostgreSQL: ~$30
- Redis: ~$16
- Storage: ~$1

**Optimization:**
- Turn off during non-business hours (optional)
- Use smallest tiers
- Share resources between staging projects

### Production

**Estimated cost:** ~$300+/month (scales with usage)
- Container Apps: ~$80
- PostgreSQL: ~$140
- Redis: ~$75
- Storage + CDN: ~$5

**Optimization:**
- Right-size resources based on metrics
- Use reserved instances for predictable workloads
- Enable autoscaling
- Optimize database queries
- Use CDN for static assets

---

## Environment Promotion

### Promoting Code

```bash
# Develop → Main
git checkout main
git merge develop
git push origin main

# Tag for production
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Promoting Database Changes

**Migrations automatically run on deployment**

Manual migration if needed:
```bash
# Staging
bash scripts/migrate-db-azure.sh staging

# Production
bash scripts/migrate-db-azure.sh production
```

### Promoting Configuration

**Don't copy .env files between environments!**

Each environment has unique values:
- Database URLs
- API keys
- Domain names
- Feature flags

Update via Azure Key Vault:
```bash
az keyvault secret set \
  --vault-name saas202521-kv \
  --name API-KEY \
  --value "new-value"
```

---

## Troubleshooting

### "It works in development but not staging"

**Common causes:**
- Environment variables not set
- Database migrations not run
- Dependencies missing from requirements.txt/package.json
- File paths are different (use relative paths)
- Permissions issues

**Solution:**
1. Check Container App logs
2. Verify environment variables
3. Test Docker build locally
4. Run migrations manually

### "Staging and production behaving differently"

**Common causes:**
- Different resource tiers (CPU/memory)
- Different data (test vs real)
- Different feature flags
- Different external service configurations

**Solution:**
1. Compare environment variables
2. Check resource metrics
3. Verify external service endpoints
4. Test with production-like data in staging

---

## Best Practices

1. ✅ **Always test in staging before production**
2. ✅ **Keep staging as similar to production as possible**
3. ✅ **Never test directly in production**
4. ✅ **Use feature flags for gradual rollouts**
5. ✅ **Monitor both staging and production**
6. ✅ **Automate deployments (don't deploy manually)**
7. ✅ **Keep .env files out of git**
8. ✅ **Document environment-specific configurations**
9. ✅ **Run database backups before major changes**
10. ✅ **Have a rollback plan**

---

## Resources

- [Azure Container Apps Environments](https://learn.microsoft.com/azure/container-apps/environment)
- [Environment Variables Best Practices](https://12factor.net/config)
- [AZURE-DEPLOYMENT-GUIDE.md](./AZURE-DEPLOYMENT-GUIDE.md)
- [SECRETS-MANAGEMENT.md](./SECRETS-MANAGEMENT.md)

---

**Questions?** Contact DevOps or post in #dev-help.
