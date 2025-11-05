# Multi-Tenant Architecture

**Project:** saas202521
**Tenant Model:** single
**Last Updated:** 2025-11-05

---

## Overview

This project uses a **single** multi-tenant architecture model. This document outlines the tenant isolation strategy, implementation patterns, and best practices for maintaining secure tenant boundaries.

---

## Tenant Model: single

### How Tenants Are Identified

**single Model:**

- **workspace-based**: Tenants identified by URL path (e.g., `/workspace-slug/...`)
  - Example: `myapp.com/acme-corp/dashboard`
  - Pros: Simple, no DNS complexity, easy to implement
  - Cons: Shared domain, harder for white-labeling

- **subdomain-based**: Tenants identified by subdomain (e.g., `tenant.myapp.com`)
  - Example: `acme-corp.myapp.com`
  - Pros: Better branding, easier CDN config, cleaner URLs
  - Cons: DNS configuration, subdomain limits

- **custom-domain**: Each tenant has their own domain (e.g., `acme-corp.com`)
  - Example: `acme-corp.com` → served by your app
  - Pros: Best branding, complete white-labeling
  - Cons: Complex SSL/DNS management, higher cost

- **hybrid**: Combination of models (e.g., subdomain by default, custom domain optional)
  - Example: `tenant.myapp.com` OR `tenant.com`
  - Pros: Flexibility for different customer tiers
  - Cons: More complexity to maintain

---

## Database Isolation Strategy

### Recommended Approach: Row-Level Security (RLS)

**All data tables should include a `tenant_id` column:**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure email is unique per tenant
  UNIQUE(tenant_id, email)
);

-- Enable Row-Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see data from their tenant
CREATE POLICY tenant_isolation ON users
  USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### Setting Tenant Context

**Backend middleware should set tenant context:**

```javascript
// Express.js example
app.use(async (req, res, next) => {
  const tenantId = await resolveTenantId(req); // From subdomain, path, or header

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant not found' });
  }

  // Set tenant context in database session
  await db.query('SET LOCAL app.current_tenant_id = $1', [tenantId]);

  req.tenantId = tenantId;
  next();
});
```

### Alternative Approaches

1. **Schema-per-tenant**: Separate PostgreSQL schema for each tenant
   - Pros: Strong isolation, easier backups per tenant
   - Cons: Schema limit (~100-1000), harder migrations

2. **Database-per-tenant**: Completely separate database for each tenant
   - Pros: Maximum isolation, easiest compliance
   - Cons: High overhead, expensive, harder to scale

---

## Tenant Resolution Middleware

### Implementation Checklist

- [ ] Determine tenant from request (subdomain, path, header, custom domain)
- [ ] Validate tenant exists and is active
- [ ] Set tenant context in database session
- [ ] Attach tenant ID to request object
- [ ] Handle tenant not found (404 or redirect)
- [ ] Handle suspended/inactive tenants

### Example: Subdomain Resolution

```javascript
async function resolveTenantId(req) {
  const host = req.get('host'); // e.g., "acme-corp.myapp.com"
  const subdomain = host.split('.')[0];

  if (subdomain === 'www' || subdomain === 'myapp') {
    return null; // Landing page, not tenant-specific
  }

  const tenant = await db.query(
    'SELECT id FROM tenants WHERE subdomain = $1 AND status = $2',
    [subdomain, 'active']
  );

  return tenant?.id;
}
```

---

## API Endpoint Scoping

### All Endpoints Must Be Tenant-Scoped

**❌ WRONG - No tenant filtering:**
```javascript
app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users'); // DANGER: Returns ALL users
  res.json(users);
});
```

**✅ CORRECT - Tenant-scoped:**
```javascript
app.get('/api/users', async (req, res) => {
  const users = await db.query(
    'SELECT * FROM users WHERE tenant_id = $1',
    [req.tenantId]
  );
  res.json(users);
});
```

**✅ BEST - Row-Level Security handles it automatically:**
```javascript
app.get('/api/users', async (req, res) => {
  // RLS policies automatically filter by tenant_id
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});
```

---

## Authentication & Authorization

### Tenant-Scoped Authentication

**Users belong to ONE or MULTIPLE tenants:**

```sql
-- Option 1: User belongs to one tenant
CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  UNIQUE(tenant_id, email)
);

-- Option 2: User can belong to multiple tenants (team switching)
CREATE TABLE user_tenant_memberships (
  user_id UUID REFERENCES users(id),
  tenant_id UUID REFERENCES tenants(id),
  role TEXT NOT NULL, -- admin, member, viewer
  PRIMARY KEY (user_id, tenant_id)
);
```

### JWT Tokens Should Include Tenant

```javascript
const token = jwt.sign({
  userId: user.id,
  tenantId: user.tenantId,
  role: user.role
}, JWT_SECRET);
```

---

## Data Isolation Checklist

Before launching, verify:

- [ ] All database tables have `tenant_id` column (except system tables)
- [ ] Row-Level Security policies are enabled on all tenant data tables
- [ ] All queries filter by `tenant_id` OR rely on RLS
- [ ] Tenant context is set in database session via middleware
- [ ] API endpoints validate tenant access
- [ ] File uploads are stored with tenant prefix (e.g., `s3://bucket/tenant-123/...`)
- [ ] Background jobs process data per tenant (avoid cross-tenant processing)
- [ ] Search indexes are tenant-scoped
- [ ] Cache keys include tenant ID (e.g., `tenant:123:user:456`)

---

## Common Pitfalls & Security Issues

### 1. Forgetting Tenant Filtering

