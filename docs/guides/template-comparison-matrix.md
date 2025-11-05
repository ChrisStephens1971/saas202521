# SaaS Planning Template Comparison Matrix

This matrix helps you understand which questions are covered in each template version and decide which is right for your project.

## Quick Decision Guide

| Your Situation | Recommended Template | Estimated Planning Time |
|----------------|---------------------|------------------------|
| Solo founder, MVP, <50 tenants target | **Lite** | 2-4 hours |
| Small team (2-5), B2B SMB, <500 tenants | **Lite** or **Full** (sections 1-6) | 4-8 hours |
| VC-backed, enterprise sales, >500 tenants | **Full** | 8-16 hours |
| Regulated industry (healthcare, fintech) | **Full** + **Industry Variant** | 12-20 hours |

---

## Coverage by Section

| Section | Lite Version | Full Version | Questions in Lite | Questions in Full |
|---------|--------------|--------------|-------------------|-------------------|
| **Product Vision & Market** | ✓ | ✓ | 3 | 5 |
| **Technical Architecture** | ✓ Simplified | ✓ Comprehensive | 4 | 6 |
| **Business Model & Pricing** | ✓ Basic | ✓ Advanced | 3 | 4 |
| **Product Features** | ✓ MVP Focus | ✓ Full Roadmap | 3 | 5 |
| **Compliance & Legal** | ✓ Basics | ✓ Comprehensive | 3 | 6 |
| **Go-to-Market** | ✓ Simple | ✓ Detailed | 4 | 4 |
| **Enterprise Operations** | ✗ | ✓ | 0 | 8 |
| **Enterprise Sales** | ✗ | ✓ | 0 | 5 |
| **Governance & Risk** | ✗ | ✓ | 0 | 5 |
| **TOTAL QUESTIONS** | | | **20** | **48** |

---

## Detailed Question Mapping

### Section 1: Product Vision & Market

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 1 | Problem, solution, target customer | ✓ | ✓ | Lite version simplified |
| 2 | MVP feature set | ✓ | ✓ | Lite: 3-5 features; Full: detailed |
| 3 | Expected scale | ✓ | ✓ | Same coverage |
| 4 | User personas | ✗ | ✓ | Full only |
| 5 | Geographic markets | ✗ | ✓ | Full only |

**Lite covers:** Core product definition
**Full adds:** Detailed market segmentation, personas, geo strategy

---

### Section 2: Technical Architecture

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 6 | Multi-tenancy approach | ✓ | ✓ | Lite: 3 options; Full: 4 with hybrid |
| 7 | Technology stack | ✓ | ✓ | Lite: simplified; Full: detailed |
| 8 | Authentication | ✓ | ✓ | Lite: basic; Full: enterprise (SSO) |
| 9 | Infrastructure needs | ✓ | ✓ | Lite: key services; Full: comprehensive |
| 10 | Scalability considerations | ✗ | ✓ | Full only |
| 11 | Observability | ✗ | ✓ | Full only |
| 12 | Security architecture | Partial | ✓ | Lite: auth only; Full: comprehensive |

**Lite covers:** Core tech decisions to start building
**Full adds:** Scalability planning, monitoring, advanced security

---

### Section 3: Business Model & Pricing

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 13 | Pricing model | ✓ | ✓ | Lite: simple; Full: multiple models |
| 14 | Pricing tiers | ✓ | ✓ | Lite: 1-2 tiers; Full: 3-4+ tiers |
| 15 | Payment handling | ✓ | ✓ | Lite: Stripe only; Full: multiple |
| 16 | Limit enforcement | ✓ | ✓ | Similar coverage |
| 17 | Billing requirements | ✗ | ✓ | Full only |
| 18 | Payment failure handling | Partial | ✓ | Lite: basic; Full: detailed |

**Lite covers:** Simple pricing to get started
**Full adds:** Complex billing, enterprise invoicing, multi-currency

---

### Section 4: Product Features & Capabilities

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 19 | Core features | ✓ | ✓ | Lite: 5 max; Full: 5-10 |
| 20 | User roles | ✓ | ✓ | Lite: 2 roles; Full: complex RBAC |
| 21 | Tenant customization | ✓ | ✓ | Lite: basic; Full: extensive |
| 22 | Customizable features | ✗ | ✓ | Full only |
| 23 | User management | Partial | ✓ | Lite: basic; Full: comprehensive |
| 24 | Admin capabilities | ✗ | ✓ | Full only |
| 25 | Data & analytics | ✗ | ✓ | Full only |

**Lite covers:** MVP features only
**Full adds:** Advanced customization, admin tools, analytics

