# Quick Reference: Industry-Specific SaaS Planning

Quick guide to Healthcare, Fintech, and EdTech considerations. For full details, see individual addendums.

---

## When to Use Industry Addendums

Use **IN ADDITION TO** main planning template (Lite or Full) if you're building in:

- **Healthcare:** PHI, patient data, clinical workflows
- **Fintech:** Payments, money movement, financial data
- **EdTech:** Student data, K-12 schools, online learning

**All three have unique:**
- Regulations and compliance
- Security requirements
- Business models
- Technical considerations
- Go-to-market challenges

---

## Healthcare SaaS Quick Reference

**Full guide:** [industry-variant-healthcare.md](industry-variant-healthcare.md)

### When You Need This
- ✅ Handling PHI (Protected Health Information)
- ✅ Serving healthcare providers or patients
- ✅ Clinical decision support
- ✅ Health insurance or billing data
- ✅ Telehealth or wellness with medical data

### Key Compliance Requirements
| Requirement | What It Is | Timeline |
|-------------|------------|----------|
| **HIPAA** | Federal privacy law for health data | Day 1 |
| **HITRUST** | Industry certification | 12-18 months |
| **BAAs** | Business Associate Agreements with vendors | Before launch |
| **SOC 2** | Security compliance | 9-12 months |

### Critical Questions
1. **Are you a covered entity or business associate?**
   - Covered entity: You provide healthcare services
   - Business associate: You serve healthcare providers

2. **What PHI will you handle?**
   - Names, DOB, SSN, medical records, diagnoses, etc.
   - Requires encryption, access controls, audit logging

3. **What safeguards are required?**
   - Technical: Encryption, access controls, audit logs
   - Administrative: Policies, training, risk assessments
   - Physical: Data center security

### Key Technical Requirements
- ✅ Encryption at rest (AES-256)
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Audit logging (all PHI access)
- ✅ Role-based access control
- ✅ Break-glass emergency access
- ✅ Automatic session timeout

### Budget Considerations
- HITRUST certification: $50K-$150K
- Healthcare attorney: $10K-$50K annually
- Increased infrastructure costs: +30-50%
- Longer sales cycles: 6-12 months

### Solo Founder Advice
**Start with non-PHI if possible:**
- Wellness without medical data
- Administrative tools (scheduling, billing)
- Analytics on de-identified data

**If PHI required:**
- Budget 2x normal timeline
- Hire healthcare compliance consultant
- Partner with established healthcare entities
- Consider BAA-ready infrastructure (AWS HIPAA-eligible)

### Red Flags
- ❌ Don't touch PHI without proper safeguards
- ❌ Don't skip BAAs with vendors
- ❌ Don't underestimate complexity
- ❌ Don't claim HIPAA compliance without validation

---

## Fintech SaaS Quick Reference

**Full guide:** [industry-variant-fintech.md](industry-variant-fintech.md)

### When You Need This
- ✅ Payment processing or money movement
- ✅ Banking or lending services
- ✅ Investment or trading platforms
- ✅ Financial data aggregation
- ✅ Cryptocurrency or digital assets

### Key Regulatory Landscape
| License/Regulation | What It Is | Cost/Timeline |
|-------------------|------------|---------------|
| **MTL** (Money Transmitter) | State-by-state licensing | $50K-$500K/state, 6-24 months |
| **MSB** | Federal registration (FinCEN) | $5K, 2-4 weeks |
| **AML/KYC** | Anti-money laundering compliance | Ongoing, $10K-$100K/year |
| **SOC 2** | Security certification | $15K-$40K, 9-12 months |
| **PCI DSS** | Card data security (if cards) | $20K-$50K annually |

### Critical Questions
1. **What financial services will you provide?**
   - Payments only (simplest)
   - Lending (need lending licenses)
   - Banking (need bank charter or partner)
   - Investment advice (SEC registration)

2. **Will you get licenses or partner?**
   - **Get licenses:** 18-36 months, $500K-$2M+
   - **Partner:** Faster, but revenue share (20-50%)
   - **Recommended for solo:** Partner, don't get licenses

3. **What's your approach to compliance?**
   - AML/KYC program required
   - OFAC sanctions screening
   - Fraud monitoring
   - SAR filing procedures

