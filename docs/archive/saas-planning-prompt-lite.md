# Multi-Tenant SaaS Planning Prompt Template - Lite Version

This is a streamlined prompt template for AI assistants to guide users through planning a simpler multi-tenant SaaS application, focused on getting to MVP quickly.

**Use this version when:**
- Building a lean startup or MVP
- Small team (1-5 people)
- Target scale: <100 tenants in first year
- Self-service business model only
- Standard compliance requirements

**Use the full template when:**
- Enterprise sales strategy
- Regulated industries requiring heavy compliance
- Complex integrations and customization
- Large-scale operations (500+ tenants)

---

## Instructions for AI Assistant

You are helping plan a multi-tenant SaaS MVP. Guide the user through this streamlined questionnaire, focusing on essentials to get to market quickly. After gathering information, synthesize a concise planning document focused on MVP delivery.

**Important**: Keep the conversation focused on MVP scope. Push back on premature optimization or enterprise features.

---

## Section 1: Core Product

1. **What problem are you solving and for whom?**
   - Problem statement
   - Target customer profile
   - Why existing solutions don't work

2. **What is the minimum feature set to solve this problem?**
   - Top 3-5 must-have features only
   - What can wait until post-launch?

3. **What is your expected scale in the first year?**
   - Number of tenants
   - Users per tenant
   - Basic usage patterns

---

## Section 2: Technical Decisions

4. **Multi-tenancy approach:**
   - Shared database with row-level security (simple, cost-effective)
   - Separate schemas per tenant (balanced)
   - Note: Separate databases typically not needed for MVP

5. **Technology stack:**
   - Backend (Node.js/Python/Ruby/PHP)?
   - Frontend (React/Vue/plain JS)?
   - Database (PostgreSQL/MySQL/MongoDB)?
   - Hosting (Vercel/Railway/Heroku/AWS)?
   - Any existing expertise to leverage?

6. **Authentication approach:**
   - Email/password only (simplest)
   - Social auth (Google, GitHub)
   - Magic links
   - Note: SSO can wait until post-MVP

7. **Key infrastructure needs:**
   - File storage needed? (S3/Cloudinary)
   - Real-time features? (WebSockets)
   - Background jobs? (simple queue)
   - Email service? (SendGrid/Postmark/Resend)

---

## Section 3: Business Model (Simple)

8. **Pricing approach:**
   - Free tier? (Y/N and limits)
   - Single paid tier to start? (recommended)
   - Per-seat or flat rate?
   - Approximate price point?

9. **Payment handling:**
   - Stripe Checkout (simplest - recommended)
   - Custom billing portal (can wait)
   - Free trial length? (7/14/30 days)

10. **What happens when limits are reached?**
    - Hard block vs. soft prompts to upgrade
    - Grace period for payment failures

---

## Section 4: Essential Features Only

11. **MVP Core Features (limit to 5):**
    - Feature 1: [Description]
    - Feature 2: [Description]
    - Feature 3: [Description]
    - Feature 4: [Description]
    - Feature 5: [Description]

12. **User roles needed:**
    - Just Owner/Member? (simplest)
    - Admin role needed?
    - Guest access?

13. **Tenant customization:**
    - Custom branding? (Y/N)
    - Custom domain? (can usually wait)
    - What else is essential?

---

## Section 5: Compliance Basics

14. **What data are you collecting?**
    - Personal info (names, emails)?
    - Payment info (handled by Stripe)?
    - Sensitive data requiring special handling?

15. **Geographic considerations:**
    - US only initially? (simplest)
    - EU customers? (need GDPR basics)
    - Data residency requirements?

16. **Essential legal docs:**
    - Terms of Service (required)
    - Privacy Policy (required)
    - Cookie consent if EU (conditional)

---

## Section 6: Launch Plan

17. **Who are your first 10 customers?**
    - Existing network?
    - Specific companies in mind?
    - Community to tap into?

18. **What support will you offer initially?**
    - Email only (typical)
    - Response time commitment (24-48h)
    - Self-serve docs priority

19. **How will users onboard?**
    - Self-service signup flow
    - Onboarding checklist/tour
    - Sample data/templates?

20. **Timeline to launch?**
    - MVP completion target
    - Beta testing period
    - Public launch date

---

## Simplified Output Format

After gathering responses, create a concise planning document:

### 1. Product Summary (1 page)
- Problem and solution
- Target customer
- MVP feature list (5 key features)
- Differentiator

### 2. Technical Plan (1-2 pages)
- Tech stack decisions with rationale
- Multi-tenancy approach
- Infrastructure and hosting
- Third-party services (Stripe, email, etc.)

### 3. MVP Scope (1 page)
- In-scope features
- Explicitly out-of-scope (post-MVP)
- User flows for core features

### 4. Business Model (1 page)
- Pricing tiers (keep it simple!)
- Free vs. paid features
- Payment processing approach

### 5. Compliance & Legal (1 page)
- Required legal documents
- Data handling and privacy basics
- Cookie consent if needed

### 6. Launch Checklist (1 page)
- Pre-launch tasks
- Beta testing plan
- Go-to-market approach
- First 10 customer acquisition plan

### 7. Timeline & Milestones
- MVP development phases
- Beta launch date
- Public launch date
- Key metrics to track

---

## MVP Best Practices Reminder

When synthesizing the plan, remind the user:

**Keep It Simple:**
- Start with ONE paid tier (can add more later)
- Defer enterprise features (SSO, custom SLAs, advanced security)
- Use managed services (less DevOps burden)
- Avoid premature optimization

**Technical Decisions:**
- Choose boring, proven technology
- Monolith before microservices
- Shared database is fine for MVP
- Use existing libraries, don't build from scratch

**Feature Discipline:**
- 5 core features maximum for MVP
- Every additional feature delays launch
- Post-MVP roadmap is OK to have, but stay focused

**Launch Fast:**
- 8-12 weeks to MVP for small team
- Private beta → public beta → paid launch
- Get feedback early and iterate

**Avoid These Pitfalls:**
- Building too many features before launch
- Enterprise features when targeting SMBs
- Custom auth systems (use Auth0/Clerk/Supabase)
- Complex multi-region setups for <100 tenants
- SOC 2 before product-market fit (unless B2B enterprise)

---

## Usage Instructions

To use this template:

1. Copy this prompt into your conversation with an AI assistant
2. Answer the 20 core questions
3. Receive a focused MVP planning document
4. Start building and ship in 8-12 weeks

This lite template helps you avoid over-engineering and stay focused on validating your idea with real customers quickly.
