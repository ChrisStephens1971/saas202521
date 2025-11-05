# Development Guide

**Project:** saas202521
**Last Updated:** 2025-11-05

---

## 🎯 Quick Start

This guide covers everything you need to develop, test, and deploy this project.

**New to the project?** Start here, then see `_START-HERE.md` for planning workflows.

---

## 📋 Tooling Requirements

### Required Software

| Tool | Minimum Version | Purpose | Installation |
|------|----------------|---------|--------------|
| **Node.js** | 18+ | Frontend/backend JavaScript runtime | [nodejs.org](https://nodejs.org) |
| **npm** | 9+ | Package manager (comes with Node.js) | Included with Node.js |
| **Docker Desktop** | Latest | Container runtime | [docker.com](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | v2+ | Multi-container orchestration | Included with Docker Desktop |
| **Azure CLI** | 2.60+ | Azure deployment (optional) | [docs.microsoft.com](https://docs.microsoft.com/cli/azure/install-azure-cli) |
| **Git** | 2.30+ | Version control | [git-scm.com](https://git-scm.com) |

### Verify Installation

```bash
# Check versions
node --version        # Should show v18.x.x or higher
npm --version         # Should show 9.x.x or higher
docker --version      # Should show 20.x.x or higher
docker compose version # Should show v2.x.x (NOT v1!)
az --version          # Should show 2.60.x or higher (if using Azure)
git --version         # Should show 2.30.x or higher
```

**Important:** Ensure Docker Compose is **v2** (command: `docker compose`) not v1 (`docker-compose`).

---

## 🖥️ Operating System Notes

### Windows

**Scripts:** Use `.ps1` (PowerShell) or `.bat` files in `scripts/` directory.

**PowerShell Execution Policy:**
```powershell
# If you get "script execution disabled" error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Docker:** Requires WSL2 backend for best performance.

### macOS / Linux

**Scripts:** Use `.sh` (bash/shell) files in `scripts/` directory.

**Make executable:**
```bash
chmod +x scripts/*.sh
```

**Docker:** Native support, no special configuration needed.

---

## 🐳 Docker & Infrastructure

### Docker Compose Basics

**Start all services:**
```bash
docker compose up -d
```

**Stop all services:**
```bash
docker compose down
```

**View running containers:**
```bash
docker compose ps
```

**View logs:**
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f postgres
docker compose logs -f redis
docker compose logs -f backend
```

### Infrastructure Diagnostics

**Before deploying changes, always validate:**

```bash
# 1. Validate docker-compose.yml syntax
docker compose config

# 2. Check running services
docker compose ps

# 3. Check service health
docker compose ps --format json | jq '.[].Health'

# 4. View resource usage
docker stats
```

**Common Issues:**

| Problem | Diagnosis | Solution |
|---------|-----------|----------|
| Port already in use | `netstat -ano \| findstr :3021` (Windows)<br>`lsof -i :3021` (Mac/Linux) | Kill process using port or change port in `.env.local` |
| Container won't start | `docker compose logs [service-name]` | Check logs for errors, verify environment variables |
| Database connection failed | `docker compose exec postgres pg_isready` | Ensure PostgreSQL is running and healthy |
| Out of disk space | `docker system df` | Run `docker system prune` to clean up |

### Port Allocation

**This project uses:**
- **Frontend:** 3021
- **Backend:** 8021
- **PostgreSQL:** 5421
- **Redis:** 6421
- **MongoDB:** 27021

**Check port conflicts:**
```bash
# Windows
netstat -ano | findstr :3021

# Mac/Linux
lsof -i :3021
```

---

## 📁 Generated Files & Artifacts

### What Gets Committed

**DO commit these generated files:**
- `fundraising/*.docx` - Pitch decks, investor documents
- `docs/*.pdf` - Exported documentation
- `package-lock.json` / `yarn.lock` - Dependency locks
- `.vscode/*.json` - Shared editor settings

**Example:**
```bash
# Generate pitch deck
node scripts/create-pitch-deck.js
# → Outputs: fundraising/02-PITCH-DECK.docx
# ✅ Commit this file

git add fundraising/02-PITCH-DECK.docx
git commit -m "docs: add investor pitch deck"
```

### What Gets Ignored

**DO NOT commit:**
- `.env.local` - Local environment variables (secrets)
- `node_modules/` - Dependencies (restored via npm install)
- `dist/`, `build/` - Build artifacts (recreated on deploy)
- `.DS_Store`, `Thumbs.db` - OS-specific files
- `*.log` - Log files

See `.gitignore` for complete list.

---

## 🧪 Testing & Validation

### Pre-Commit Checklist

Before committing code:

- [ ] **Lint:** `npm run lint` passes with no errors
- [ ] **Format:** `npm run format` applied
- [ ] **Tests:** `npm test` all passing
- [ ] **Build:** `npm run build` succeeds
- [ ] **Docker:** `docker compose config` validates

### Smoke Tests

**After major changes, run smoke tests:**

```bash
# 1. Start fresh environment
docker compose down -v
docker compose up -d

# 2. Wait for services to be healthy
sleep 10

# 3. Test endpoints
curl http://localhost:8021/health
curl http://localhost:3021

# 4. Check database connection
docker compose exec postgres pg_isready

# 5. Check Redis
docker compose exec redis redis-cli ping
```

### Infrastructure Validation

**Before deploying to production:**

```bash
# Validate all configurations
docker compose config

# Test database migrations
npm run migrate:test

# Verify environment variables
npm run env:check

# Run integration tests
npm run test:integration

# Build production images
docker compose -f docker-compose.prod.yml build

# Security scan (if available)
npm audit
docker scan saas202521-backend:latest
```

---

## 📊 Error Monitoring & Observability

### Monitoring Options

This project includes **TWO monitoring solutions** (choose based on your needs):

**1. Sentry** - Developer-focused error tracking
- Best for: Session replay, error debugging, developer experience
- Files: `web/src/lib/monitoring/sentry.ts`, `api/src/lib/monitoring/sentry.py`

**2. Azure Application Insights** - Azure-native monitoring
- Best for: Azure integration, APM, infrastructure monitoring
- Files: `web/src/lib/monitoring/app-insights.ts`, `api/src/lib/monitoring/app_insights.py`

**See full comparison:** `technical/adr/examples/example-adr-monitoring-strategy.md`

### When to Enable Monitoring

**Development/MVP Phase:**
- Monitoring disabled by default (env vars commented out)
- Use console logging for local debugging
- No external service needed

**Before Production Deployment:**
- Enable monitoring (Sentry, App Insights, or both)
- Set up alerts (Slack/email)
- Configure sampling rates
- Test error capture works

### Setting Up Sentry (Option 1)

**1. Create Account & Project:**
```bash
# Visit https://sentry.io/signup/ (Free tier: 5K events/month)
# Create project → Get DSN
```

**2. Configure Environment:**
```bash
# Add to .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project
SENTRY_DSN=https://your-dsn@sentry.io/your-project
SENTRY_ENVIRONMENT=production  # or staging, development
```

**3. Test Error Capture:**
```typescript
// Frontend test
throw new Error('Test Sentry frontend error')

// Backend test (Python)
raise Exception('Test Sentry backend error')

// Check Sentry dashboard - should see errors within 30 seconds
```

### What Gets Tracked

**Automatically Captured:**
- Uncaught exceptions (frontend and backend)
- API errors (4xx, 5xx responses)
- Database errors
- Performance metrics (slow endpoints, database queries)
- User context (ID, email - no passwords)

**Sensitive Data Filtered:**
- Authorization headers removed
- Cookies removed
- API keys/tokens sanitized
- Password fields redacted
- Payment information excluded

### Monitoring Best Practices

**1. Add Context to Errors:**
```typescript
// Frontend
import { captureError } from '@/lib/monitoring/sentry'

try {
  await updateUserProfile(userId, data)
} catch (error) {
  captureError(error, {
    user: { id: userId },
    tags: { operation: 'updateProfile' },
    extra: { data },
  })
  throw error
}
```

```python
# Backend
from lib.monitoring.sentry import capture_error

try:
    update_user_profile(user_id, data)
except Exception as error:
    capture_error(
        error,
        user={"id": user_id},
        tags={"operation": "updateProfile"},
        extra={"data": data}
    )
    raise
```

**2. Use Breadcrumbs for Debugging:**
```typescript
// Track user actions
import { addBreadcrumb } from '@/lib/monitoring/sentry'

addBreadcrumb('User clicked checkout button', 'user.action', {
  cartTotal: '$49.99',
  itemCount: 3,
})
```

**3. Performance Monitoring:**
```typescript
// Track slow operations
import { startTransaction } from '@/lib/monitoring/sentry'

const transaction = startTransaction('loadDashboard', 'http.request')
try {
  await fetchDashboardData()
} finally {
  transaction.finish()
}
```

### Cost Management

**Stay Within Free Tier (5K events/month):**
- Sampling configured at 10% in production (already set)
- Ignored errors: browser extensions, network failures (already configured)
- Filtered breadcrumbs: console logs, analytics requests (already configured)

**Monitor Usage:**
```bash
# Check Sentry dashboard → Stats → Usage
# Set up billing alerts at 80% of quota (4K events)
```

**If Exceeding Free Tier:**
1. Reduce sampling rate from 10% to 5%
2. Add more ignored error patterns
3. Filter additional breadcrumbs
4. Upgrade to paid tier ($26/month for 50K events)

### Debugging Production Issues

**When User Reports Bug:**

1. **Find Error in Sentry:**
   - Search by user ID or email
   - Filter by date/time of report
   - Look for errors around that time

2. **Review Context:**
   - Stack trace shows code path
   - Breadcrumbs show user actions before error
   - Session replay shows UI state (if enabled)
   - User context shows environment (browser, OS)

3. **Reproduce Locally:**
   - Use stack trace to find code
   - Use breadcrumbs to understand user flow
   - Reproduce with same inputs

4. **Fix & Deploy:**
   - Create fix
   - Test locally
   - Deploy to staging → production
   - Monitor Sentry to confirm fix

### Alerts & Notifications

**Set Up Alerts:**
```bash
# Sentry → Settings → Alerts
# Create rule: "If error count > 10 in 1 hour"
# Action: Send Slack message to #engineering
```

**Recommended Alerts:**
- New error types (first time seen)
- Error spike (>10x normal rate)
- Critical errors (500 errors, payment failures)
- High error rate (>1% of requests)

### Local Development

**Sentry Disabled Locally:**
- No DSN in `.env.local` → Sentry won't send events
- Errors still logged to console
- No quota usage

**Test Sentry Locally (Optional):**
```bash
# Add DSN to .env.local
# Set environment to 'development'
SENTRY_ENVIRONMENT=development

# Sentry will capture errors but mark as 'development'
# Filter by environment in Sentry dashboard
```

### Setting Up Application Insights (Option 2)

**1. Create Azure Resource:**
- Azure Portal → Search "Application Insights"
- Click "Create"
- Select subscription, resource group, region
- Name: `saas202521-insights`
- Mode: Workspace-based (recommended)

**2. Get Connection String:**
```bash
# Azure Portal → Your App Insights → Properties
# Copy "Connection String"
```

**3. Configure Environment:**
```bash
# Add to .env.local
NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;IngestionEndpoint=https://...
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;IngestionEndpoint=https://...
APPINSIGHTS_ENVIRONMENT=production  # or staging, development
```

**4. Install Packages:**
```bash
# Frontend
npm install @microsoft/applicationinsights-web @microsoft/applicationinsights-react-js

# Backend
pip install opencensus-ext-azure opencensus-ext-flask
```

**5. Test Telemetry:**
```typescript
// Frontend test
import { trackException } from '@/lib/monitoring/app-insights'
throw new Error('Test App Insights error')

// Backend test (Python)
from lib.monitoring.app_insights import track_exception
raise Exception('Test App Insights error')

// Check Azure Portal → App Insights → Failures
// Should see errors within 2-3 minutes
```

### Application Insights Best Practices

**1. Track Custom Events:**
```typescript
// Frontend
import { trackEvent } from '@/lib/monitoring/app-insights'

trackEvent('CheckoutCompleted', {
  userId: user.id,
  cartTotal: '$49.99',
  itemCount: 3,
}, {
  revenue: 49.99
})
```

```python
# Backend
from lib.monitoring.app_insights import track_event

track_event(
    "OrderProcessed",
    properties={"user_id": user_id, "order_id": order_id},
    measurements={"order_total": 49.99}
)
```

**2. Track Dependencies (API calls, DB queries):**
```typescript
// Frontend
import { trackDependency } from '@/lib/monitoring/app-insights'

const start = Date.now()
const response = await fetch('/api/users')
const duration = Date.now() - start

trackDependency(
  'api-call-123',
  'GET',
  '/api/users',
  'GET /api/users',
  duration,
  response.ok,
  response.status
)
```

```python
# Backend
from lib.monitoring.app_insights import track_dependency

import time
start = time.time()
result = database.query("SELECT * FROM users")
duration = (time.time() - start) * 1000

track_dependency(
    name="Users Query",
    dependency_type="SQL",
    target="postgres",
    duration=duration,
    success=True
)
```

**3. Monitor Performance:**
```typescript
// Track slow operations
import { start_span } from '@/lib/monitoring/app-insights'

const span = start_span('LoadDashboard')
try {
  await fetchDashboardData()
} finally {
  // Span auto-closes and reports duration
}
```

### Application Insights Cost Management

**Stay Within Free Tier (5GB/month):**
- Sampling: 10% in production (already configured)
- Filter noisy telemetry (debug logs, health checks)
- Use Basic logs for low-priority data

**Monitor Usage:**
```bash
# Azure Portal → App Insights → Usage and estimated costs
# Set up budget alerts at 80% of free tier
```

**If Exceeding Free Tier:**
1. Increase sampling rate (10% → 5%)
2. Reduce custom event tracking
3. Filter out non-critical telemetry
4. Consider Sentry for errors only

### Viewing Data in Azure Portal

**1. Errors:**
- Azure Portal → App Insights → Failures
- See exception details, stack traces
- Filter by time, user, operation

**2. Performance:**
- Azure Portal → App Insights → Performance
- See slow requests, dependencies
- Identify bottlenecks

**3. Metrics:**
- Azure Portal → App Insights → Metrics
- Create custom dashboards
- Set up alerts

**4. Logs:**
- Azure Portal → App Insights → Logs
- Query with KQL (Kusto Query Language)
- Example: `exceptions | where timestamp > ago(1h)`

### Alerts & Notifications

**Set Up Alerts:**
```bash
# Azure Portal → App Insights → Alerts
# Create rule: "If exception count > 10 in 5 minutes"
# Action: Send email or webhook to Slack
```

**Recommended Alerts:**
- Exception spike (>10 in 5 minutes)
- High response time (>2 seconds)
- Failed dependency calls (>5% failure rate)
- Low availability (<99%)

### Using Both Sentry and Application Insights

**If you enable both, use them for different purposes:**

**Sentry:**
- Frontend error tracking (with session replay)
- Critical error alerts
- Developer debugging workflow

**Application Insights:**
- Backend performance monitoring
- Azure infrastructure metrics
- Database query performance
- Distributed tracing

**Example Configuration:**
```typescript
// web/src/app/layout.tsx
import { initSentry } from '@/lib/monitoring/sentry'
import { initAppInsights } from '@/lib/monitoring/app-insights'

initSentry()       // Errors + session replay
initAppInsights()  // Performance + metrics
```

```python
# api/src/main.py
from lib.monitoring.sentry import init_sentry
from lib.monitoring.app_insights import init_app_insights

init_sentry()          # Errors
init_app_insights()    # Performance + Azure metrics
```

---

## 🚀 Development Workflow

### Starting Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Start infrastructure
docker compose up -d postgres redis mongo

# 4. Run database migrations
npm run migrate

# 5. Start dev servers
npm run dev
```

### Daily Development

```bash
# Start dev servers (hot reload enabled)
npm run dev

# In separate terminal: watch tests
npm run test:watch

# View logs
docker compose logs -f
```

### Before Pushing Code

```bash
# 1. Run linter
npm run lint

# 2. Run tests
npm test

# 3. Build to verify no errors
npm run build

# 4. Validate Docker config (if changed)
docker compose config

# 5. Stage and commit
git add .
git commit -m "feat: description"
git push
```

---

## 🔧 Troubleshooting

### Common Commands

```bash
# Reset database (destructive!)
docker compose down -v
docker compose up -d postgres
npm run migrate

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# View Docker logs for specific service
docker compose logs -f backend

# Enter container shell
docker compose exec postgres psql -U postgres
docker compose exec redis redis-cli
docker compose exec backend sh

# Check disk space
docker system df
docker system prune  # Clean up unused resources
```

### Getting Help

1. **Check logs:** `docker compose logs -f [service]`
2. **Verify environment:** `cat .env.local`
3. **Check ports:** `docker compose ps`
4. **Review this guide:** `DEVELOPMENT-GUIDE.md`
5. **Check style guide:** `STYLE-GUIDE.md`
6. **See testing checklist:** `TESTING-CHECKLIST.md`

---

## 📚 Additional Resources

- **Planning & Documentation:** `_START-HERE.md`
- **Code Style & Naming:** `STYLE-GUIDE.md`
- **Testing:** `TESTING-CHECKLIST.md`
- **Architecture Decisions:** `technical/adr/`
- **API Documentation:** `technical/api-spec/`
- **Deployment Guide:** `technical/infrastructure/AZURE-DEPLOYMENT-GUIDE.md`

---

**Questions?** Check `CLAUDE.md` for AI assistant guidance or ask your team lead.

**Version:** 1.0
**Last Updated:** 2025-11-05