**DANGER:** Queries without tenant filtering leak data across tenants.

```javascript
// ❌ WRONG
const invoice = await db.query('SELECT * FROM invoices WHERE id = $1', [invoiceId]);

// ✅ CORRECT
const invoice = await db.query(
  'SELECT * FROM invoices WHERE id = $1 AND tenant_id = $2',
  [invoiceId, req.tenantId]
);
```

### 2. Admin Routes Without Tenant Checks

**DANGER:** Admin routes that bypass tenant checks.

```javascript
// ❌ WRONG - Admin can see all users across all tenants
app.get('/admin/users', requireAdmin, async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// ✅ CORRECT - Admin sees users only in their tenant
app.get('/admin/users', requireAdmin, async (req, res) => {
  const users = await db.query(
    'SELECT * FROM users WHERE tenant_id = $1',
    [req.tenantId]
  );
  res.json(users);
});
```

### 3. Shared Resources Without Scoping

**File storage, cache, queues must be tenant-scoped:**

```javascript
// ❌ WRONG
await s3.upload({ Key: `avatars/${userId}.jpg`, Body: file });

// ✅ CORRECT
await s3.upload({ Key: `${tenantId}/avatars/${userId}.jpg`, Body: file });
```

---

## Testing Multi-Tenant Isolation

### Test Cases

1. **Cross-tenant data access:** User from Tenant A cannot access Tenant B's data
2. **Tenant switching:** Users with multi-tenant access switch correctly
3. **API tenant validation:** API rejects requests with invalid tenant ID
4. **RLS policies:** Database policies block cross-tenant queries
5. **File isolation:** Files uploaded by one tenant are not accessible to another

### Automated Testing

```javascript
describe('Multi-tenant isolation', () => {
  it('should not allow user to access other tenant data', async () => {
    const tenantA = await createTenant({ name: 'Tenant A' });
    const tenantB = await createTenant({ name: 'Tenant B' });

    const userA = await createUser({ tenantId: tenantA.id, email: 'user@tenantA.com' });
    const userB = await createUser({ tenantId: tenantB.id, email: 'user@tenantB.com' });

    const tokenA = generateToken(userA);

    // Try to access Tenant B's data with Tenant A's token
    const response = await request(app)
      .get(`/api/users/${userB.id}`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(response.status).toBe(404); // Not found (not 403, to avoid leaking existence)
  });
});
```

---

## Tenant Provisioning Workflow

### New Tenant Signup

1. User signs up with email and password
2. Create new tenant record:
   ```sql
   INSERT INTO tenants (id, name, subdomain, status)
   VALUES (gen_random_uuid(), 'Acme Corp', 'acme-corp', 'active');
   ```
3. Create owner user record linked to tenant
4. Create default resources (workspace, settings, etc.)
5. Send welcome email with tenant URL

### Subdomain/Domain Configuration

- **Subdomain**: Automatically available after tenant creation
- **Custom domain**: Requires DNS verification (CNAME record) and SSL provisioning

---

## Performance Considerations

### Indexing

**Always index `tenant_id` for fast filtering:**

```sql
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_invoices_tenant_id ON invoices(tenant_id);
```

### Composite Indexes

```sql
-- For queries like: WHERE tenant_id = X AND status = 'active'
CREATE INDEX idx_users_tenant_status ON users(tenant_id, status);
```

### Partitioning (For Scale)

**If you have millions of rows, consider table partitioning by tenant:**

```sql
CREATE TABLE invoices (
  id UUID,
  tenant_id UUID NOT NULL,
  amount DECIMAL,
  created_at TIMESTAMPTZ
) PARTITION BY LIST (tenant_id);

-- Create partition per tenant (or per group of tenants)
CREATE TABLE invoices_tenant_123 PARTITION OF invoices FOR VALUES IN ('tenant-123-uuid');
```

---

## Monitoring & Observability

### Key Metrics to Track

- **Per-tenant usage**: API calls, storage, compute
- **Tenant growth**: New signups, churn
- **Isolation violations**: Failed cross-tenant access attempts (log these!)
- **Performance per tenant**: Slow queries, high resource usage

### Logging

**Include tenant ID in all logs:**

```javascript
logger.info('User logged in', {
  userId: user.id,
  tenantId: user.tenantId, // ALWAYS include this
  email: user.email
});
```

---

## Compliance & Data Residency

### GDPR / Data Deletion

When a tenant requests deletion:
- [ ] Delete all tenant data (or anonymize)
- [ ] Delete from backups (or exclude from restores)
- [ ] Remove from search indexes
- [ ] Delete files from storage (S3, etc.)
- [ ] Cancel subscriptions/billing

### Data Export

Provide tenant data export in standard formats (JSON, CSV):

```javascript
app.get('/api/admin/export', requireAdmin, async (req, res) => {
  const data = await exportTenantData(req.tenantId);
  res.setHeader('Content-Disposition', 'attachment; filename=tenant-data.json');
  res.json(data);
});
```

---

## Migration Strategy

### From Single-Tenant to Multi-Tenant

1. Add `tenant_id` column to all tables (nullable initially)
2. Create a default tenant for existing data
3. Backfill `tenant_id` for existing rows
4. Make `tenant_id` NOT NULL
5. Add RLS policies
6. Update application code to use tenant context
7. Test isolation thoroughly

---

## Resources & References

- PostgreSQL Row-Level Security: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Multi-tenancy patterns: https://docs.microsoft.com/en-us/azure/architecture/guide/multitenant/overview
- Tenant isolation checklist: [Add your own links]

---

**Last Updated:** 2025-11-05
**Maintained By:** Development Team
