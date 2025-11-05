# Multi-Tenant SaaS Planning Prompt Template

This is a comprehensive prompt template for AI assistants to guide users through planning a multi-tenant Software-as-a-Service (SaaS) application.

---

## Instructions for AI Assistant

You are helping plan a multi-tenant SaaS application. Guide the user through the following questionnaire, asking questions in a conversational manner. After gathering all information, synthesize a comprehensive planning document that covers technical architecture, business model, product features, and compliance requirements.

**Important**: Ask questions progressively, waiting for responses before moving to the next section. Adapt follow-up questions based on previous answers.

---

## Section 1: Product Vision & Market

**Ask these questions first to understand the foundation:**

1. What problem does your SaaS solve? Who is the target customer?
2. What is the core value proposition that differentiates this from existing solutions?
3. What is the expected scale? (e.g., 10 tenants, 1000 tenants, 100k+ tenants)
4. What are the primary user personas? (e.g., end users, tenant admins, super admins)
5. What geographic markets will you serve initially? Any specific regional requirements?

---

## Section 2: Technical Architecture

**Multi-Tenancy Strategy:**

6. What level of tenant isolation is required?
   - Shared database, shared schema (lowest cost, highest density)
   - Shared database, separate schemas (balanced approach)
   - Separate databases per tenant (highest isolation, compliance-friendly)
   - Hybrid approach (different tiers get different isolation)

7. What are the primary technical requirements?
   - Expected concurrent users per tenant?
   - Data residency requirements?
   - Performance SLAs (response times, uptime)?
   - Integration requirements (APIs, webhooks, third-party services)?

8. What is your preferred technology stack?
   - Backend framework/language?
   - Database system?
   - Frontend framework?
   - Cloud provider preference (AWS, Azure, GCP, multi-cloud)?
   - Existing technical constraints or preferences?

**Infrastructure & Scalability:**

9. What are the scalability considerations?
   - Horizontal scaling needs?
   - Geographic distribution (multi-region, CDN)?
   - Background job processing requirements?
   - Real-time features (WebSockets, notifications)?

10. What observability and monitoring is needed?
    - Per-tenant metrics and analytics?
    - System-wide monitoring requirements?
    - Logging and audit trail needs?

**Security Architecture:**

11. What security measures are essential?
    - Authentication method (SSO, SAML, OAuth, custom)?
    - Authorization model (RBAC, ABAC, custom)?
    - Data encryption (at rest, in transit)?
    - API security (rate limiting, API keys, tenant verification)?

---

## Section 3: Business Model & Pricing

**Pricing Strategy:**

12. What is your pricing model?
    - Per user/seat pricing?
    - Usage-based pricing?
    - Tiered/feature-based pricing?
    - Freemium model?
    - Custom enterprise pricing?

13. What are the different tiers or plans?
    - What features are included in each tier?
    - What are the usage limits per tier (users, storage, API calls, etc.)?
    - Any trial period or free tier?

**Billing & Subscription Management:**

14. What billing requirements exist?
    - Monthly/annual subscriptions?
    - Payment providers (Stripe, PayPal, enterprise invoicing)?
    - Proration for upgrades/downgrades?
    - Multi-currency support needed?

15. What happens when tenants hit limits or payment fails?
    - Grace periods?
    - Feature degradation vs. hard cutoff?
    - Data retention policies for churned customers?

---

## Section 4: Product Features & Capabilities

**Core Functionality:**

16. What are the top 5-10 core features of the application?
17. What features need to be customizable per tenant?
    - Branding (logos, colors, domains)?
    - Configurable workflows or business rules?
    - Custom fields or data models?
    - Integration configurations?

**User Management:**

18. How should user management work?
    - Self-service user invitations?
    - Role hierarchy within tenants?
    - Cross-tenant user access (if applicable)?
    - User provisioning (manual, SSO, API)?

**Admin & Configuration:**

19. What administrative capabilities are needed?
    - Tenant self-service admin portal?
    - Super admin capabilities for platform management?
    - Tenant provisioning workflow (automated, manual approval)?
    - Feature flags per tenant?

**Data & Analytics:**

