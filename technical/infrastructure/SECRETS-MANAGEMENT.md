# Secrets Management Guide

**Project:** saas202521
**Secret Store:** Azure Key Vault
**Last Updated:** 2025-11-05

---

## Overview

Secrets (passwords, API keys, tokens) must NEVER be committed to git or stored in plain text. This guide explains how to securely manage secrets in all environments.

**Golden Rule:** If it's secret, it goes in Key Vault (Azure) or `.env.local` (development only).

---

## What are Secrets?

Secrets are sensitive values that should not be public:

✅ **Secrets (must protect):**
- Database passwords
- API keys (Stripe, SendGrid, AWS, etc.)
- JWT signing keys
- Session secrets
- OAuth client secrets
- Encryption keys
- Service account credentials

❌ **Not secrets (can be public):**
- Database hostnames
- API endpoints
- Port numbers
- Feature flags (non-sensitive)
- Public configuration

---

## Development Environment

### Using .env.local

**Create from template:**
```bash
cp .env.example .env.local
```

**Edit .env.local:**
```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5421/saas202521

# Redis
REDIS_URL=redis://localhost:6421

# JWT
JWT_SECRET=dev-secret-change-in-production

# External APIs (use test keys)
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....
```

**Important:**
- `.env.local` is in `.gitignore` - NEVER commit it
- Use test/sandbox API keys in development
- Share `.env.example` (with placeholder values) in git

### Generating Secure Secrets

**For JWT secrets, session keys, etc.:**
```bash
# Generate random 64-character secret
openssl rand -hex 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

**Output:** `a7f3e9d2b8c1...` (use this as your secret)

---

## Staging & Production (Azure)

### Azure Key Vault

All staging and production secrets are stored in Azure Key Vault.

**Key Vault Name:** `saas202521-kv`

**Access:** Container Apps use Managed Identity (no passwords needed)

### Adding Secrets to Key Vault

**Via Azure CLI:**
```bash
# Set secret
az keyvault secret set \
  --vault-name saas202521-kv \
  --name DATABASE-PASSWORD \
  --value "your-secret-value"

# View secret
az keyvault secret show \
  --vault-name saas202521-kv \
  --name DATABASE-PASSWORD \
  --query value -o tsv

# List all secrets
az keyvault secret list \
  --vault-name saas202521-kv \
  --query "[].name" -o tsv
```

**Via Azure Portal:**
1. Go to: https://portal.azure.com
2. Search for "saas202521-kv"
3. Click "Secrets" in left menu
4. Click "+ Generate/Import"
5. Enter name and value
6. Click "Create"

### Secret Naming Convention

Use `UPPER-CASE-WITH-DASHES` for Key Vault secret names:

```
DATABASE-URL-STAGING
DATABASE-URL-PRODUCTION
REDIS-URL-STAGING
REDIS-URL-PRODUCTION
JWT-SECRET
STRIPE-SECRET-KEY
SENDGRID-API-KEY
AWS-ACCESS-KEY-ID
AWS-SECRET-ACCESS-KEY
```

**In application code, convert to environment variables:**
```
DATABASE-URL-STAGING → DATABASE_URL (staging)
DATABASE-URL-PRODUCTION → DATABASE_URL (production)
```

### Accessing Secrets from Container Apps

**Automatic via Managed Identity:**

Container Apps automatically load secrets from Key Vault using their managed identity. No code changes needed!

**Configuration (done by setup script):**
```bash
# Grant Container App access to Key Vault
az keyvault set-policy \
  --name saas202521-kv \
  --object-id $(az containerapp show \
    --name saas202521-staging \
    --resource-group saas202521-rg \
    --query identity.principalId -o tsv) \
  --secret-permissions get list
```

**In application code:**
```python
# Python
import os
DATABASE_URL = os.environ['DATABASE_URL']  # Loaded from Key Vault automatically

