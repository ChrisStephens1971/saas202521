# Technical Specification: [Feature/System Name]

**Author:** [Your Name]
**Date:** [YYYY-MM-DD]
**Status:** [Draft | In Review | Approved | Implemented]
**Related PRD:** [Link to PRD]

---

## Overview

### Problem
What technical problem are we solving?

### Solution Summary
High-level description of the technical approach.

### Goals
- Goal 1
- Goal 2
- Goal 3

### Non-Goals
What is explicitly out of scope for this spec?

---

## Background & Context

### Current State
How does the system work today?

### Constraints
- Technical constraints
- Business constraints
- Timeline constraints

### Assumptions
- Assumption 1
- Assumption 2

---

## Proposed Solution

### Architecture Overview

```
[High-level architecture diagram or description]

┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   API       │─────▶│  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Components

#### Component 1: [Name]
**Purpose:** [What it does]
**Technology:** [Language/framework]
**Interfaces:** [APIs it exposes or consumes]

#### Component 2: [Name]
**Purpose:** [What it does]
**Technology:** [Language/framework]
**Interfaces:** [APIs it exposes or consumes]

---

## Data Model

### New/Modified Tables

#### Table: `table_name`
```sql
CREATE TABLE table_name (
  id UUID PRIMARY KEY,
  field1 VARCHAR(255) NOT NULL,
  field2 TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Indexes:**
- `idx_table_field1` on `field1`

**Relationships:**
- Foreign key to `other_table(id)`

---

## API Design

### Endpoint 1: [Method] /api/path

**Purpose:** [What this endpoint does]

**Request:**
```json
{
  "field1": "value",
  "field2": 123
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "result": "success"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Resource doesn't exist

---

## Implementation Plan

### Phase 1: [Name]
**Goal:** [What we're building]
**Tasks:**
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Estimated Effort:** [X days/weeks]

### Phase 2: [Name]
**Goal:** [What we're building]
**Tasks:**
- [ ] Task 1
- [ ] Task 2

**Estimated Effort:** [X days/weeks]

---

## Testing Strategy

### Unit Tests
- Test case 1: [Description]
- Test case 2: [Description]

### Integration Tests
- Test scenario 1: [Description]
- Test scenario 2: [Description]

### Performance Tests
- Load test: [X concurrent users]
- Response time: [< Y ms for Z percentile]

### Security Considerations
- Authentication: [How handled]
- Authorization: [Who can access what]
- Data validation: [Input sanitization]
- Rate limiting: [Strategy]

---

## Deployment & Operations

### Deployment Strategy
- [ ] Deploy to dev
- [ ] Deploy to staging
- [ ] Gradual rollout to production (10% → 50% → 100%)

### Monitoring & Alerts
**Metrics to track:**
- Metric 1: [What and why]
- Metric 2: [What and why]

**Alerts:**
- Alert if [condition] for [duration]
- Page on-call if [critical condition]

### Rollback Plan
How do we rollback if things go wrong?

---

## Dependencies

### External Dependencies
- Service 1: [What we need from it]
- Library 2: [Version and why]

### Internal Dependencies
- Feature X must be completed first
- Database migration Y must run

---

## Performance & Scale

### Expected Load
- [X requests per second]
- [Y concurrent users]
- [Z GB of data]

### Performance Targets
- API response time: [< N ms at P95]
- Database query time: [< M ms]
- Page load time: [< K seconds]

### Scalability Considerations
How will this scale as we grow?

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Risk 1 | High | Medium | Strategy |
| Risk 2 | Medium | Low | Strategy |

---

## Alternatives Considered

### Alternative 1: [Approach name]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

**Why not chosen:** [Reason]

---

## Open Questions

- [ ] Question 1?
- [ ] Question 2?

---

## References

- [Related ADR]
- [External documentation]
- [Research papers or blog posts]

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial draft |
