# Sprint 1 - MVP Launch Prep

**Sprint Duration:** Jan 20, 2025 - Jan 31, 2025 (2 weeks)
**Sprint Goal:** Complete core authentication and onboarding flows for MVP launch
**Status:** Completed

---

## Sprint Goal

Build and ship the essential user authentication system and onboarding experience so new users can sign up, log in, and complete their first core action. This unblocks the MVP launch scheduled for early February.

---

## Sprint Capacity

**Available Days:** 10 working days
**Capacity:** ~60 hours (6 hrs/day average for solo founder)
**Commitments/Time Off:** None

---

## Sprint Backlog

### High Priority (Must Complete)

| Story | Description | Estimate | Status | Notes |
|-------|-------------|----------|--------|-------|
| US-001 | User registration with email | M | ✅ Done | Used Auth0 |
| US-002 | Password reset flow | S | ✅ Done | Email template created |
| US-003 | 3-step onboarding wizard | L | ✅ Done | See PRD |
| US-004 | Email verification | M | ✅ Done | SendGrid integrated |

### Medium Priority (Should Complete)

| Story | Description | Estimate | Status | Notes |
|-------|-------------|----------|--------|-------|
| US-005 | Social login (Google) | M | ✅ Done | OAuth working |
| US-006 | User profile page | S | ✅ Done | Basic version only |

### Low Priority (Nice to Have)

| Story | Description | Estimate | Status | Notes |
|-------|-------------|----------|--------|-------|
| US-007 | Dark mode toggle | S | ❌ Moved to Sprint 2 | Deprioritized |

---

## Technical Debt / Maintenance

- [x] Set up CI/CD pipeline
- [x] Configure staging environment
- [x] Add error monitoring (Sentry)

---

## Scope Changes

| Date | Change | Reason |
|------|--------|--------|
| Jan 23 | Added US-005 (Social login) | Faster than expected, user feedback wanted it |
| Jan 28 | Moved US-007 (Dark mode) to Sprint 2 | Focus on launch-critical items |

---

## Sprint Metrics

### Planned vs Actual
- **Planned:** 6 stories (48 hours)
- **Completed:** 6 stories (52 hours)
- **Completion Rate:** 100%

### Velocity
- **Previous Sprint:** N/A (first sprint)
- **This Sprint:** 52 hours
- **Trend:** Baseline established

---

## Wins & Learnings

### What Went Well
- Auth0 integration was smoother than expected - saved 10+ hours
- Onboarding flow user testing caught 3 major UX issues early
- Staying focused on MVP scope kept momentum high

### What Could Be Improved
- Underestimated time for email templates - took 6 hours vs 2 planned
- Should have set up monitoring earlier - added mid-sprint
- Need better time tracking throughout the day

### Action Items for Next Sprint
- [x] Start using Toggl for time tracking
- [x] Create email template library for future use
- [x] Schedule user testing earlier in sprint

---

## Sprint Review Notes

**What We Shipped:**
- Complete authentication system (sign up, login, password reset, email verification)
- Onboarding wizard with 3 steps
- User profile pages
- Social login via Google

**Feedback Received:**
- Beta users loved the clean onboarding flow
- Request for more social login options (GitHub, Apple) - added to backlog
- Minor UI bug on mobile - fixed same day

---

## Links & References

- PRD: `product/PRDs/user-onboarding.md`
- GitHub milestone: Closed (all 6 issues completed)
- Demo recording: [link]