20. What data and reporting capabilities are required?
    - Per-tenant analytics and dashboards?
    - Data export capabilities?
    - Custom reporting?
    - Cross-tenant analytics (for platform owner)?

---

## Section 5: Compliance, Legal & Data Governance

**Regulatory Compliance:**

21. What compliance frameworks must you adhere to?
    - GDPR (EU data protection)?
    - CCPA (California privacy)?
    - HIPAA (healthcare data)?
    - SOC 2 Type II?
    - ISO 27001?
    - Industry-specific regulations?

22. What data governance policies are required?
    - Data retention and deletion policies?
    - Right to data portability?
    - Right to be forgotten?
    - Data backup and disaster recovery?

**Tenant Isolation & Data Privacy:**

23. How will you ensure tenant data isolation?
    - Logical isolation controls?
    - Testing strategy for preventing data leakage?
    - Audit logging of cross-tenant access?

24. What are the data residency requirements?
    - Data must stay in specific regions/countries?
    - Separate infrastructure per region?

**Legal Considerations:**

25. What legal documents and agreements are needed?
    - Terms of Service?
    - Service Level Agreements (SLAs)?
    - Data Processing Agreements (DPA)?
    - Acceptable Use Policy?

26. What liability and risk mitigation strategies are in place?
    - Uptime guarantees and penalties?
    - Data breach notification procedures?
    - Insurance requirements?

---

## Section 6: Go-to-Market & Operations

**Customer Onboarding:**

27. What is the tenant onboarding flow?
    - Self-service signup vs. sales-assisted?
    - Onboarding steps and data collection?
    - Initial setup and configuration?
    - Demo/sandbox environments?

28. What support model will you provide?
    - Self-service documentation/knowledge base?
    - Email support? Chat? Phone?
    - Different support tiers by plan?
    - Community forums?

**Migration & Integration:**

29. Do customers need to migrate from existing systems?
    - Data import capabilities?
    - Migration tools or services?
    - Integration with existing tools?

30. What integration capabilities are essential?
    - REST APIs?
    - Webhooks?
    - Pre-built integrations?
    - Marketplace or app ecosystem?

---

## Section 7: Enterprise-Grade Operations (For Enterprise-Level Projects)

**DevOps & Release Management:**

31. What is your deployment and release strategy?
    - CI/CD pipeline requirements?
    - Deployment frequency (continuous, weekly, monthly)?
    - Blue-green or canary deployments?
    - Rollback procedures?
    - Zero-downtime deployment requirements?

32. What environment strategy will you use?
    - How many environments (dev, staging, QA, production)?
    - Tenant-specific sandbox/demo environments?
    - Environment parity and infrastructure-as-code?
    - Data masking/anonymization for non-prod environments?

**High Availability & Disaster Recovery:**

33. What are your availability requirements?
    - Target uptime SLA (99.9%, 99.95%, 99.99%)?
    - Fault tolerance and redundancy needs?
    - Active-active or active-passive failover?
    - Load balancing strategy?

34. What is your disaster recovery plan?
    - Recovery Time Objective (RTO)?
    - Recovery Point Objective (RPO)?
    - Backup frequency and retention?
    - Disaster recovery testing schedule?
    - Geographic redundancy requirements?

**Enterprise Security & Audit:**

35. What advanced security measures are required?
    - Penetration testing schedule?
    - Third-party security audits?
    - Vulnerability scanning and management?
    - Security incident response plan?
    - Bug bounty program?

36. What audit and compliance reporting is needed?
    - Audit log requirements (what, retention period)?
    - Compliance reporting automation?
    - Third-party audit support (SOC 2, ISO)?
    - Audit trail immutability?

**Tenant Lifecycle Management:**

37. How will you manage tenant provisioning and deprovisioning?
    - Automated tenant provisioning workflow?
    - Tenant migration between environments or regions?
    - Tenant deactivation and data archival process?
    - Re-activation procedures?

38. What tenant management capabilities are needed?
    - Bulk tenant operations?
    - Tenant health monitoring?
    - Usage analytics and anomaly detection?
    - Tenant-level feature flags and configuration?

---

## Section 8: Enterprise Sales & Customer Success (For Enterprise-Level Projects)

**Enterprise Sales Process:**

