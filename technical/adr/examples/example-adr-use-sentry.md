# ADR 005: Use Sentry for Error Tracking

**Date:** 2025-11-02
**Status:** Accepted
**Deciders:** Engineering Team
**Tags:** monitoring, error-tracking, observability

---

## Context

We need error tracking and monitoring for our production SaaS application. Users won't report every bug they encounter, and errors in production often go unnoticed until they become critical issues.

**Requirements:**

1. **Real-time error tracking:** Capture errors as they happen in production
2. **Context-rich debugging:** Stack traces, user context, breadcrumbs
3. **Performance monitoring:** Track slow endpoints and database queries
4. **Affordable pricing:** Free tier for MVP, reasonable scaling costs
5. **Easy integration:** Works with our stack (Next.js, FastAPI, PostgreSQL)
6. **Sensitive data filtering:** Remove PII, auth tokens, payment info
7. **Session replay:** See what users did before error occurred

**User Stories:**

- As a developer, I need to know when users encounter errors in production
- As a PM, I need to prioritize bug fixes based on impact (number of users affected)
- As support, I need context about user sessions when debugging reports
- As a user, I expect the app to work reliably without data breaches

---

## Decision

We will use **Sentry** for error tracking and monitoring.

**Architecture:**

```
Frontend (Next.js) → Sentry SDK → Sentry.io
Backend (FastAPI)  → Sentry SDK → Sentry.io
                                    ↓
                            Dashboard + Alerts
```

**Key Implementation Details:**

1. **Frontend Monitoring:**
   - `@sentry/nextjs` SDK
   - Error boundaries for React components
   - Session replay for debugging
   - Performance monitoring for Core Web Vitals
   - Sampling: 10% of sessions, 100% of error sessions

2. **Backend Monitoring:**
   - `sentry-sdk[fastapi]` for Python
   - Automatic error capture for uncaught exceptions
   - Request context (headers, URL, method)
   - Database query performance tracking
   - Sampling: 10% of requests in production

3. **Sensitive Data Filtering:**
   - Remove authorization headers
   - Sanitize tokens and API keys
   - Filter password fields
   - Redact payment information

4. **Cost Management:**
   - Free tier: 5,000 events/month
   - Sampling rates to stay within limits
   - Ignored errors (browser extensions, network failures)
   - Optional: Upgrade to $26/month for 50K events

**Example Configuration (Frontend):**

```typescript
// web/src/lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs'

export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!dsn) {
    console.warn('[Sentry] DSN not configured')
    return
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1, // 10% of requests
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of error sessions

    beforeSend(event) {
      // Remove sensitive data
      if (event.request?.headers) {
        delete event.request.headers['authorization']
        delete event.request.headers['cookie']
      }
      return event
    },
  })
}
```

**Example Configuration (Backend):**

```python
# api/src/lib/monitoring/sentry.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

def init_sentry():
    dsn = os.getenv("SENTRY_DSN")

    if not dsn:
        print("[Sentry] DSN not configured")
        return

    sentry_sdk.init(
        dsn=dsn,
        environment=os.getenv("SENTRY_ENVIRONMENT", "development"),
        traces_sample_rate=0.1,
        integrations=[FastApiIntegration()],
        before_send=before_send_filter,
    )
```

---

## Alternatives Considered

### Rollbar

**Pros:**
- Similar features to Sentry
- Good error grouping
- Free tier: 5,000 events/month

**Cons:**
- No session replay
- Weaker performance monitoring
- Smaller community than Sentry
- Less comprehensive Next.js integration

**Verdict:** ❌ Not chosen - session replay is valuable for debugging user issues

---

### LogRocket

**Pros:**
- Excellent session replay
- User analytics included
- Good for frontend debugging

**Cons:**
- ❌ Expensive ($99/month minimum for production)
- ❌ No free tier
- ❌ Focused on frontend only (no backend monitoring)
- ❌ Overkill for MVP stage

**Verdict:** ❌ Not chosen - too expensive for early stage, no backend support

---

### Bugsnag

**Pros:**
- Good error grouping and notifications
- Mobile app support
- Free tier: 7,500 events/month

**Cons:**
- No session replay
- Limited performance monitoring
- Less feature-rich than Sentry
- Smaller ecosystem

**Verdict:** ❌ Not chosen - missing key features (session replay, performance monitoring)

---

### Self-Hosted (Sentry Open Source or GlitchTip)

**Pros:**
- Full data control (no external service)
- No per-event costs
- Good for regulated industries

**Cons:**
- ❌ Infrastructure maintenance burden
- ❌ Need to manage servers, updates, backups
- ❌ No official support
- ❌ Missing features vs. Sentry cloud (session replay, AI-powered grouping)
- ❌ Higher total cost (server costs + time)

**Verdict:** 💡 Consider for enterprise tier with compliance requirements, not for MVP

---

### No Error Tracking (Logs Only)

**Pros:**
- Zero cost
- Full control
- Simple setup

**Cons:**
- ❌ No alerting when errors occur
- ❌ Manual log analysis required
- ❌ Missing context (user, session, breadcrumbs)
- ❌ Hard to prioritize fixes (no impact metrics)
- ❌ Production issues go unnoticed

