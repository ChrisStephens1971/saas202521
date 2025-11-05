# Quick Reference: Solo Founder SaaS Guide

**Full version:** [solo-founder-guide.md](solo-founder-guide.md)

Essential advice for building a SaaS alone. Read this first, refer to full guide as needed.

---

## Reality Check (5 min read)

### Can You Do This Solo?

**Yes, if you have:**
- ✅ Full-stack coding ability (or willing to learn)
- ✅ 6-12 months runway (savings or part-time income)
- ✅ Self-discipline and persistence
- ✅ Comfortable with uncertainty
- ✅ Customer conversation skills

**Realistic Timelines:**
- MVP: 3-6 months
- First paying customer: 4-8 months
- Product-market fit: 12-24 months
- Profitability: 18-36 months

**Success Rate:** ~10% succeed, but success is possible with right approach.

---

## Your Advantages

1. **Speed** - No cofounder negotiations
2. **Lean** - Minimal burn rate
3. **Focus** - No meetings or politics
4. **Learning** - Become full-stack generalist
5. **Control** - 100% ownership

---

## Strategic Decisions

### Choose the Right Market

**Good for Solo:**
- ✅ Self-service business model
- ✅ Small team buyers (not committees)
- ✅ Low compliance (avoid healthcare/fintech initially)
- ✅ Digital-first customers
- ✅ Niche products ($10-50K target MRR)

**Avoid:**
- ❌ Enterprise sales cycles
- ❌ Heavy regulation
- ❌ Intense competition requiring huge budget

### Keep Product Simple

**MVP Rules:**
- 3-5 core features MAX
- Single user persona
- Mobile-responsive web (not native apps)
- One integration max
- Async over real-time

**Every feature added = 2x complexity**

---

## Technology Stack

### Use What You Know

**Don't learn new stack while building MVP.**

**Recommended Stacks:**

1. **JavaScript:** React + Next.js + Node.js + PostgreSQL
2. **Python:** Django/FastAPI + PostgreSQL + React
3. **Ruby:** Rails + Hotwire + PostgreSQL
4. **Serverless:** Next.js + Supabase

**Hosting (Keep Simple):**
- Vercel, Railway, Fly.io, or Render
- NOT: Kubernetes, self-managed servers