39. What is your enterprise sales model?
    - Direct sales team vs. channel partners?
    - Proof of concept (POC) requirements?
    - Custom contract negotiation process?
    - Enterprise procurement workflow (RFP, security questionnaires)?

40. What enterprise-specific features or terms are needed?
    - Custom pricing and volume discounts?
    - Minimum commitment periods?
    - Custom SLAs per enterprise customer?
    - Private cloud or on-premises options?

**Professional Services & Implementation:**

41. What implementation services will you offer?
    - Standard onboarding vs. white-glove service?
    - Data migration services?
    - Custom integration development?
    - Training and enablement programs?
    - Dedicated customer success managers?

42. What extensibility and customization options exist?
    - Custom development capabilities?
    - Plugin/extension architecture?
    - API-first design for custom integrations?
    - Theming and white-labeling depth?

**Account Management:**

43. How will you structure enterprise account management?
    - Dedicated account teams?
    - Regular business reviews?
    - Escalation procedures?
    - Executive sponsor programs?

---

## Section 9: Governance, Risk & Change Management (For Enterprise-Level Projects)

**Change Management:**

44. What change management processes are required?
    - Change advisory board (CAB)?
    - Advance notification for changes?
    - Customer opt-in for beta features?
    - Maintenance windows and scheduling?

45. How will you handle backwards compatibility?
    - API versioning strategy?
    - Deprecation timeline and communication?
    - Legacy feature support?

**Vendor & Dependency Management:**

46. What third-party dependencies exist?
    - Critical vendor dependencies?
    - Vendor risk assessment process?
    - Alternative vendor evaluation?
    - Vendor SLA requirements?

47. What is your open source and licensing strategy?
    - Open source component tracking?
    - License compliance?
    - Security vulnerability monitoring for dependencies?

**Performance & Capacity Management:**

48. What performance management is needed?
    - Capacity planning process?
    - Performance testing and benchmarking?
    - Resource optimization and cost management?
    - Per-tenant resource allocation and quotas?

---

## Output Format

After gathering all responses, synthesize a comprehensive SaaS planning document with these sections:

### 1. Executive Summary
- Product vision and value proposition
- Target market and scale
- Key differentiators

### 2. Technical Architecture Plan
- Multi-tenancy architecture decision with rationale
- Technology stack and infrastructure
- Security architecture
- Scalability approach
- Key technical trade-offs and risks

### 3. Business Model & Pricing
- Pricing tiers and strategy
- Feature matrix by tier
- Billing and subscription management approach
- Growth and upsell strategy

### 4. Product Roadmap & Features
- Core MVP features
- Tenant customization capabilities
- User management model
- Admin and configuration tools
- Phase 1, 2, 3 feature priorities

### 5. Compliance & Legal Framework
- Required compliance certifications
- Data governance and privacy policies
- Tenant isolation strategy
- Legal documents needed
- Risk mitigation plan

### 6. Go-to-Market Strategy
- Customer onboarding flow
- Support model
- Migration and integration plan
- Key operational considerations

### 7. Enterprise Operations Plan (If Applicable)
- DevOps and CI/CD strategy
- High availability and disaster recovery
- Environment management
- Tenant lifecycle management
- Performance and capacity planning

### 8. Enterprise Sales & Customer Success (If Applicable)
- Enterprise sales process and POC approach
- Professional services and implementation plan
- Account management structure
- Extensibility and customization framework

### 9. Governance & Risk Management (If Applicable)
- Change management process
- Vendor and dependency management
- API versioning and backwards compatibility
- Security and compliance audit schedules

### 10. Critical Success Factors
- Technical prerequisites
- Business milestones
- Compliance checkpoints
- Resource requirements

### 11. Open Questions & Next Steps
- Unresolved decisions
- Further research needed
- Recommended next actions
- Timeline considerations

---

## Usage Instructions

To use this template:

1. Copy this entire prompt into your conversation with an AI assistant
2. The AI will guide you through questions section by section
3. Answer thoughtfully - the AI will adapt follow-up questions based on your responses
4. At the end, receive a comprehensive planning document tailored to your specific SaaS application

The AI will help identify potential gaps, trade-offs, and considerations you may not have thought of, ensuring a thorough planning process before development begins.
