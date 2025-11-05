# Infrastructure Documentation

This directory contains all infrastructure, deployment, and operations documentation for saas202521.

---

## 📁 Directory Structure

```
infrastructure/
├── README.md (this file)
├── AZURE-DEPLOYMENT-GUIDE.md     # Complete Azure deployment walkthrough
├── CI-CD-SETUP.md                # GitHub Actions setup and usage
├── ENVIRONMENT-STRATEGY.md       # Dev/Staging/Production strategy
├── SECRETS-MANAGEMENT.md         # Azure Key Vault and secrets guide
├── DATABASE-MIGRATION.md         # Database migration workflows
└── azure/                         # Azure-specific configurations
    ├── main.bicep                 # Infrastructure as Code (Bicep)
    ├── parameters.staging.json    # Staging parameters
    └── parameters.production.json # Production parameters
```

---

## 🚀 Quick Start

### First Time Setup

**1. Provision Azure Resources:**
```bash
cd C:devopsaas202521
bash scripts/setup-azure-resources.sh
```

**2. Configure GitHub Secrets:**
- Follow output from setup script
- Add secrets to: `https://github.com/YOUR_ORG/saas202521/settings/secrets/actions`

**3. Deploy to Staging:**
```bash
git checkout -b develop
git push origin develop
# GitHub Actions deploys automatically
```

**4. Deploy to Production:**
```bash
git checkout main
git merge develop
git tag -a v1.0.0 -m "First production release"
git push origin v1.0.0
# GitHub Actions deploys automatically
```

---

## 📚 Documentation Guide

### For Developers

**Start here:**
1. Read [ENVIRONMENT-STRATEGY.md](./ENVIRONMENT-STRATEGY.md) - Understand dev/staging/production
2. Read [SECRETS-MANAGEMENT.md](./SECRETS-MANAGEMENT.md) - How to handle secrets safely
3. Read [DATABASE-MIGRATION.md](./DATABASE-MIGRATION.md) - How to create and run migrations