### Recommended Partnerships
Instead of licensing, partner with:
- **Stripe:** Payments and payouts
- **Plaid:** Bank connections and identity verification
- **Unit/Synapse:** Banking-as-a-Service
- **Dwolla:** ACH processing
- **Marqeta/Lithic:** Card issuing

### Key Technical Requirements
- ✅ KYC/identity verification at signup
- ✅ OFAC screening (customers and transactions)
- ✅ Double-entry ledger system
- ✅ Idempotent transaction processing
- ✅ Real-time fraud detection
- ✅ Comprehensive audit logging

### Budget Considerations
- Attorney (fintech-specialized): $20K-$100K/year
- Compliance consultant: $10K-$50K/year
- KYC/fraud tools: $1-$5 per verification
- Partner revenue share: 20-50% of transaction revenue
- Reserve capital requirements: Varies by state

### Solo Founder Advice
**Don't get licenses solo. Instead:**

**Best Path:** Build on Stripe/Plaid
- Stripe handles compliance
- You focus on application layer
- Faster to market (3-6 months)
- Lower risk

**Alternative:** Partner with BaaS provider
- Unit, Synapse, or Treasury Prime
- They hold licenses
- You build software layer
- Revenue share but faster launch

**Avoid:**
- ❌ Obtaining MTLs yourself
- ❌ Direct money movement without processor
- ❌ Holding customer funds without bank partner
- ❌ Lending without license or partner

### Red Flags
- ❌ Moving money without proper licensing
- ❌ No AML/KYC program
- ❌ Ignoring sanctions screening
- ❌ Underestimating regulatory costs

---

## EdTech SaaS Quick Reference

**Full guide:** [industry-variant-education.md](industry-variant-education.md)

### When You Need This
- ✅ K-12 schools or districts
- ✅ Higher education institutions
- ✅ Student information or educational records
- ✅ Online course platforms or LMS
- ✅ Assessment or grading tools

### Key Compliance Requirements
| Regulation | Applies To | What It Requires |
|------------|------------|------------------|
| **FERPA** | Educational records | Protect student privacy, limit sharing |
| **COPPA** | Users under 13 | Parental consent for data collection |
| **WCAG 2.1** | All educational software | Accessibility (Level AA) |
| **PPRA** | Surveys/assessments | Parental consent for sensitive topics |
| **State Laws** | Varies | Additional student privacy protections |

### Critical Questions
1. **What student data will you collect?**
   - PII: Names, emails, grades, behavior
   - Educational records: Protected by FERPA
   - Biometric data: Requires special handling
   - Demographics: May have restrictions

2. **Who is your customer vs. user?**
   - **B2B (schools):** You're a "school official"
   - **B2C (parents/students):** Different consent requirements
   - **Users <13:** COPPA parental consent required

3. **What accessibility level do you need?**
   - **WCAG 2.1 Level AA:** Required for schools
   - **Section 508:** Federal procurement requirement
   - **VPAT:** Document accessibility features

### Key Technical Requirements
- ✅ Student data encryption
- ✅ Parent data access and control features
- ✅ Data export capability (portability)
- ✅ Account deletion (right to be forgotten)
- ✅ Screen reader compatibility
- ✅ Keyboard navigation
- ✅ Captions for all video/audio
- ✅ Content moderation (if UGC)

### Essential Integrations
- **SSO:** Clever, ClassLink (EdTech-specific)
- **LMS:** Canvas, Google Classroom, Microsoft Teams
- **SIS:** PowerSchool, Skyward, Infinite Campus
- **Rostering:** OneRoster standard
- **Standards:** LTI for grade passback

### Budget Considerations
- Accessibility audit: $5K-$15K
- Privacy compliance review: $5K-$15K
- Longer sales cycles: 6-12 months (districts)
- Lower willingness to pay: $5-20/student/year typical
- Instructional design consulting: $10K-$30K

### Solo Founder Advice
**Start direct-to-consumer or direct-to-teacher:**
- Avoid district sales initially (too slow)
- Build for teachers (freemium model)
- Free tier drives viral adoption
- Monetize via schools once you have users