**Use Services, Not Code:**
- Auth: Clerk, Supabase Auth (don't build)
- Payments: Stripe (only option)
- Email: Resend, Postmark
- Support: Plain email initially

---

## The 3-5-10 Rule

### 3 Core Features
Pick 3 essential features that solve core problem. That's it.

### 5 User Flows
Design 5 critical user flows end-to-end:
1. Sign up and create workspace
2. Core feature #1
3. Core feature #2
4. Invite team member
5. Subscribe and pay

### 10 Screens Maximum
Landing, signup, login, dashboard, 5 app screens, settings, billing.

**Cut Everything Else.**

---

## Working With Claude (AI)

### Claude Can Help With:
- Code generation and scaffolding
- Bug fixes and debugging
- Architecture advice
- Documentation writing
- Problem solving

### How to Use Effectively:
1. **Be specific** - Detailed prompts get better results
2. **Iterate** - Start high-level, then dive into specifics
3. **Verify** - Understand code before using
4. **Learn** - Ask "why" to understand patterns

### Claude Cannot:
- Make product decisions for you
- Talk to customers
- Replace your judgment
- Provide ongoing motivation

---

## Time Management

### Sustainable Weekly Schedule (40-50 hrs)

**Monday (6-8h):**
- Planning and priorities
- Admin tasks

**Tuesday-Thursday (8-10h/day):**
- Deep work blocks (4h AM, 4h PM)
- Coding and building
- Phone on airplane mode

**Friday (6-8h):**
- Testing and bug fixes
- Deploy to staging
- Retrospective
- Customer support

**Saturday-Sunday:**
- **OFF** (take weekends, avoid burnout)

### Protecting Deep Work

- 4-hour focus blocks
- No email/Slack during deep work
- One hard problem per morning
- Routine coding in afternoon
- Admin when tired

**You have ~4-6 hours of quality coding time per day. Use wisely.**

---

## When to DIY vs. Pay

### Always DIY:
- ✅ Core product code
- ✅ Database architecture
- ✅ Customer conversations
- ✅ Product decisions

### Consider Paying For:
- **Design:** $500-$5K (logo, landing page, UI kit)
- **Legal:** $500-$2K (ToS/Privacy review)
- **Accounting:** $100-$500/mo (once you have revenue)
- **DevOps:** $1K-$5K (CI/CD setup, security audit)

### Never Pay For (At MVP):
- ❌ Expensive agencies
- ❌ PR firms
- ❌ SEO services
- ❌ Growth hackers

**Before $10K MRR, do it yourself.**

---

## Top 10 Mistakes to Avoid

1. **Building in a vacuum** - Talk to 20+ customers first
2. **Feature creep** - Write MVP scope, tape to wall
3. **Perfectionism** - Ship early, iterate
4. **Ignoring marketing** - Start Day 1, build list
5. **Underpricing** - Charge $29-99/mo minimum (B2B)
6. **Competing with giants** - Niche down 10x
7. **Over-engineering** - Monolith first, scale later
8. **Neglecting security** - Build it right from start
9. **Ignoring unit economics** - Know CAC, LTV, margins
10. **Going it alone** - Join communities, find mentors

---

## First 10 Customers

### Customers 1-3: Your Network
- Former colleagues, friends in industry
- Direct outreach, personal ask
- Week 12-14

### Customers 4-7: Direct Outreach
- LinkedIn, Twitter, Reddit, communities
- Start conversations, provide value first
- Week 14-18

### Customers 8-10: Launch Platforms
- Product Hunt, Hacker News, Reddit
- Be authentic, not salesy
- Week 18-24

**Offer:** Free 3-6 months OR 50% off lifetime for feedback and testimonials.

**Timeline:** 3-6 months to get first 10. Be patient.

---

## When to Hire

### Ready When:
- $5K+ MRR (contractor)
- $10K+ MRR (part-time)
- $20K+ MRR (full-time)
- Spending >10hrs/week on non-core tasks
- Clear, repetitive work to delegate

### Who to Hire First:
1. Part-time developer (scale dev capacity)
2. Designer (improve UX/conversion)
3. Customer support (free up your time)
4. Marketing/content (consistent growth)

**Start with contractors, convert to permanent if working well.**

---

## Mental Health

### Warning Signs of Burnout:
- Can't focus >30 minutes
- Dread opening laptop
- Sleeping poorly
- Constant anxiety
- No joy in coding

### Prevention:
- **Exercise:** 3-4x/week minimum
- **Sleep:** 7-8 hours
- **Social:** See friends weekly
- **Hobbies:** Keep one non-work interest
- **Weekends:** Actually take them off
- **Community:** Join founder groups (Indie Hackers)

### When to Consider Quitting:
- No traction after 18+ months
- Severe mental health impact
- Runway exhausted
- Lost passion completely

**Quitting is not failure. It's a rational decision.**

---

## Essential Resources

### Communities:
- Indie Hackers (indiehackers.com)
- Twitter #BuildInPublic
- Reddit: r/SaaS, r/Entrepreneur

### Books:
- "The Mom Test" - Customer conversations
- "The Lean Startup" - Building iteratively
- "Traction" - Marketing channels
- "Zero to Sold" - Arvid Kahl's journey

### Tools Budget:
- Minimal: $50-100/month
- Comfortable: $200-300/month
- Don't overspend before revenue

---

## Your 90-Day Plan

### Week 1:
- [ ] Read full solo founder guide
- [ ] Complete Lite planning template
- [ ] Talk to 5 potential customers
- [ ] Join Indie Hackers

### Week 2-4:
- [ ] Validate problem with 20 conversations
- [ ] Finalize MVP scope (3 features)
- [ ] Set up dev environment
- [ ] Create wireframes

### Week 5-12:
- [ ] Build MVP (follow 12-week sprint plan)
- [ ] Deploy to staging weekly
- [ ] Show progress to potential customers
- [ ] Build email list

### Week 13-16:
- [ ] Beta launch (10-20 users)
- [ ] Daily monitoring and support
- [ ] Collect feedback, iterate
- [ ] Fix critical bugs

### Week 17+:
- [ ] Public launch
- [ ] First paying customers
- [ ] Continue iterating
- [ ] Growth experiments

---

## Success Metrics

### Year 1:
- Product launched ✓
- 10-50 paying customers ✓
- $1K-$10K MRR ✓
- Product-market fit emerging ✓

### Year 2:
- 50-200 customers
- $10K-$50K MRR
- Profitable or nearly
- Maybe first hire

### Year 3:
- 200-500 customers
- $50K-$150K MRR
- Small team (2-5 people)
- Life-changing income

**This is realistic, not hype.**

---

## Key Principles

1. **Start small** - 3 features, niche market
2. **Ship early** - Imperfect is okay
3. **Talk to customers** - Constantly
4. **Stay healthy** - Sustainable pace
5. **Join community** - You're not alone
6. **Be patient** - 18-24 months to traction
7. **Keep learning** - From customers and failures
8. **Take breaks** - Burnout kills projects
9. **Focus intensely** - One product, one market
10. **Persist** - Most quit too early

---

## Final Checklist

Before starting development:

- [ ] Talked to 20+ potential customers
- [ ] Clear problem worth solving
- [ ] 6-12 months runway
- [ ] MVP scoped to 3-5 features
- [ ] Familiar tech stack chosen
- [ ] First 10 customers identified
- [ ] Joined founder community
- [ ] Mental health plan in place

---

## Quick Links

**For detailed guidance, see full guide:**
- [Complete Solo Founder Guide](solo-founder-guide.md) (14 sections, 60 min read)
- [12-Week Sprint Plan](12-week-mvp-sprint-plan.md) (week-by-week dev plan)
- [Planning Template Lite](saas-planning-prompt-lite.md) (plan your SaaS)
- [Validation Checklist](planning-validation-checklist.md) (verify completeness)

---

## Remember

**You can absolutely do this.**

- 10-30% of successful SaaS started solo
- Many hit $10K-$100K MRR before hiring
- Success requires: realistic expectations + discipline + resilience

**Solo doesn't mean alone.**
You have Claude, communities, and this guide.

**Now go build something people want. 🚀**

---

**Full Guide:** [solo-founder-guide.md](solo-founder-guide.md) (~7,000 words)

**Use This Quick Reference When:**
- Need quick motivation or reality check
- Forgot key principles
- Making strategic decisions
- Feeling stuck or burned out

**Use Full Guide When:**
- Starting your SaaS journey
- Need deep tactical advice
- Facing specific challenges (hiring, marketing, etc.)
- Want comprehensive mental health guidance