---

### Section 5: Compliance, Legal & Data Governance

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 26 | Data collection | ✓ | ✓ | Lite: basic; Full: comprehensive |
| 27 | Geographic/GDPR | ✓ | ✓ | Similar coverage |
| 28 | Legal documents | ✓ | ✓ | Lite: ToS/Privacy; Full: all docs |
| 29 | Compliance frameworks | ✗ | ✓ | Full only (SOC 2, HIPAA, etc.) |
| 30 | Data governance policies | ✗ | ✓ | Full only |
| 31 | Tenant isolation | ✗ | ✓ | Full only |
| 32 | Data residency | Partial | ✓ | Lite: basic; Full: detailed |
| 33 | Liability & risk | ✗ | ✓ | Full only |

**Lite covers:** Basic legal requirements to launch
**Full adds:** Enterprise compliance, certifications, risk management

---

### Section 6: Go-to-Market & Operations

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 34 | First customers | ✓ | ✓ | Lite: first 10; Full: broader GTM |
| 35 | Support model | ✓ | ✓ | Lite: email only; Full: tiered |
| 36 | User onboarding | ✓ | ✓ | Similar coverage |
| 37 | Timeline to launch | ✓ | ✓ | Lite: MVP focus; Full: phased |
| 38 | Onboarding flow | Partial | ✓ | Lite: basic; Full: detailed |
| 39 | Migration needs | ✗ | ✓ | Full only |
| 40 | Integration capabilities | ✗ | ✓ | Full only |

**Lite covers:** Getting first customers and launching
**Full adds:** Formal GTM strategy, migration services

---

### Section 7: Enterprise-Grade Operations (Full Only)

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 41 | Deployment strategy | ✗ | ✓ | CI/CD, blue-green, etc. |
| 42 | Environment strategy | ✗ | ✓ | Dev/staging/prod |
| 43 | Availability requirements | ✗ | ✓ | SLAs, uptime targets |
| 44 | Disaster recovery | ✗ | ✓ | RTO/RPO, backups |
| 45 | Advanced security | ✗ | ✓ | Pen testing, audits |
| 46 | Audit & compliance reporting | ✗ | ✓ | Compliance automation |
| 47 | Tenant provisioning | ✗ | ✓ | Automated lifecycle |
| 48 | Tenant management | ✗ | ✓ | Health monitoring, analytics |

**Why Lite skips this:** Too complex for MVP; implement as you scale

---

### Section 8: Enterprise Sales & Customer Success (Full Only)

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 49 | Enterprise sales model | ✗ | ✓ | POC, RFP process |
| 50 | Enterprise features | ✗ | ✓ | Custom SLAs, pricing |
| 51 | Implementation services | ✗ | ✓ | Professional services |
| 52 | Extensibility | ✗ | ✓ | Plugin architecture |
| 53 | Account management | ✗ | ✓ | CSM structure |

**Why Lite skips this:** Start with self-service; add later

---

### Section 9: Governance, Risk & Change Management (Full Only)

| # | Question Topic | Lite | Full | Notes |
|---|----------------|------|------|-------|
| 54 | Change management | ✗ | ✓ | CAB, maintenance windows |
| 55 | Backwards compatibility | ✗ | ✓ | API versioning |
| 56 | Vendor dependencies | ✗ | ✓ | Vendor risk assessment |
| 57 | Open source strategy | ✗ | ✓ | License compliance |
| 58 | Performance management | ✗ | ✓ | Capacity planning |

**Why Lite skips this:** Premature for MVP stage

---

## Feature Coverage Summary

### Security & Compliance

| Feature | Lite | Full |
|---------|------|------|
| Basic authentication | ✓ | ✓ |
| SSO/SAML | ✗ | ✓ |
| Terms & Privacy Policy | ✓ | ✓ |
| SOC 2 planning | ✗ | ✓ |
| GDPR basics | ✓ | ✓ |
| Advanced compliance (HIPAA, ISO) | ✗ | ✓ |
| Audit logging | ✗ | ✓ |
| Penetration testing | ✗ | ✓ |

### Technical Architecture

| Feature | Lite | Full |
|---------|------|------|
| Multi-tenancy decision | ✓ | ✓ |
| Tech stack selection | ✓ | ✓ |
| Scalability planning | ✗ | ✓ |
| High availability | ✗ | ✓ |
| Disaster recovery | ✗ | ✓ |
| Monitoring/observability | Minimal | ✓ |
| CI/CD strategy | ✗ | ✓ |
| Multi-region | ✗ | ✓ |

