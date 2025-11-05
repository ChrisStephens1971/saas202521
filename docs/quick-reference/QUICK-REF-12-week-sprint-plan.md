# Quick Reference: 12-Week MVP Sprint Plan

**Full plan:** [12-week-mvp-sprint-plan.md](12-week-mvp-sprint-plan.md)

A condensed view of the 12-week solo founder MVP development timeline.

---

## Overview

**Goal:** Ship a working MVP in 12 weeks as a solo founder

**Assumptions:**
- Full-time work (40-50 hrs/week)
- Experienced full-stack developer
- Familiar tech stack
- Realistic scope (3-5 features)

**If learning stack:** Add 4 weeks (16 total)
**If part-time:** Double timeline (24 weeks)

---

## Sprint Summary

| Sprint | Weeks | Focus | Goal |
|--------|-------|-------|------|
| **Foundation** | 1-2 | Auth & Tenants | User can signup, create workspace |
| **Core Product** | 3-6 | Build Features | MVP features functional |
| **Polish & Launch** | 7-9 | Security & UX | Ready for beta users |
| **Launch Prep** | 10-12 | Ops & Deploy | Live in production |

---

## Week-by-Week Breakdown

### Week 1: Foundation & Authentication (40-45 hrs)
**Deliverables:**
- [ ] User registration & email verification
- [ ] Login/logout with JWT
- [ ] Password reset flow
- [ ] Database with tenant isolation (RLS)
- [ ] Tenant context middleware

**Success:** User can sign up, login, reset password

---

### Week 2: Workspace Management (40-45 hrs)
**Deliverables:**
- [ ] Workspace creation after signup
- [ ] Team member invitation system
- [ ] Role-based access (Owner, Admin, Member)
- [ ] Workspace settings
- [ ] Workspace switcher

**Success:** User can create workspace and invite team

---

### Week 3: Core Feature #1 - Projects (35-40 hrs)
**Deliverables:**
- [ ] Create/edit/delete projects
- [ ] Project list with search & filter
- [ ] Project detail page
- [ ] Project settings
- [ ] Project members

**Success:** User can manage projects

---

### Week 4: Core Feature #2 - Tasks (40-45 hrs)
**Deliverables:**
- [ ] Create/edit/delete tasks
- [ ] Task list by project
- [ ] Assign tasks to members
- [ ] Task status workflow (To Do, In Progress, Done)
- [ ] Due dates
- [ ] Task filtering

**Success:** User can manage tasks

---

### Week 5: Core Feature #3 - Collaboration (40-45 hrs)
**Deliverables:**
- [ ] Comments on tasks
- [ ] @mentions
- [ ] Activity feed
- [ ] Email notifications
  - Task assigned
  - @mentioned
  - Comment on your task
- [ ] Mark notifications as read

**Success:** Team can collaborate on tasks

---

### Week 6: Views & Navigation (35-40 hrs)
**Deliverables:**
- [ ] Kanban board (drag & drop)
- [ ] List view (sorting/filtering)
- [ ] "My Tasks" view
- [ ] Search (tasks & projects)
- [ ] Improved navigation
- [ ] Quick task creation modal

**Success:** Intuitive UX, multiple views

---

### Week 7: Billing & Subscriptions (35-40 hrs)
**Deliverables:**
- [ ] Stripe integration
- [ ] Pricing page
- [ ] Subscribe/upgrade flow
- [ ] Billing page (invoices, payment method)
- [ ] Usage limits per tier
- [ ] Limit enforcement
- [ ] Webhook handling

**Success:** Can charge customers via Stripe

---

### Week 8: Polish & Performance (40-45 hrs)
**Deliverables:**
- [ ] Bug fixes from backlog
- [ ] Loading states everywhere
- [ ] Error handling improvements
- [ ] Database query optimization
- [ ] Indexes for common queries
- [ ] Mobile responsive improvements
- [ ] Basic accessibility (keyboard nav, alt text)

**Success:** Fast, polished, works on mobile

---

