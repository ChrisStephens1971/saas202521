# ADR 005: Monitoring and Error Tracking Strategy

**Date:** 2025-11-02
**Status:** Decision Guide (Choose Your Option)
**Deciders:** Engineering Team
**Tags:** monitoring, error-tracking, observability, azure, sentry

---

## Context

We need comprehensive monitoring and error tracking for our production SaaS application. Users won't report every bug, and production issues often go unnoticed until they become critical.

**Requirements:**
1. **Real-time error tracking** - Capture errors as they happen
2. **Performance monitoring** - Track slow endpoints and bottlenecks
3. **User context** - Know which users are affected
4. **Cost-effective** - Affordable for MVP stage
5. **Azure integration** - Works well with our Azure deployment
6. **Developer experience** - Easy to use and debug with

---

## Decision Framework

**This project includes BOTH monitoring solutions pre-configured:**
- ✅ **Sentry** → Best-in-class error tracking with session replay
- ✅ **Azure Application Insights** → Azure-native monitoring and APM

**You can enable:**
- **Option 1:** Sentry only
- **Option 2:** Application Insights only
- **Option 3:** Both (hybrid approach)
- **Option 4:** Neither (development only)

---

## Option 1: Sentry Only

**Best for:** Developer experience, session replay, multi-cloud

### Implementation

**Frontend:**
```typescript
// web/src/app/layout.tsx
import { initSentry } from '@/lib/monitoring/sentry'

initSentry()
```

**Backend:**
```python
# api/src/main.py
from lib.monitoring.sentry import init_sentry

init_sentry()
```

**Environment Variables:**
```bash
# .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id
SENTRY_DSN=https://your-key@sentry.io/project-id
SENTRY_ENVIRONMENT=production
```

### Pros

✅ **Session Replay** - See exactly what users did before error (HUGE for debugging)
✅ **Best-in-class error grouping** - AI-powered deduplication
✅ **Developer-focused UI** - Designed for engineers
✅ **Better integrations** - GitHub, Slack, Jira, etc.
✅ **Predictable pricing** - Event-based, not data-based
✅ **Multi-cloud** - Not locked to Azure

### Cons

❌ **External dependency** - Data leaves Azure environment
❌ **Another vendor** - One more service to manage
❌ **Smaller free tier** - 5K events/month vs 5GB data
❌ **No Azure-native metrics** - Separate from Azure Monitor

### Cost

- **Free tier:** 5,000 events/month (~500 active users)
- **Next tier:** $26/month for 50,000 events
- **Sampling:** 10% production, 100% errors (already configured)

### Setup Time

⏱️ **5 minutes** - Sign up, get DSN, add to .env

---

## Option 2: Application Insights Only

**Best for:** Azure-first, cost-conscious, infrastructure monitoring

### Implementation

**Frontend:**
```typescript
// web/src/app/layout.tsx
import { initAppInsights } from '@/lib/monitoring/app-insights'

initAppInsights()
```

**Backend:**
```python
# api/src/main.py
from lib.monitoring.app_insights import init_app_insights

init_app_insights()
```

**Environment Variables:**
```bash
# .env.local
NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;...
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;...
APPINSIGHTS_ENVIRONMENT=production
```

### Pros

✅ **Azure-native** - Single vendor, integrated with Azure
✅ **Larger free tier** - 5GB data/month vs 5K events
✅ **APM included** - Application performance monitoring
✅ **Distributed tracing** - Track requests across services
✅ **Infrastructure metrics** - CPU, memory, Azure resources
✅ **No external dependency** - Data stays in Azure

### Cons

❌ **No session replay** - Can't see what users did (major limitation)
❌ **Weaker error grouping** - Less sophisticated than Sentry
❌ **Less developer-friendly** - More enterprise/ops focused
❌ **Data-based pricing** - Can get expensive at scale
❌ **Azure lock-in** - Harder to migrate off Azure

### Cost

- **Free tier:** 5GB ingestion/month
- **Pay-as-you-go:** ~$2.30/GB after free tier
- **90 days retention** included free
- **Warning:** Some teams report $4K+ monthly bills at scale

### Setup Time

⏱️ **10 minutes** - Create Azure resource, get connection string

---

## Option 3: Both (Hybrid Approach)

**Best for:** Large teams, comprehensive monitoring, production apps

### Strategy

**Use Sentry for:**
- ✅ Frontend error tracking (with session replay)
- ✅ Critical error alerts
- ✅ User-facing issues
- ✅ Developer debugging

**Use Application Insights for:**
- ✅ Backend performance monitoring
- ✅ Infrastructure metrics
- ✅ Azure resource monitoring
- ✅ Distributed tracing
- ✅ Database query performance

### Implementation

Enable both monitoring systems:

```typescript
// web/src/app/layout.tsx
import { initSentry } from '@/lib/monitoring/sentry'
import { initAppInsights } from '@/lib/monitoring/app-insights'

initSentry()      // For errors + session replay
initAppInsights() // For performance metrics
```

```python
# api/src/main.py
from lib.monitoring.sentry import init_sentry
from lib.monitoring.app_insights import init_app_insights

init_sentry()         # For errors
init_app_insights()   # For performance + Azure metrics
```

### Pros

✅ **Best of both worlds** - Session replay + Azure integration
✅ **Comprehensive coverage** - Errors, performance, infrastructure
✅ **Specialized tools** - Each excels at different things

### Cons

❌ **Higher cost** - Paying for two services
❌ **More complexity** - Two dashboards to check
❌ **Redundant data** - Some overlap in error tracking