### Business & Sales

| Feature | Lite | Full |
|---------|------|------|
| Pricing strategy | ✓ Basic | ✓ Advanced |
| Self-service signup | ✓ | ✓ |
| Enterprise sales | ✗ | ✓ |
| Professional services | ✗ | ✓ |
| Customer success | Email only | ✓ Tiered |
| Account management | ✗ | ✓ |

### Operations

| Feature | Lite | Full |
|---------|------|------|
| Launch plan | ✓ | ✓ |
| Support model | ✓ Basic | ✓ Tiered |
| Change management | ✗ | ✓ |
| Vendor management | ✗ | ✓ |
| Capacity planning | ✗ | ✓ |

---

## When to Upgrade from Lite to Full

Consider using the Full template when you hit these milestones:

### Revenue Triggers
- **$10K+ MRR:** Time to think about scalability and monitoring
- **$50K+ MRR:** Need enterprise features and sales process
- **$100K+ MRR:** Should have compliance certifications in progress

### Customer Triggers
- **First enterprise deal in pipeline:** Need sections 7-9
- **50+ paying tenants:** Need better operations and monitoring
- **Regulated industry customers:** Need compliance framework

### Team Triggers
- **First sales hire:** Need enterprise sales playbook
- **First DevOps hire:** Need operational maturity
- **5+ engineers:** Need formal change management

### Technical Triggers
- **Performance issues:** Need capacity planning and optimization
- **Downtime incidents:** Need HA/DR planning
- **Security questionnaire from customer:** Need compliance framework

---

## Progressive Enhancement Strategy

You can start with Lite and progressively add Full sections:

### Phase 1: MVP Launch (Lite template)
- Sections 1-6 (simplified)
- 20 core questions
- 8-12 week build timeline

### Phase 2: Product-Market Fit (Lite + partial Full)
- Add Full versions of sections 1-6 for depth
- Add Section 7 (operations) partially
- Introduce basic monitoring and CI/CD

### Phase 3: Scale & Enterprise (Full template)
- Add Section 7 (enterprise operations)
- Add Section 8 (enterprise sales)
- Add Section 9 (governance)
- Pursue SOC 2 and compliance certifications

---

## Solo Founder Specific Recommendations

Since you're a solo founder, here's a pragmatic path:

### Start Here (Week 1)
✓ Use **Lite template** exclusively
✓ Answer 20 questions in one sitting (2-4 hours)
✓ Keep feature list to 3 core features only
✓ Choose familiar tech stack (no learning curve)

### After First 10 Customers (Month 3-6)
✓ Revisit Section 2 from Full template (scalability)
✓ Add basic monitoring (Section 2, Q10)
✓ Consider Section 5 if enterprise interest

### After Product-Market Fit (Month 6-12)
✓ Full review using Full template
✓ Prioritize sections based on customer needs
✓ Hire first team member to enable enterprise features

### Never Skip (Even as Solo Founder)
✓ Terms of Service and Privacy Policy (Section 5)
✓ Data backup strategy (Section 2)
✓ Basic security (authentication, encryption)

### Can Defer Until Later
✗ SOC 2 audit (unless enterprise customers demand it)
✗ Multi-region setup
✗ Advanced monitoring and alerting
✗ Formal change management
✗ Professional services team

---

## Comparison: Sample Outputs

### Lite Version Output Length
- **Executive Summary:** 1/2 page
- **Technical Plan:** 1 page
- **Business Model:** 1/2 page
- **MVP Scope:** 1 page
- **Compliance:** 1/2 page
- **Launch Plan:** 1/2 page
- **Timeline:** 1/2 page
- **TOTAL:** ~5 pages

### Full Version Output Length
- **Executive Summary:** 1 page
- **Technical Architecture:** 3-4 pages
- **Business Model:** 2-3 pages
- **Product Roadmap:** 2-3 pages
- **Compliance Framework:** 2-3 pages
- **Go-to-Market:** 2 pages
- **Enterprise Operations:** 3-4 pages
- **Enterprise Sales:** 2-3 pages
- **Governance:** 2-3 pages
- **Success Factors:** 2 pages
- **Next Steps:** 1-2 pages
- **TOTAL:** ~25-30 pages

---

## Bottom Line

**Solo founder building MVP?** → Use Lite template
**Small team, B2B product?** → Start Lite, transition to Full at $10K MRR
**VC-backed with enterprise focus?** → Use Full template from day 1
**Regulated industry?** → Use Full template + industry variant

The goal is to move fast without being reckless. Lite gets you to launch in weeks; Full gets you to enterprise-ready in months.