### Week 9: Security & Compliance (30-35 hrs)
**Deliverables:**
- [ ] Rate limiting
- [ ] CSRF & XSS protection
- [ ] Security headers
- [ ] Data export (GDPR)
- [ ] Account deletion
- [ ] Cookie consent (if EU)
- [ ] Terms & Privacy linked
- [ ] Audit logging

**Success:** Secure, GDPR-compliant basics

---

### Week 10: Onboarding & Activation (25-30 hrs)
**Deliverables:**
- [ ] Onboarding checklist
  - Create first project
  - Add first task
  - Invite team member
- [ ] Empty states with CTAs
- [ ] Help documentation (10-15 articles)
- [ ] Help widget
- [ ] Sample project/tasks (optional)

**Success:** Clear user guidance, help available

---

### Week 11: Analytics & Monitoring (30-35 hrs)
**Deliverables:**
- [ ] Analytics events (Mixpanel/Amplitude)
  - Signup, project created, task created, etc.
- [ ] Error tracking (Sentry)
- [ ] Admin dashboard
  - View workspaces & users
  - Basic stats
  - Impersonation (for support)
- [ ] Structured logging

**Success:** Can track usage and errors

---

### Week 12: Launch Preparation (35-40 hrs)
**Deliverables:**
- [ ] End-to-end testing
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Production deployment
- [ ] DNS & SSL setup
- [ ] Email deliverability (SPF, DKIM)
- [ ] Backups verified
- [ ] Monitoring active
- [ ] Landing page live

**Success:** App live in production, ready for users

---

## What's NOT Included (Defer Post-MVP)

- ❌ AI features
- ❌ Advanced integrations (Slack, GitHub)
- ❌ Mobile native apps
- ❌ SSO/SAML
- ❌ Advanced reporting
- ❌ Custom fields/workflows
- ❌ Time tracking
- ❌ File attachments
- ❌ API for third-parties
- ❌ SOC 2 compliance

**These can wait. Ship the MVP first.**

---

## Weekly Rhythm

**Monday (2hrs):**
- Review previous week
- Plan current week
- Update project board

**Tuesday-Thursday (8-10hrs/day):**
- Deep work blocks (4h AM, 4h PM)
- Focus on shipping features
- Deploy to staging daily

**Friday (4-6hrs):**
- Testing and QA
- Bug fixes
- Documentation
- Retrospective

**Weekend:**
- **OFF** (avoid burnout)

---

## Success Criteria

### By Week 6:
- [ ] Core features work
- [ ] Can demo to potential customers
- [ ] No critical bugs

### By Week 9:
- [ ] Can charge money
- [ ] Security basics done
- [ ] Works well on mobile

### By Week 12:
- [ ] Live in production
- [ ] Ready for first beta users
- [ ] Monitoring working
- [ ] Support process ready

---

## Common Pitfalls

### 1. Feature Creep
**Problem:** "Just one more feature..."
**Solution:** Write MVP scope, tape to wall, don't deviate

### 2. Perfectionism
**Problem:** Polishing endlessly, never shipping
**Solution:** "Good enough" for MVP, iterate based on feedback

### 3. Skipping Testing
**Problem:** Critical bugs in production
**Solution:** Friday testing ritual, minimum E2E tests

### 4. Ignoring Performance
**Problem:** Slow app kills activation
**Solution:** Week 8 dedicated to performance

### 5. No User Feedback
**Problem:** Building in vacuum
**Solution:** Show progress to potential customers weekly

---

## Adjustments for Your Situation

### If Learning Stack (+4 weeks = 16 total)
- Weeks 1-2: Learning & tutorials
- Weeks 3-18: Follow original plan (slower pace)
- Accept learning curve

### If Part-Time (20 hrs/week, 2x timeline = 24 weeks)
- Halve weekly deliverables
- Focus on consistency
- May need to reduce scope further

### If You Have Help (-2 to -4 weeks)
- Frontend dev: -2 weeks (parallel work)
- Full team (3-4): -4 weeks (6-8 weeks total)
- But add coordination overhead

---

## Pre-Sprint Checklist (Week 0)

