# ADR-001: Use PostgreSQL for Primary Database

**Date:** 2025-01-10
**Status:** Accepted
**Deciders:** Solo Founder
**Technical Story:** Database selection for MVP

---

## Context

We need to choose a database for our SaaS application that will store user data, application state, and transactional information. The database needs to:

- Handle relational data with complex queries
- Scale to support thousands of users
- Provide ACID guarantees for financial/important transactions
- Be cost-effective for a bootstrapped startup
- Have good tooling and community support
- Support both structured and semi-structured data

As a solo founder, I also need something I can manage myself without requiring a full-time DBA.

---

## Decision

We will use PostgreSQL as our primary database for the MVP and foreseeable future.

---

## Consequences

### Positive Consequences
- **Proven reliability:** PostgreSQL is battle-tested and trusted by major companies
- **Rich feature set:** JSONB support gives us flexibility for semi-structured data
- **ACID compliance:** Strong consistency guarantees for critical operations
- **Excellent tooling:** pgAdmin, DataGrip, and many ORMs have first-class support
- **Cost-effective:** Open source with good managed options (RDS, Render, Supabase)
- **Community:** Large community means easy to find help and hire contractors
- **Performance:** Fast for most workloads, especially with proper indexing
- **Extensions:** PostGIS, full-text search, and other extensions available

### Negative Consequences
- **Horizontal scaling complexity:** Harder to shard than NoSQL databases
- **Learning curve:** More complex than simple key-value stores
- **Resource usage:** Can be memory-intensive under heavy load

### Neutral Consequences
- Need to learn PostgreSQL-specific features and optimization techniques
- Will need managed hosting or DevOps setup for production

---

## Alternatives Considered

### Alternative 1: MySQL/MariaDB
**Description:** Popular open-source relational database

**Pros:**
- Similar to PostgreSQL in many ways
- Slightly simpler for basic use cases
- Also has managed hosting options

**Cons:**
- Less advanced features (weaker JSON support, fewer data types)
- More fragmentation in ecosystem (MySQL vs MariaDB vs Percona)
- PostgreSQL is generally considered more standards-compliant

**Why rejected:** PostgreSQL's superior JSON support and extensibility are valuable for a SaaS product where requirements will evolve.

---

### Alternative 2: MongoDB (NoSQL)
**Description:** Document-oriented NoSQL database

**Pros:**
- Flexible schema great for rapid prototyping
- Easy horizontal scaling
- Familiar to many developers

**Cons:**
- Lack of transactions and joins makes complex queries harder
- Eventual consistency can cause issues for our use case
- Less confidence in data integrity for critical business data

**Why rejected:** Our data is inherently relational (users, projects, teams, billing). Fighting against that structure would create more problems than it solves.

---

### Alternative 3: SQLite
**Description:** Embedded SQL database

**Pros:**
- Extremely simple to set up
- Zero configuration
- Perfect for development

**Cons:**
- Not suitable for concurrent writes at scale
- No built-in replication
- Would need to migrate later as we grow

**Why rejected:** While great for MVPs, we'd outgrow it quickly and have to migrate. Starting with PostgreSQL avoids that migration pain.

---

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Use The Index, Luke](https://use-the-index-luke.com/) - SQL indexing guide
- [Comparing Postgres and MongoDB](https://www.mongodb.com/compare/mongodb-postgresql)

---

## Notes

**Hosting Decision:** Will start with managed PostgreSQL on Render or Railway for simplicity. Can migrate to AWS RDS if needed for scale.

**Backup Strategy:** Daily automated backups with point-in-time recovery.

**Development:** Will use Docker for local PostgreSQL during development to match production environment.

---

## Superseded By

[None - this decision is still active]