# Node.js
const DATABASE_URL = process.env.DATABASE_URL;  // Loaded from Key Vault automatically
```

---

## GitHub Secrets

GitHub Actions needs access to Azure and other services. Store these in GitHub Secrets.

### Required GitHub Secrets

**Navigate to:**
```
https://github.com/YOUR_ORG/saas202521/settings/secrets/actions
```

**Add these secrets:**

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `AZURE_CREDENTIALS` | Service Principal JSON | `az ad sp create-for-rbac --sdk-auth` |
| `AZURE_REGISTRY_NAME` | Container Registry name | `saas202521acr` |
| `AZURE_REGISTRY_USERNAME` | Registry username | From setup script output |
| `AZURE_REGISTRY_PASSWORD` | Registry password | From setup script output |
| `DATABASE_URL_STAGING` | Staging database URL | From Key Vault |
| `DATABASE_URL_PRODUCTION` | Production database URL | From Key Vault |

**Optional (for notifications):**
| Secret Name | Description |
|-------------|-------------|
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications |
| `DISCORD_WEBHOOK_URL` | Discord webhook for notifications |

### Adding GitHub Secrets

**Via GitHub CLI:**
```bash
# Add single secret
gh secret set AZURE_CREDENTIALS < azure-credentials.json

# Add from command output
echo "secret-value" | gh secret set SECRET_NAME

# List all secrets
gh secret list
```

**Via GitHub UI:**
1. Go to repo settings
2. Click "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Enter name and value
5. Click "Add secret"

---

## Secret Rotation

### Why Rotate Secrets?

- Compliance requirements (e.g., every 90 days)
- Potential security breach
- Employee offboarding
- Best practice (reduce risk window)

### How to Rotate Secrets

#### 1. Database Password

```bash
# Generate new password
NEW_PASSWORD=$(openssl rand -base64 32)

# Update PostgreSQL password
az postgres flexible-server update \
  --name saas202521-db \
  --resource-group saas202521-rg \
  --admin-password "$NEW_PASSWORD"

# Update Key Vault
az keyvault secret set \
  --vault-name saas202521-kv \
  --name DATABASE-PASSWORD \
  --value "$NEW_PASSWORD"

# Restart apps to pick up new password
az containerapp restart --name saas202521-staging --resource-group saas202521-rg
az containerapp restart --name saas202521-prod --resource-group saas202521-rg
```

#### 2. JWT Secret

```bash
# Generate new secret
NEW_JWT_SECRET=$(openssl rand -hex 32)

# Update Key Vault
az keyvault secret set \
  --vault-name saas202521-kv \
  --name JWT-SECRET \
  --value "$NEW_JWT_SECRET"

# ⚠️ WARNING: This will invalidate all existing user sessions
# Restart apps
az containerapp restart --name saas202521-staging --resource-group saas202521-rg
az containerapp restart --name saas202521-prod --resource-group saas202521-rg
```

#### 3. Third-Party API Keys

**Stripe example:**
```bash
# 1. Generate new key in Stripe dashboard
# 2. Update Key Vault
az keyvault secret set \
  --vault-name saas202521-kv \
  --name STRIPE-SECRET-KEY \
  --value "sk_live_new_key"

# 3. Restart apps
az containerapp restart --name saas202521-prod --resource-group saas202521-rg

# 4. Verify new key works
# 5. Revoke old key in Stripe dashboard
```

#### 4. Azure Service Principal

```bash
# Create new Service Principal
az ad sp create-for-rbac \
  --name "saas202521-github-actions-new" \
  --role contributor \
  --scopes /subscriptions/{sub-id}/resourceGroups/saas202521-rg \
  --sdk-auth > azure-credentials-new.json

# Update GitHub Secret
gh secret set AZURE_CREDENTIALS < azure-credentials-new.json

# Test deployment
git push origin develop

# Delete old Service Principal
az ad sp delete --id <old-sp-object-id>
```

### Rotation Schedule

| Secret Type | Frequency | Automation |
|-------------|-----------|------------|
| Database passwords | Every 90 days | Manual (planned: automatic) |
| JWT secrets | Every 90 days | Manual |
| API keys (external) | As needed | Manual (when provider requires) |
| Azure Service Principal | Every 180 days | Manual |
| SSH keys | Every 365 days | Manual |

---

## Security Best Practices

### 1. Never Commit Secrets

❌ **BAD:**
```javascript
// config.js
const config = {
  databaseUrl: 'postgresql://user:password@host/db',  // NEVER DO THIS
  apiKey: 'sk_live_123456789'  // NEVER DO THIS
};
```

✅ **GOOD:**
```javascript
// config.js
const config = {
  databaseUrl: process.env.DATABASE_URL,  // From environment
  apiKey: process.env.API_KEY  // From environment
};
```

### 2. Use Different Secrets Per Environment

❌ **BAD:** Same database password for staging and production

✅ **GOOD:** Different passwords:
```
staging: DATABASE-URL-STAGING
production: DATABASE-URL-PRODUCTION
```

### 3. Least Privilege Access

- Developers: Read access to staging secrets, NO access to production
- CI/CD: Read access to secrets needed for deployment
- Applications: Read-only access via Managed Identity

### 4. Audit Secret Access

**View Key Vault audit logs:**
```bash
az monitor activity-log list \
  --resource-group saas202521-rg \
  --namespace Microsoft.KeyVault/vaults
