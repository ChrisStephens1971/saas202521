# Quick Reference: Planning Validation Checklist

**Full checklist:** [planning-validation-checklist.md](planning-validation-checklist.md)

Quick guide to verify your SaaS planning is complete before development.

---

## When to Use This

**After completing planning (Lite or Full template):**
- Verify nothing critical was missed
- Identify gaps before coding
- Get go/no-go decision
- Set priorities for addressing gaps

**Target:** 80%+ overall completion, 100% of critical items

---

## Critical Items Only (Must Be 100%)

These are marked with 🔴 in full checklist. **Cannot proceed without these:**

### Product & Strategy (2 items)
- [ ] 🔴 Clear problem statement customers will pay to solve
- [ ] 🔴 Defined target customer with specific characteristics

### Technical Architecture (3 items)
- [ ] 🔴 Multi-tenancy strategy selected with rationale
- [ ] 🔴 Technology stack chosen (aligned with team expertise)
- [ ] 🔴 Database architecture designed with tenant isolation

### Security & Compliance (2 items)
- [ ] 🔴 Compliance requirements identified (GDPR, SOC 2, etc.)
- [ ] 🔴 Data classification done (PII, financial, sensitive)

### Business Model (3 items)
- [ ] 🔴 Pricing model selected (per-seat, usage, tiered, etc.)
- [ ] 🔴 Pricing tiers defined with feature matrix
- [ ] 🔴 Unit economics calculated (CAC, LTV, margins)

### Product Features (1 item)
- [ ] 🔴 MVP feature list defined (5 or fewer core features)

### Go-to-Market (2 items)
- [ ] 🔴 Customer acquisition strategy defined
- [ ] 🔴 First 10 customers identified (ideally by name)

### Operations (2 items)
- [ ] 🔴 Core team roles identified (who does what)
- [ ] 🔴 Budget allocated for 12 months

**Total Critical Items: 15**

**If any are missing: Stop and complete them before development.**

---

## Section-by-Section Readiness

### 1. Product Vision & Strategy (10 items)
**Essential questions:**
- Clear problem worth solving?
- Target customer defined?
- Market size understood?
- Differentiation clear?
- Success metrics identified?

**Minimum:** 70% (7/10 items)

---

### 2. Technical Architecture (15 items)
**Essential questions:**
- Multi-tenancy approach decided?
- Tech stack selected?
- Database designed?
- Security approach defined?
- Scalability considered?

**Minimum:** 70% (11/15 items)

---

### 3. Security & Compliance (15 items)
**Essential questions:**
- Compliance requirements identified?
- Authentication method selected?
- Data encryption planned?
- Privacy policy drafted?
- Incident response outlined?

**Minimum:** 80% (12/15 items)
**Critical items:** 100%

---

### 4. Business Model (15 items)
**Essential questions:**
- Pricing model chosen?
- Pricing tiers defined?
- Unit economics calculated?
- Payment processor selected?
- Revenue projections done?

**Minimum:** 80% (12/15 items)
**Critical items:** 100%

---

### 5. Product Features (15 items)
**Essential questions:**
- MVP features defined (3-5 max)?
- User flows mapped?
- Wireframes created?
- Roles and permissions defined?
- Onboarding designed?

**Minimum:** 60% (9/15 items)

---

### 6. Go-to-Market (15 items)
**Essential questions:**
- Customer acquisition plan?
- First 10 customers identified?
- Marketing channels prioritized?
- Launch timeline set?
- Beta program planned?

**Minimum:** 70% (11/15 items)
**Critical items:** 100%

---

### 7. Support & Success (10 items)
**Essential questions:**
- Support model defined?
- Response time commitments?
- Knowledge base planned?
- Onboarding process documented?
- Retention strategy outlined?

**Minimum:** 50% (5/10 items)

---

### 8. Operations & Team (15 items)
**Essential questions:**
- Team roles defined?
- Budget allocated?
- Development roadmap?
- Runway calculated?
- Tools and software budgeted?

**Minimum:** 70% (11/15 items)
**Critical items:** 100%

---

### 9. Data & Analytics (10 items)
**Essential questions:**
- Analytics tool selected?
- Key metrics defined?
- Event tracking planned?
- Dashboards designed?
- Data privacy compliant?

**Minimum:** 50% (5/10 items)

---

### 10. Risk Management (10 items)
**Essential questions:**
- Top risks identified?
- Mitigation plans for major risks?
- Technical risks addressed?
- Financial risks understood?
- Insurance coverage planned?

**Minimum:** 50% (5/10 items)

---

## Overall Scoring

| Score | Status | Action |
|-------|--------|--------|
| **90-100%** | Excellent | ✅ Ready to proceed |
| **80-89%** | Good | ✅ Proceed with minor gaps |
| **70-79%** | Fair | ⚠️ Address critical gaps first |
| **Below 70%** | Incomplete | ❌ Not ready, complete planning |

**Critical items:** Must be 100% regardless of overall score

---

## Solo Founder Adjusted Thresholds

**For solo founders, different criteria apply:**

### Must Have (100% Required):
- [ ] Product vision clear
- [ ] Tech stack selected (familiar to you)
- [ ] Multi-tenancy approach decided
- [ ] Security basics planned
- [ ] Pricing model defined
- [ ] First 10 customers identified
- [ ] 6-month budget allocated

### Can Be "Good Enough" (70-80% okay):
- Product roadmap beyond MVP
- Advanced scalability planning
- Formal compliance (unless regulated)
- Sophisticated analytics
- Detailed risk management