**When you need to:**
- Deploy manually: [AZURE-DEPLOYMENT-GUIDE.md](./AZURE-DEPLOYMENT-GUIDE.md)
- Troubleshoot CI/CD: [CI-CD-SETUP.md](./CI-CD-SETUP.md)
- Add new secrets: [SECRETS-MANAGEMENT.md](./SECRETS-MANAGEMENT.md#adding-secrets-to-key-vault)
- Run migrations: [DATABASE-MIGRATION.md](./DATABASE-MIGRATION.md#deployment-migrations)

### For DevOps/Infrastructure

**Start here:**
1. Read [AZURE-DEPLOYMENT-GUIDE.md](./AZURE-DEPLOYMENT-GUIDE.md) - Full Azure setup
2. Review `azure/main.bicep` - Infrastructure as Code
3. Read [CI-CD-SETUP.md](./CI-CD-SETUP.md) - GitHub Actions configuration

**When you need to:**
- Provision new environment: Run `scripts/setup-azure-resources.sh`
- Update infrastructure: Modify `azure/main.bicep` and redeploy
- Scale resources: See [AZURE-DEPLOYMENT-GUIDE.md#scaling](./AZURE-DEPLOYMENT-GUIDE.md#scaling)
- Troubleshoot: See troubleshooting sections in each guide

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend:**
- Framework: React/Next.js 14
- Hosting: Azure Static Web Apps OR Azure Container Apps
- CDN: Azure CDN (for static assets)

**Backend:**
- Framework: Django/Flask (Python) OR Express/Next.js (Node.js)
- Hosting: Azure Container Apps
- Containerization: Docker

**Data Layer:**
- Database: Azure Database for PostgreSQL 16
- Cache: Azure Cache for Redis
- Storage: Azure Blob Storage

**CI/CD:**
- Pipeline: GitHub Actions
- Container Registry: Azure Container Registry
- Secrets: Azure Key Vault

### Environments

| Environment | Purpose | URL | Auto-Deploy |
|-------------|---------|-----|-------------|
| **Development** | Local machine | localhost:3021 | Manual |
| **Staging** | Testing/QA | saas202521-staging.azurecontainerapps.io | On push to `develop` |
| **Production** | Live users | saas202521.azurecontainerapps.io | On release tag |

---

## 🔑 Key Concepts

### Infrastructure as Code (IaC)

All Azure resources are defined in `azure/main.bicep`. This means:
- ✅ Infrastructure is version-controlled
- ✅ Can recreate entire environment from code
- ✅ Changes are reviewed via pull requests
- ✅ Consistent across environments

### GitOps Deployment

Deployments happen automatically via git:
- Push to `develop` → Deploy to staging
- Create release tag → Deploy to production
- No manual server access needed
- All changes tracked in git history

### Zero-Downtime Deployments

Azure Container Apps provides:
- Rolling updates (new version deployed alongside old)
- Traffic shift when new version is healthy
- Automatic rollback if health checks fail
- No user-facing downtime

### Secrets Management

All secrets stored in Azure Key Vault:
- Database passwords
- API keys
- JWT secrets
- Container registry credentials

Container Apps access secrets via Managed Identity (no credentials in code).

---

## 📊 Cost Management

### Current Monthly Costs (Estimate)

**Staging Environment:** ~$62/month
- Container Apps: $15
- PostgreSQL B1ms: $30
- Redis Basic C0: $16
- Storage: $1

**Production Environment:** ~$300/month (scales with usage)
- Container Apps: $80 (scales up automatically)
- PostgreSQL Standard D2s: $140
- Redis Standard C1: $75
- Storage + CDN: $5

**Cost Optimization Tips:**
1. Turn off staging during non-business hours (optional)
2. Right-size resources based on metrics
3. Use Azure Cost Management alerts
4. Enable auto-scaling to handle traffic spikes efficiently

See: [AZURE-DEPLOYMENT-GUIDE.md#cost-estimate](./AZURE-DEPLOYMENT-GUIDE.md#cost-estimate)

---

## 🔒 Security

### Best Practices

✅ **Implemented:**
- All secrets in Key Vault
- Managed Identity for Azure services
- HTTPS enforced (automatic SSL)
- Database firewall (Container Apps only)
- No public access to storage accounts
- Secrets never in git

✅ **Recommended:**
- Enable Application Insights
- Set up Azure Monitor alerts
- Regular secret rotation (see [SECRETS-MANAGEMENT.md](./SECRETS-MANAGEMENT.md#secret-rotation))
- Review access policies quarterly

---

## 🚨 Troubleshooting

### Common Issues

**"Deployment failed in GitHub Actions"**
→ See: [CI-CD-SETUP.md#troubleshooting](./CI-CD-SETUP.md#troubleshooting)

**"App returns 500 errors after deployment"**
→ See: [AZURE-DEPLOYMENT-GUIDE.md#troubleshooting](./AZURE-DEPLOYMENT-GUIDE.md#troubleshooting)

**"Database connection failed"**
→ See: [AZURE-DEPLOYMENT-GUIDE.md#database-connection-issues](./AZURE-DEPLOYMENT-GUIDE.md#database-connection-issues)

**"Secret not found"**
→ See: [SECRETS-MANAGEMENT.md#troubleshooting](./SECRETS-MANAGEMENT.md#troubleshooting)

---

## 📞 Support

**For deployment issues:**
- Check troubleshooting sections in relevant guide
- Review GitHub Actions logs
- Check Azure Portal logs

**For infrastructure changes:**
- Create PR with changes to `azure/main.bicep`
- Tag DevOps team for review

**Urgent issues:**
- Email: devops@company.com
- Slack: #dev-help

---

## 🔄 Maintenance

### Weekly

- [ ] Review GitHub Actions workflow runs
- [ ] Check Azure Monitor for errors
- [ ] Verify staging environment is healthy

### Monthly

- [ ] Review Azure costs
- [ ] Check for security updates
- [ ] Rotate secrets if needed
- [ ] Review and update documentation

### Quarterly

- [ ] Audit access policies
- [ ] Review scaling settings
- [ ] Update infrastructure if needed
- [ ] Test disaster recovery procedures

---

## 📚 Additional Resources

### Internal Docs
- [Environment Strategy](./ENVIRONMENT-STRATEGY.md)
- [Secrets Management](./SECRETS-MANAGEMENT.md)
- [Database Migrations](./DATABASE-MIGRATION.md)
- [CI/CD Setup](./CI-CD-SETUP.md)

### External Resources
- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [Azure PostgreSQL](https://learn.microsoft.com/azure/postgresql/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Last Updated:** 2025-11-05
**Version:** 1.0