### Cost

- **Sentry:** $0-26/month (free tier likely sufficient)
- **App Insights:** $0-50/month (depends on data volume)
- **Total:** ~$26-76/month

### When to Use

- Large user base (>1000 active users)
- Revenue-generating product
- Team needs both error debugging and performance insights
- Budget allows for comprehensive monitoring

---

## Option 4: Neither (Development Only)

**Best for:** Early development, prototypes, local testing

### Implementation

Simply don't set environment variables:

```bash
# .env.local
# NEXT_PUBLIC_SENTRY_DSN=    # Commented out
# SENTRY_DSN=                # Commented out
```

### When to Use

- ✅ Still in planning/design phase
- ✅ Building MVP locally
- ✅ No real users yet
- ✅ Prototype or proof-of-concept

### Fallback

Both monitoring systems fail gracefully:
- Errors still logged to console
- No external calls made
- No quota used

---

## Decision Matrix

| Factor | Sentry | App Insights | Both | Neither |
|--------|--------|--------------|------|---------|
| **Session Replay** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| **Error Grouping** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ |
| **Azure Integration** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | N/A |
| **APM/Performance** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ |
| **Developer UX** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| **Cost (MVP)** | $0-26/mo | $0/mo | $0-26/mo | $0 |
| **Setup Time** | 5 min | 10 min | 15 min | 0 min |

---

## Recommendations by Scenario

### Solo Founder, MVP Stage
**→ Option 1: Sentry Only**
- Session replay is invaluable for debugging
- Free tier sufficient for MVP
- Best developer experience

### Team, Azure-Heavy Infrastructure
**→ Option 2: Application Insights Only**
- Already in Azure ecosystem
- Need infrastructure monitoring
- Can sacrifice session replay for cost savings

### Production App with Revenue
**→ Option 3: Both**
- Budget allows for comprehensive monitoring
- Session replay + Azure integration
- Best monitoring coverage

### Early Development, No Users
**→ Option 4: Neither**
- Save free tier quota for production
- Console logging sufficient
- Enable before deployment

---

## Implementation Checklist

### For Sentry

- [ ] Sign up at https://sentry.io/signup/
- [ ] Create project, get DSN
- [ ] Add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`
- [ ] Add `SENTRY_DSN` to `.env.local`
- [ ] Set `SENTRY_ENVIRONMENT=production`
- [ ] Test error capture works
- [ ] Configure alerts (Slack/email)
- [ ] See: `technical/adr/examples/example-adr-use-sentry.md`

### For Application Insights

- [ ] Create App Insights resource in Azure Portal
- [ ] Get connection string
- [ ] Add `NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING` to `.env.local`
- [ ] Add `APPLICATIONINSIGHTS_CONNECTION_STRING` to `.env.local`
- [ ] Install npm package: `npm install @microsoft/applicationinsights-web @microsoft/applicationinsights-react-js`
- [ ] Install pip package: `pip install opencensus-ext-azure opencensus-ext-flask`
- [ ] Test telemetry works in Azure Portal
- [ ] Configure alerts and dashboards

### For Both

- [ ] Complete both checklists above
- [ ] Decide which alerts go where
- [ ] Configure different sampling rates if needed
- [ ] Document which team checks which dashboard

---

## Migration Path

**Start with Option 1 (Sentry), evolve to Option 3 (Both) as you scale:**

1. **MVP Stage:** Sentry only (free tier)
2. **Growth Stage:** Add Application Insights for infrastructure monitoring
3. **Scale Stage:** Keep both, optimize costs with sampling

**Total cost trajectory:**
- MVP: $0/month
- Growth: $26/month (Sentry paid tier)
- Scale: $76/month (Sentry + App Insights)

---

## Files and Configuration

### Sentry Implementation

- **Frontend:** `web/src/lib/monitoring/sentry.ts`
- **Backend:** `api/src/lib/monitoring/sentry.py`
- **Documentation:** `technical/adr/examples/example-adr-use-sentry.md`

### Application Insights Implementation

- **Frontend:** `web/src/lib/monitoring/app-insights.ts`
- **Backend:** `api/src/lib/monitoring/app_insights.py`
- **Azure Portal:** https://portal.azure.com → Application Insights

### Environment Variables

```bash
# .env.example (template with all options)

# Option 1: Sentry only
# NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id
# SENTRY_DSN=https://your-key@sentry.io/project-id
# SENTRY_ENVIRONMENT=production

# Option 2: Application Insights only
# NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;...
# APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxx;...
# APPINSIGHTS_ENVIRONMENT=production

# Option 3: Both (uncomment all)
# Option 4: Neither (leave all commented)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Error detection time | < 5 minutes | Time from error to alert |
| Error resolution time | < 24 hours | Time from detection to fix |
| False positive rate | < 10% | Ignored/invalid errors |
| Monitoring cost | < $100/month | Monthly bill |
| Coverage | > 95% | % of errors captured |

---

## References

**Sentry:**
- Docs: https://docs.sentry.io/
- Pricing: https://sentry.io/pricing/
- Next.js: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- FastAPI: https://docs.sentry.io/platforms/python/integrations/fastapi/

**Azure Application Insights:**
- Docs: https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview
- Pricing: https://azure.microsoft.com/en-us/pricing/details/monitor/
- JavaScript SDK: https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript
- Python SDK: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opencensus-python

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-11-02 | Initial decision guide with all options | Engineering Team |

---

**This is a decision guide, not a decision.** Choose the option that fits your needs, budget, and stage. All options are pre-configured and ready to enable.