### Can Defer Until Traction:
- SOC 2 audit
- Advanced integrations
- Team hiring plans
- Formal sales process
- Complex customization

---

## Red Flags (Stop and Reconsider)

**Stop if:**
- ❌ Scored <50% on Technical Architecture
- ❌ No clarity on problem/customer
- ❌ Can't name first 10 customers
- ❌ Tech stack completely unfamiliar
- ❌ Regulated industry without domain expertise
- ❌ <3 months runway remaining
- ❌ All critical items not 100%

**These indicate you're not ready. Complete planning first.**

---

## Quick Validation Questions

**Can you answer these clearly?**

1. **What problem are you solving?** (1 sentence)
2. **Who is your customer?** (Specific description)
3. **What are your 3 core features?** (List them)
4. **How will you charge?** (Pricing model)
5. **Who are your first 10 customers?** (Ideally by name)
6. **What's your tech stack?** (Backend, frontend, database)
7. **How will you isolate tenant data?** (Multi-tenancy approach)
8. **When can you launch MVP?** (Realistic date)
9. **How much runway do you have?** (Months)
10. **What's your biggest risk?** (And mitigation)

**If you can't answer all 10 clearly: More planning needed.**

---

## Common Gaps by Founder Type

### First-Time Founders Often Missing:
- Unit economics (CAC, LTV calculations)
- Realistic timelines
- Compliance requirements
- Security architecture
- Risk mitigation

### Technical Founders Often Missing:
- Go-to-market strategy
- Pricing strategy
- Customer identification
- Sales process
- Support model

### Business Founders Often Missing:
- Technical architecture details
- Scalability approach
- Security measures
- Development timeline
- Technical risks

**Use checklist to identify your blind spots.**

---

## What to Do With Gaps

### High-Priority Gaps (Address Before Development):
- Critical items (marked 🔴)
- Technical architecture basics
- Security fundamentals
- Pricing and business model
- First customer identification

### Medium-Priority Gaps (Address in First Sprint):
- Advanced scalability
- Detailed roadmap
- Support processes
- Analytics implementation
- Risk mitigation details

### Low-Priority Gaps (Address Post-MVP):
- Advanced compliance (SOC 2)
- Sophisticated analytics
- Detailed hiring plans
- Complex integrations
- Enterprise features

---

## Pre-Development Final Check

**Before writing code, confirm:**

- [ ] Overall completion ≥80% OR all critical items 100%
- [ ] Product vision validated with 10+ customer conversations
- [ ] Technical architecture decided and documented
- [ ] Security and privacy requirements clear
- [ ] Pricing validated (would people pay this?)
- [ ] MVP features defined and scoped (5 or fewer)
- [ ] First 10 customers identified specifically
- [ ] 6-12 month budget allocated
- [ ] Success metrics defined
- [ ] You're excited to build this

**If all checked: Start Week 1 of sprint plan! 🚀**

---

## How to Use Full Checklist

**The full checklist has 130+ items across 10 sections:**

1. Open [planning-validation-checklist.md](planning-validation-checklist.md)
2. Check off completed items (☐ → ☑)
3. Score each section (X/total)
4. Calculate overall completion %
5. Identify gaps and prioritize
6. Address critical gaps first
7. Re-validate before starting development

**Time Required:** 1-2 hours for thorough validation

---

## When to Re-Validate

**Monthly During Development:**
- Quick validation (30 min)
- Check if assumptions still valid
- Identify new gaps from learnings

**Before Major Milestones:**
- Before beta launch
- Before public launch
- Before first enterprise sale
- Before Series A fundraising

**After Pivots:**
- Complete re-validation needed
- May require new planning document

---

## Industry-Specific Additions

### If Healthcare:
Add these critical items:
- [ ] 🔴 HIPAA compliance requirements mapped
- [ ] 🔴 Business Associate Agreements prepared
- [ ] PHI handling procedures documented
- [ ] HITRUST certification timeline

### If Fintech:
Add these critical items:
- [ ] 🔴 Required licenses identified
- [ ] 🔴 Banking partnerships established or planned
- [ ] AML/KYC program designed
- [ ] OFAC screening implemented

### If EdTech:
Add these critical items:
- [ ] 🔴 FERPA compliance addressed
- [ ] 🔴 COPPA compliance (if users <13)
- [ ] WCAG 2.1 AA accessibility plan
- [ ] Student Privacy Pledge signed

---

## Bottom Line

**The validation checklist helps you:**
- Catch gaps before they become problems
- Ensure you've thought through essentials
- Prioritize what needs attention
- Make informed go/no-go decision
- Avoid common founder mistakes

**Minimum to proceed:**
- 80% overall completion
- 100% of critical items (🔴)
- All 10 quick validation questions answered clearly
- First 10 customers identified
- 6-12 months runway

**If you meet these: You're ready to build. Go! 🚀**

**If you don't: That's okay. Complete your planning. Better now than after wasting months building the wrong thing.**

---

**Full Checklist:** [planning-validation-checklist.md](planning-validation-checklist.md) (130+ items, detailed scoring)

**Use This Quick Reference When:**
- Need fast go/no-go decision
- Want to check critical items only
- Reviewing before key milestone
- Don't have time for full checklist

**Use Full Checklist When:**
- Comprehensive validation needed
- First time planning SaaS
- Preparing for fundraising
- Building in regulated industry
