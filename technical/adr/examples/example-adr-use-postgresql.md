# ADR 003: Use PostgreSQL for Primary Database

**Date:** 2025-01-15
**Status:** Accepted
**Deciders:** Engineering Team
**Tags:** database, infrastructure, data-layer

---

## Context

We need to choose a primary database for our SaaS application. The database must:

- Support complex relationships between entities (users, organizations, resources)
- Handle multi-tenant data with strong isolation guarantees
- Provide ACID compliance for financial transactions
- Scale to millions of records per tenant
- Support full-text search and JSON data where needed
- Be cost-effective for our expected workload

**Current Situation:**
- Starting new project, no existing database
- Expected to handle 1000+ tenants within first year
- Complex data model with 20+ tables
- Need for transactional consistency (payment processing)

---

## Decision

We will use **PostgreSQL 15+** as our primary database.

**Key Implementation Details:**

1. **Multi-tenancy:** Use Row-Level Security (RLS) for tenant isolation
2. **Version:** PostgreSQL 15 or later (for improved performance)
3. **Hosting:**
   - Development: Docker Compose
   - Production: Azure Database for PostgreSQL (managed)
4. **ORM:** SQLAlchemy 2.0 (Python) or Prisma (Node.js)
5. **Migrations:** Alembic (Python) or Prisma Migrate (Node.js)

**Example Schema with RLS:**

```sql
-- Enable Row-Level Security
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    customer_id UUID NOT NULL,
    service_id UUID NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy: users can only see their tenant's data
CREATE POLICY tenant_isolation_policy ON appointments
    FOR ALL
    TO PUBLIC
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Grant access
GRANT ALL ON appointments TO app_user;
```

**Setting tenant context:**

```python
# In API middleware
async def set_tenant_context(tenant_id: str):
    await db.execute(
        "SET LOCAL app.current_tenant_id = :tenant_id",
        {"tenant_id": tenant_id}
    )
```

---

## Alternatives Considered

### MongoDB (Document Database)

**Pros:**
- Flexible schema (good for rapid iteration)
- Excellent horizontal scaling
- Native JSON support
- Good for event sourcing

**Cons:**
- Weaker ACID guarantees (before 4.0)
- No native multi-tenant row-level security
- More complex for relational data
- Limited full-text search compared to PostgreSQL
- Higher learning curve for team

**Verdict:** ❌ Not chosen - our data is highly relational

---

### MySQL

**Pros:**
- Mature and widely used
- Good performance for read-heavy workloads
- Similar to PostgreSQL
- Lower memory usage

**Cons:**
- No Row-Level Security (must implement in application layer)
- Weaker JSON support than PostgreSQL
- Less advanced features (e.g., CTEs, window functions)
- More permissive about invalid data

**Verdict:** ❌ Not chosen - lacks RLS and advanced features we need

---

### SQLite

**Pros:**
- Zero configuration
- Perfect for development
- Extremely lightweight
- Embedded (no separate server)

**Cons:**
- Not suitable for production web apps
- No network access
- Limited concurrent writes
- No user management

**Verdict:** ✅ Use for testing only, not production

---

## Consequences

### Positive

✅ **Strong multi-tenancy:** Row-Level Security provides database-level isolation

✅ **ACID compliance:** Guaranteed data consistency for payments and critical operations

✅ **Rich features:**
   - Full-text search (tsvector/tsquery)
   - JSONB for flexible data
   - CTEs and window functions
   - Array types
   - PostGIS for geospatial data (if needed)

✅ **Mature ecosystem:** Extensive tooling, ORMs, and community support

✅ **Performance:** Excellent query optimizer, indexes, and caching

✅ **Cost-effective:** Open source, managed options available (Azure, AWS RDS)

✅ **Familiar:** Team has PostgreSQL experience

### Negative

❌ **Vertical scaling limits:** Harder to scale horizontally than NoSQL databases

❌ **Schema migrations:** Require careful planning in production

❌ **Memory usage:** Higher than MySQL for similar workloads

❌ **Replication complexity:** More complex than managed NoSQL solutions

### Neutral

- **Learning curve:** Moderate for RLS and advanced features
- **Managed service:** Available but adds cost (vs self-hosted)

---

## Risks & Mitigations

### Risk: Performance degradation with RLS

**Mitigation:**
- Benchmark RLS performance early
- Use tenant_id indexes on all tables
- Consider table partitioning for large tenants
- Monitor query performance with `pg_stat_statements`

### Risk: Schema migration failures

**Mitigation:**
- Test migrations on staging with production-like data
- Use transactions for migrations
- Always have rollback scripts ready
- Implement zero-downtime migration strategy

### Risk: Connection pool exhaustion

**Mitigation:**
- Use connection pooling (PgBouncer or built-in)
- Set appropriate pool sizes
- Monitor active connections
- Implement connection timeouts

---

## Implementation Plan

**Phase 1: Development Setup (Week 1)**
- [ ] Docker Compose PostgreSQL 15
- [ ] Create base schema with RLS
- [ ] Integrate SQLAlchemy/Prisma ORM
- [ ] Set up migration system

**Phase 2: Production Setup (Week 2-3)**
- [ ] Provision Azure Database for PostgreSQL
- [ ] Configure connection pooling
- [ ] Set up automated backups
- [ ] Implement monitoring (query performance, connections)

**Phase 3: Optimization (Ongoing)**
- [ ] Add indexes based on query patterns
- [ ] Tune PostgreSQL configuration
- [ ] Implement read replicas if needed
- [ ] Set up performance monitoring dashboards

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Query response time (p95) | < 100ms | TBD |
| Concurrent connections | 500+ | TBD |
| Data size | 100GB+ | 0GB |
| Tenant isolation | 100% | TBD |
| Backup frequency | Daily | TBD |

---

## References

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Row-Level Security:** https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- **Multi-tenant Architecture:** `technical/multi-tenant-architecture.md`
- **Database Schema:** `technical/database-schema.md`
- **ADR Template:** `technical/adr-template.md`

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-01-15 | Initial decision | Engineering Team |
| 2025-02-01 | Added RLS performance notes | Database Team |

---

**This is an example ADR.** Use this format for your own architecture decisions.

**Key Sections to Include:**
1. **Context** - Why are we making this decision?
2. **Decision** - What did we decide?
3. **Alternatives** - What else did we consider?
4. **Consequences** - What are the trade-offs?
5. **Risks & Mitigations** - What could go wrong?
6. **Implementation Plan** - How will we execute?