**Verdict:** ❌ Not viable - errors will slip through unnoticed

---

## Consequences

### Positive

✅ **Real-time error alerting:** Know immediately when users encounter bugs

✅ **Rich debugging context:** Stack traces, user context, session replay, breadcrumbs

✅ **Performance insights:** Identify slow endpoints and database queries

✅ **Free tier sufficient for MVP:** 5K events/month covers early stage usage

✅ **Easy integration:** Official SDKs for Next.js and FastAPI

✅ **Session replay:** See exactly what user did before error

✅ **Smart grouping:** AI-powered error deduplication reduces noise

✅ **Issue prioritization:** See which errors affect most users

### Negative

❌ **External dependency:** Relies on Sentry.io service uptime

❌ **Cost scaling:** Need to manage sampling rates to avoid surprise bills

❌ **Data privacy:** Errors sent to third-party (mitigated by filtering)

❌ **Quota management:** Must stay within free tier or pay for overages

### Neutral

- **Learning curve:** Team needs to learn Sentry dashboard and workflows
- **Configuration required:** Must set up filtering rules and sampling

---

## Risks & Mitigations

### Risk: Cost overrun from too many events

**Mitigation:**
- Use sampling (10% of requests in production)
- Ignore non-critical errors (browser extensions, network failures)
- Filter breadcrumbs (exclude analytics requests, console logs)
- Monitor quota usage weekly
- Set up billing alerts at 80% of free tier

### Risk: Sensitive data leakage to Sentry

**Mitigation:**
- Filter authorization headers, cookies, tokens
- Sanitize query parameters (remove `?token=...`)
- Redact password fields in error context
- Review Sentry data processing agreement
- Use `beforeSend` callback to scrub data

### Risk: Missed errors due to sampling

**Mitigation:**
- Use 100% sampling in development and staging
- Use 10% sampling in production (acceptable trade-off)
- For critical errors, capture 100% (override sampling)
- Supplement with log aggregation for full coverage

### Risk: Service dependency/downtime

**Mitigation:**
- Sentry SDK fails gracefully (doesn't break app if Sentry is down)
- SDK queues events and retries
- Fall back to console logging if Sentry unavailable
- Monitor Sentry status page

---

## Implementation Plan

**Phase 1: Frontend Setup (Week 1)**
- [ ] Install `@sentry/nextjs`
- [ ] Create `web/src/lib/monitoring/sentry.ts`
- [ ] Add Sentry initialization to root layout
- [ ] Configure sampling and filtering
- [ ] Test error capture in development

**Phase 2: Backend Setup (Week 1)**
- [ ] Install `sentry-sdk[fastapi]`
- [ ] Create `api/src/lib/monitoring/sentry.py`
- [ ] Add Sentry initialization to FastAPI startup
- [ ] Configure integrations (FastAPI, SQLAlchemy)
- [ ] Test error capture in development

**Phase 3: Configuration (Week 2)**
- [ ] Sign up for Sentry account
- [ ] Create project and get DSN
- [ ] Add `SENTRY_DSN` to `.env.local`
- [ ] Configure sampling rates for production
- [ ] Set up Sentry alerts (Slack/email)

**Phase 4: Testing (Week 2)**
- [ ] Trigger test errors in frontend
- [ ] Trigger test errors in backend
- [ ] Verify sensitive data filtering
- [ ] Test session replay functionality
- [ ] Validate performance monitoring

**Phase 5: Production Deployment (Week 3)**
- [ ] Deploy with Sentry enabled
- [ ] Monitor error rates for first week
- [ ] Adjust sampling rates if needed
- [ ] Document troubleshooting workflow

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Time to detect production errors | < 5 minutes | TBD |
| Error resolution time | < 24 hours | TBD |
| False positive rate | < 10% | TBD |
| Monthly event quota usage | < 4,000 (80% of free) | TBD |
| Errors with full context | > 95% | TBD |

---

## References

- **Sentry Documentation:** https://docs.sentry.io/
- **Sentry Pricing:** https://sentry.io/pricing/
- **Next.js Integration:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **FastAPI Integration:** https://docs.sentry.io/platforms/python/integrations/fastapi/
- **Best Practices:** https://docs.sentry.io/product/best-practices/

**Internal References:**
- Frontend Setup: `web/src/lib/monitoring/sentry.ts`
- Backend Setup: `api/src/lib/monitoring/sentry.py`
- Environment Configuration: `.env.example`

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-11-02 | Initial decision | Engineering Team |

---

**This is an example ADR.** Use this format to document your monitoring decisions.

**Sentry is ideal when:**
- You need real-time error tracking
- Session replay is valuable for debugging
- Performance monitoring is important
- Free tier is sufficient (5K events/month)
- Using Next.js or FastAPI

**Consider alternatives if:**
- Need full data control (compliance) → Self-hosted Sentry
- Budget is extremely tight → Logs only + manual monitoring
- Need advanced analytics → LogRocket (but expensive)
- Building mobile-first app → Consider Bugsnag or Sentry mobile SDK