**Keep MVP Simple:**
- 3-5 core learning features
- Basic privacy compliance
- Accessibility basics (but don't skip)
- Mobile-responsive (not native apps yet)

**Priority Order:**
1. Core learning functionality
2. Privacy compliance (FERPA/COPPA)
3. Basic accessibility
4. Teacher tools
5. School integrations (post-MVP)
6. Advanced features

### Red Flags
- ❌ Collecting student data without FERPA compliance
- ❌ No accessibility (lawsuit risk)
- ❌ Ignoring COPPA for under-13 users
- ❌ Selling student data (forbidden)
- ❌ No parent transparency or control

---

## Side-by-Side Comparison

| Aspect | Healthcare | Fintech | EdTech |
|--------|------------|---------|--------|
| **Primary Regulation** | HIPAA | AML/KYC, Licensing | FERPA, COPPA |
| **Certification** | HITRUST ($100K+) | SOC 2, PCI DSS | Student Privacy Pledge (free) |
| **Solo Founder Difficulty** | Very Hard | Very Hard | Medium |
| **Recommended Approach** | Partner with healthcare entities | Partner with licensed processors | Direct-to-teacher initially |
| **Sales Cycle** | 6-12 months | 3-6 months (B2B) | 6-18 months (districts) |
| **Willingness to Pay** | High | High | Low-Medium |
| **Technical Complexity** | High (PHI protection) | Very High (money movement) | Medium (accessibility) |
| **Timeline to Launch** | 12-18 months | 12-18 months | 6-12 months |
| **Budget Needed** | $100K+ | $100K+ | $20K-$50K |

---

## General Industry Best Practices

### For All Regulated Industries:

**1. Don't Skip Compliance**
- Build it in from day 1
- Can't retrofit easily
- Legal fees cheaper than fines

**2. Find Domain Experts**
- Advisors who've done it before
- Compliance consultants
- Industry-specific attorneys

**3. Budget More Time**
- 2-3x normal development timeline
- Factor in certification processes
- Account for slower sales

**4. Budget More Money**
- Compliance: +$50K-$150K
- Legal: +$20K-$100K/year
- Infrastructure: +30-50% costs

**5. Consider Partnerships**
- Partner with licensed/certified entities
- Leverage existing infrastructure
- Focus on software layer

**6. Start Narrow**
- Single use case
- One specialty or vertical
- Expand after validation

### When to Pivot Away

Consider pivoting if:
- Compliance costs exceed budget
- Timeline doesn't align with runway
- Lack of domain expertise
- Partnership economics don't work
- Risk tolerance too low

**Alternative paths:**
- Build tools FOR regulated industries (B2B)
- Start with non-regulated use case
- Join established company to learn, then start own

---

## Quick Decision Tree

**Are you building in healthcare, fintech, or education?**

**Yes → Do you have:**
- [ ] Domain expertise or advisors?
- [ ] 18-24 month runway?
- [ ] $100K+ budget?
- [ ] High risk tolerance?
- [ ] Compliance-first mindset?

**If YES to all:** Proceed with industry addendum
**If NO to any:** Consider alternative approach or pivoting

---

## Resources

### Healthcare
- HHS HIPAA: hhs.gov/hipaa
- HITRUST Alliance: hitrustalliance.net
- FDA Digital Health: fda.gov/medical-devices/digital-health

### Fintech
- FinCEN: fincen.gov
- CFPB: consumerfinance.gov
- NMLS: mortgage.nationwidelicensingsystem.org

### EdTech
- FERPA: ed.gov/ferpa
- COPPA: ftc.gov/coppa
- WCAG: w3.org/wai/wcag21
- Student Privacy Pledge: studentprivacypledge.org

---

## Final Advice

**All three industries share:**
- Complex regulations
- Long sales cycles
- High compliance costs
- Need for patient capital
- Meaningful social impact

**Success factors:**
- Domain expertise critical
- Compliance from day 1
- Partnership strategy
- Patient capital
- Long-term commitment

**For solo founders:**
- Healthcare: Very challenging, partner-first approach
- Fintech: Very challenging, leverage existing infrastructure
- EdTech: Possible, start direct-to-consumer

---

**Full Addendums:**
- [Healthcare](industry-variant-healthcare.md) (~800 lines)
- [Fintech](industry-variant-fintech.md) (~900 lines)
- [EdTech](industry-variant-education.md) (~800 lines)

**Use This Quick Reference When:**
- Deciding if industry addendum applies to you
- Getting overview of requirements
- Comparing industries
- Making go/no-go decision

**Use Full Addendums When:**
- Actually building in that industry
- Need comprehensive checklist
- Preparing for compliance
- Detailed technical requirements