**Before Week 1:**

**Development:**
- [ ] Dev machine set up
- [ ] IDE and tools installed
- [ ] Git repository created
- [ ] Project scaffolding done

**Infrastructure:**
- [ ] Cloud account created (AWS/Vercel/Railway)
- [ ] Domain name purchased
- [ ] Dev environment deployed
- [ ] Database provisioned

**Services:**
- [ ] Stripe account (test mode)
- [ ] Email service (SendGrid/Postmark)
- [ ] Analytics (Mixpanel/Amplitude)
- [ ] Error tracking (Sentry)

**Legal:**
- [ ] Terms of Service drafted
- [ ] Privacy Policy drafted
- [ ] Business entity formed

**Design:**
- [ ] Wireframes for key screens
- [ ] Color palette and branding
- [ ] Logo (even simple text is fine)

---

## Post-Sprint (Week 13-16): Private Beta

**Week 13-16 Goals:**
- [ ] Onboard first 10-20 beta users
- [ ] Daily monitoring and support
- [ ] Rapid bug fixes
- [ ] Collect detailed feedback
- [ ] Iterate on UX

**Success Metrics:**
- 30%+ activation (complete onboarding)
- 40%+ weekly active (Week 2)
- 10+ pieces of actionable feedback
- 3-5 paying customers

---

## Post-Sprint (Week 17+): Public Launch

**Launch Activities:**
- [ ] Remove waitlist/invite requirement
- [ ] Launch on Product Hunt
- [ ] Launch on Hacker News (Show HN)
- [ ] Twitter announcement
- [ ] Email list announcement
- [ ] Start content marketing

**Growth Phase:**
- Continue iterating based on feedback
- Build next features from roadmap
- Scale customer acquisition
- Optimize conversion funnel

---

## Key Metrics to Track

**Week 1-12 (Development):**
- Hours worked
- Features completed
- Bugs fixed
- Code deployed

**Week 13-16 (Beta):**
- Signups
- Activation rate
- Daily/weekly active users
- Feature usage
- Bug reports
- Customer feedback

**Week 17+ (Growth):**
- MRR (Monthly Recurring Revenue)
- Churn rate
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- NPS (Net Promoter Score)

---

## Emergency Scope Cuts

**If falling behind, cut in this order:**

1. Nice-to-have features (Week 10-11 extras)
2. Advanced views (keep list, cut Kanban)
3. Notifications (keep email, cut in-app)
4. Activity feed (defer to post-launch)
5. Search (can be basic initially)

**Never cut:**
- Authentication
- Core feature functionality
- Billing/payments
- Basic security
- Data backup

---

## Motivation & Sustainability

### When You Feel Behind:
- It's normal (everyone falls behind)
- Cut scope, not quality
- Extend timeline if needed
- Don't burn out

### When You Want to Quit:
- Remember why you started
- Look at progress (journal helps)
- Talk to other founders
- Take a day off
- Revisit after rest

### When You're Crushing It:
- Celebrate wins (even small ones)
- Share progress publicly
- Help other founders
- Don't let up (finish strong)

---

## Final Checklist (Before Launch)

- [ ] All core workflows tested
- [ ] No critical bugs
- [ ] Payments working
- [ ] Can support 50-100 users
- [ ] Monitoring active
- [ ] Help docs live
- [ ] Terms & Privacy live
- [ ] Can respond to support requests
- [ ] You would use it yourself

**If all checked: Ship it! 🚀**

---

## Resources

**Full Sprint Plan:** [12-week-mvp-sprint-plan.md](12-week-mvp-sprint-plan.md)

**Related Guides:**
- [Solo Founder Guide](solo-founder-guide.md) - Strategic advice
- [Planning Template Lite](saas-planning-prompt-lite.md) - Plan your MVP
- [Validation Checklist](planning-validation-checklist.md) - Verify readiness

---

**Remember:**
- 12 weeks is aggressive but doable
- Adjust for your situation
- Ship something imperfect
- Iterate based on real users
- Take care of yourself

**You've got this! Now go build. 🔨**