```

**Set up alerts for suspicious activity:**
- Secret read by unauthorized identity
- Secret deleted
- Multiple failed access attempts

### 5. Use Managed Identity

✅ **Managed Identity (recommended):**
```python
# No credentials in code!
# Azure automatically provides identity token
```

❌ **Service Principal with password:**
```python
# Requires storing client_id and client_secret
# More attack surface
```

---

## Handling Secret Leaks

### If a Secret is Accidentally Committed

**Immediate actions:**

1. **Rotate the secret immediately** (assume it's compromised)
2. **Remove from git history** (using `git filter-branch` or BFG Repo-Cleaner)
3. **Notify team** (post in #security Slack channel)
4. **Audit access logs** (check if secret was accessed)

**Remove from git history:**
```bash
# Using BFG Repo-Cleaner (recommended)
bfg --replace-text passwords.txt  # File containing secrets to remove
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (⚠️ requires team coordination)
git push origin --force --all
```

### If Key Vault Access is Compromised

1. **Revoke compromised identity** immediately
2. **Rotate all secrets** in Key Vault
3. **Review audit logs** for unauthorized access
4. **Enable soft-delete** (if not already enabled)
5. **Notify Azure security team** if needed

---

## Troubleshooting

### "Secret not found in Key Vault"

**Problem:** Application can't find secret

**Solutions:**
1. Verify secret exists:
   ```bash
   az keyvault secret show --vault-name saas202521-kv --name SECRET-NAME
   ```
2. Check secret name (case-sensitive, use dashes not underscores)
3. Verify Container App has Key Vault access policy

### "Access denied to Key Vault"

**Problem:** Container App can't access Key Vault

**Solutions:**
1. Verify managed identity is enabled on Container App
2. Check access policy:
   ```bash
   az keyvault show --name saas202521-kv --query properties.accessPolicies
   ```
3. Add access policy if missing:
   ```bash
   az keyvault set-policy \
     --name saas202521-kv \
     --object-id <container-app-identity> \
     --secret-permissions get list
   ```

### "Secret value is outdated"

**Problem:** Application using old secret value

**Solutions:**
1. Restart Container App:
   ```bash
   az containerapp restart --name saas202521-prod --resource-group saas202521-rg
   ```
2. Verify secret was actually updated in Key Vault
3. Check Key Vault secret version (apps use latest by default)

---

## Quick Reference

### Common Commands

```bash
# Add secret to Key Vault
az keyvault secret set --vault-name saas202521-kv --name SECRET-NAME --value "value"

# Get secret from Key Vault
az keyvault secret show --vault-name saas202521-kv --name SECRET-NAME --query value -o tsv

# List all secrets
az keyvault secret list --vault-name saas202521-kv

# Delete secret
az keyvault secret delete --vault-name saas202521-kv --name SECRET-NAME

# Add GitHub secret
gh secret set SECRET_NAME

# List GitHub secrets
gh secret list
```

### Environment Variable Naming

| Key Vault Name | Environment Variable | Usage |
|----------------|---------------------|-------|
| `DATABASE-URL-STAGING` | `DATABASE_URL` | Staging PostgreSQL connection |
| `DATABASE-URL-PRODUCTION` | `DATABASE_URL` | Production PostgreSQL connection |
| `REDIS-URL-STAGING` | `REDIS_URL` | Staging Redis connection |
| `REDIS-URL-PRODUCTION` | `REDIS_URL` | Production Redis connection |
| `JWT-SECRET` | `JWT_SECRET` | JWT token signing |
| `STRIPE-SECRET-KEY` | `STRIPE_SECRET_KEY` | Stripe API access |
| `SENDGRID-API-KEY` | `SENDGRID_API_KEY` | SendGrid email API |

---

## Resources

- **Azure Key Vault Docs**: https://learn.microsoft.com/azure/key-vault/
- **Managed Identity**: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/
- **GitHub Secrets**: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **12-Factor App (Config)**: https://12factor.net/config

---

**Questions?** Contact DevOps or post in #security Slack channel.
