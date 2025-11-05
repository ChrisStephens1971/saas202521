# [Feature/Product Name] - PRD

**Author:** [Your Name]
**Date:** [YYYY-MM-DD]
**Status:** [Draft | In Review | Approved | In Progress | Completed]
**Last Updated:** [YYYY-MM-DD]

---

## 1. Executive Summary

Brief 2-3 sentence overview of what this feature/product is and why it matters.

## 2. Problem Statement

### What problem are we solving?

Clear articulation of the user problem or business need.

### Who has this problem?

- **Primary Users:** [Description of main user segment]
- **Secondary Users:** [Description of additional affected users]

### Why is this important now?

Business context, market opportunity, or strategic importance.

## 3. Goals and Success Metrics

### Primary Goals

1. Goal 1
2. Goal 2
3. Goal 3

### Key Metrics

| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| [Metric 1] | [Current value] | [Goal] | [When] |
| [Metric 2] | [Current value] | [Goal] | [When] |
| [Metric 3] | [Current value] | [Goal] | [When] |

## 4. User Stories

**As a** [user type]
**I want** [goal/desire]
**So that** [benefit/value]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## 5. Requirements

### Must Have (P0)
- Requirement 1
- Requirement 2

### Should Have (P1)
- Requirement 1
- Requirement 2

### Nice to Have (P2)
- Requirement 1
- Requirement 2

## 6. User Experience

### User Flow

```
[Describe or diagram the user journey]
Step 1 → Step 2 → Step 3 → Outcome
```

### Key Interactions

1. **Interaction 1:** Description
2. **Interaction 2:** Description

### Mockups/Wireframes

[Link to Figma, screenshots, or sketches]

## 7. Technical Considerations

### Architecture Overview

Brief overview of technical approach (or link to technical spec).

### Dependencies

- Dependency 1: [Description]
- Dependency 2: [Description]

### API/Integration Requirements

- API 1: [Purpose]
- Integration with: [System]

### Data Requirements

- What data needs to be collected/stored?
- Any privacy or compliance considerations?

### Multi-Tenant Considerations

**Note:** Only applicable if multi-tenant is enabled (false)

- **Tenant Isolation:** How is tenant data isolated in this feature?
  - [ ] Database queries include `tenant_id` filtering
  - [ ] Row-Level Security (RLS) policies applied
  - [ ] File storage uses tenant-scoped paths

- **Cross-Tenant Access:** Can data be accessed across tenants?
  - [ ] No cross-tenant access (default)
  - [ ] Admin-only cross-tenant access (specify use case)
  - [ ] User-initiated cross-tenant sharing (e.g., collaboration features)

- **Tenant-Specific Configuration:**
  - [ ] Feature uses global settings (same for all tenants)
  - [ ] Feature has tenant-specific settings (per-tenant customization)
  - [ ] Feature supports tenant-level feature flags

- **Performance Impact:**
  - How does this feature scale per tenant?
  - Any tenant-specific rate limits or quotas?

- **Data Export/Deletion:**
  - [ ] Feature data included in tenant export
  - [ ] Feature data removed on tenant deletion

**See:** `technical/multi-tenant-architecture.md` for implementation patterns

## 8. Launch Plan

### Rollout Strategy

- [ ] Internal testing
- [ ] Beta to select users (X%)
- [ ] Gradual rollout (Y%)
- [ ] Full release

### Success Criteria for Launch

- Criteria 1
- Criteria 2

### Marketing/Communication Plan

How will we announce this? Internal comms? Customer comms?

## 9. Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Risk 1 | High/Med/Low | High/Med/Low | Strategy |
| Risk 2 | High/Med/Low | High/Med/Low | Strategy |

## 10. Timeline and Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approved | [Date] | ⏳ |
| Design Complete | [Date] | ⏳ |
| Development Complete | [Date] | ⏳ |
| Testing Complete | [Date] | ⏳ |
| Launch | [Date] | ⏳ |

## 11. Open Questions

- [ ] Question 1
- [ ] Question 2
- [ ] Question 3

## 12. Appendix

### Research and References

- [Link to user research]
- [Competitive analysis]
- [Market data]

### Related Documents

- [Link to technical spec]
- [Link to design files]
- [Related PRDs]

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial draft |
