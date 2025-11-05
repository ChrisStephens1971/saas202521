# ADR 004: Use Subdomain-Based Multi-Tenancy

**Date:** 2025-01-20
**Status:** Accepted
**Deciders:** Engineering Team, Product Team
**Tags:** architecture, multi-tenancy, branding, infrastructure

---

## Context

We're building a multi-tenant SaaS application where each business/organization (tenant) needs their own isolated environment. We need to decide how tenants will access the application.

**Requirements:**

1. **Professional branding:** Tenants want their own URL (e.g., `acme-corp.ourapp.com`)
2. **Tenant isolation:** Clear separation between tenants
3. **Simple tenant resolution:** Easy to determine tenant from request
4. **SEO friendly:** Each tenant can be indexed separately
5. **Cost-effective:** Can't afford separate infrastructure per tenant
6. **Developer experience:** Simple to test and develop locally

**User Stories:**

- As a business owner, I want my own branded URL so customers recognize my brand
- As a developer, I need to easily determine which tenant a request is for
- As a customer, I want to bookmark my provider's specific URL
- As a security engineer, I need to ensure tenants can't access each other's data

---

## Decision

We will use **subdomain-based multi-tenancy** where each tenant gets a unique subdomain.

**Architecture:**

```
https://{tenant-slug}.ourapp.com
```

**Examples:**
- `https://acme-corp.ourapp.com` - Acme Corporation
- `https://happy-paws.ourapp.com` - Happy Paws Veterinary
- `https://demo.ourapp.com` - Demo tenant

**Key Implementation Details:**

1. **Tenant Resolution:**
   - Extract tenant slug from subdomain
   - Look up tenant in database
   - Set tenant context for request

2. **DNS Configuration:**
   - Wildcard DNS: `*.ourapp.com → Load Balancer`
   - Each subdomain routes to same application
   - SSL certificate: Wildcard cert for `*.ourapp.com`

3. **Database:**
   - Single database with tenant_id column on all tables
   - Row-Level Security (RLS) for tenant isolation
   - Tenant slug must be unique and validated

4. **Local Development:**
   - Use `/etc/hosts` or `localhost:{port}` with tenant header
   - Support both subdomain and header-based tenant resolution

**Example Middleware (FastAPI):**

```python
from fastapi import Request, HTTPException
from sqlalchemy import text

async def tenant_middleware(request: Request, call_next):
    # Extract tenant slug from subdomain
    host = request.headers.get("host", "").lower()

    # Parse subdomain
    parts = host.split(".")
    if len(parts) < 3:  # localhost or no subdomain
        # Check for X-Tenant-ID header (dev mode)
        tenant_slug = request.headers.get("x-tenant-id")
        if not tenant_slug:
            raise HTTPException(400, "Tenant not specified")
    else:
        tenant_slug = parts[0]

    # Look up tenant
    tenant = await get_tenant_by_slug(tenant_slug)
    if not tenant:
        raise HTTPException(404, f"Tenant '{tenant_slug}' not found")

    # Set tenant context for database RLS
    request.state.tenant = tenant
    await request.state.db.execute(
        text("SET LOCAL app.current_tenant_id = :tenant_id"),
        {"tenant_id": str(tenant.id)}
    )

    # Continue request
    response = await call_next(request)
    return response
```

**Tenant Slug Validation:**

```python
import re

def validate_tenant_slug(slug: str) -> bool:
    # Rules:
    # - 3-63 characters
    # - Lowercase letters, numbers, hyphens only
    # - Must start with letter
    # - Cannot end with hyphen
    pattern = r'^[a-z][a-z0-9-]{1,61}[a-z0-9]$'

    # Reserved slugs
    reserved = ['www', 'api', 'admin', 'app', 'staging', 'dev', 'test', 'demo']

    if not re.match(pattern, slug):
        return False

    if slug in reserved:
        return False

    return True
```

---

## Alternatives Considered

### Path-Based Multi-Tenancy

**Format:** `https://ourapp.com/{tenant-slug}/...`

**Pros:**
- Single domain (simpler SSL)
- No DNS configuration needed
- Easy to test locally

**Cons:**
- ❌ Less professional appearance
- ❌ Harder for customers to remember/bookmark
- ❌ Routing complexity (every route needs tenant prefix)
- ❌ No tenant-specific SEO

**Example:** `https://ourapp.com/acme-corp/appointments`

**Verdict:** ❌ Not chosen - less professional, more complex routing

---

### Separate Databases Per Tenant

**Format:** Each tenant gets own database

**Pros:**
- Maximum data isolation
- Can scale tenants independently
- Easy to backup individual tenants

**Cons:**
- ❌ Very expensive (database per tenant)
- ❌ Complex to manage (thousands of databases)
- ❌ Slow tenant provisioning
- ❌ Harder to run cross-tenant analytics

**Verdict:** ❌ Not chosen - too expensive and complex

---

### Custom Domains

**Format:** `https://acme-corp.com` (tenant's own domain)

**Pros:**
- Best branding (tenant owns domain)
- Ultimate customization

**Cons:**
- ❌ Complex DNS setup (each tenant must configure)
- ❌ SSL certificate management per domain
- ❌ Higher barrier to entry for customers
- ❌ Support burden

**Verdict:** 💡 Consider for enterprise tier, not standard offering

---

### Tenant ID in Header Only

**Format:** Same URL, tenant in `X-Tenant-ID` header

**Pros:**
- Simplest implementation
- No DNS configuration

**Cons:**
- ❌ Not user-friendly (can't bookmark)
- ❌ Requires API client always
- ❌ No branding
- ❌ Not suitable for web application

**Verdict:** ✅ Use for development only

---

## Consequences

### Positive

✅ **Professional Appearance:** Each tenant has branded URL

✅ **Clear Tenant Resolution:** Subdomain = tenant, simple to parse

✅ **SEO Benefits:** Each tenant can be indexed separately

✅ **Bookmarkable:** Customers can save specific URL

✅ **Cost-Effective:** Shared infrastructure, wildcard SSL

✅ **Simple DNS:** One wildcard record (`*.ourapp.com`)

✅ **Easy Development:** Can test locally with headers

✅ **Scalable:** Can handle thousands of tenants

### Negative

❌ **Wildcard SSL Required:** Need wildcard or multi-SAN certificate

❌ **Slug Validation:** Must validate and enforce slug uniqueness

❌ **Local Testing:** Need workaround for subdomain testing (`/etc/hosts` or headers)

❌ **Reserved Slugs:** Must block common slugs (`www`, `api`, etc.)

### Neutral

- **DNS TTL:** Changes require DNS propagation (usually fast)
- **Tenant Migration:** Changing slug requires communication and redirect period

---

## Risks & Mitigations

### Risk: Slug conflicts or inappropriate names

**Mitigation:**
- Validate slugs during tenant creation
- Maintain reserved slugs list
- Moderate tenant names during signup
- Allow slug changes with proper redirects

### Risk: SSL certificate issues

**Mitigation:**
- Use wildcard SSL certificate (`*.ourapp.com`)
- Automate certificate renewal (Let's Encrypt or managed)
- Monitor certificate expiration

### Risk: DNS propagation delays

**Mitigation:**
- Use short TTL for DNS records (5 minutes)
- Provide feedback during tenant setup
- Test DNS before activating tenant

### Risk: Cross-tenant data leaks

**Mitigation:**
- Use Row-Level Security (RLS) in database
- Always set tenant context in middleware
- Test tenant isolation in integration tests
- Monitor for cross-tenant queries

---

## Implementation Plan

**Phase 1: DNS & SSL Setup (Week 1)**
- [ ] Configure wildcard DNS (`*.ourapp.com`)
- [ ] Obtain wildcard SSL certificate
- [ ] Test subdomain resolution

**Phase 2: Application Middleware (Week 1-2)**
- [ ] Implement tenant resolution middleware
- [ ] Add tenant context to all requests
- [ ] Create tenant slug validation
- [ ] Set up database RLS

**Phase 3: Testing (Week 2)**
- [ ] Unit tests for tenant resolution
- [ ] Integration tests for tenant isolation
- [ ] Load test with multiple tenants
- [ ] Test local development workflow

**Phase 4: Production Deployment (Week 3)**
- [ ] Deploy to staging
- [ ] Create test tenants
- [ ] Verify SSL works for subdomains
- [ ] Production deployment

---

## Testing Strategy

**Unit Tests:**

```python
def test_extract_tenant_from_subdomain():
    assert extract_tenant("acme.ourapp.com") == "acme"
    assert extract_tenant("happy-paws.ourapp.com") == "happy-paws"
    assert extract_tenant("ourapp.com") is None

def test_validate_tenant_slug():
    assert validate_tenant_slug("acme-corp") == True
    assert validate_tenant_slug("123abc") == True
    assert validate_tenant_slug("www") == False  # Reserved
    assert validate_tenant_slug("-acme") == False  # Invalid start
    assert validate_tenant_slug("a") == False  # Too short
```

**Integration Tests:**

```python
@pytest.mark.asyncio
async def test_tenant_isolation():
    # Create two tenants
    tenant_a = await create_tenant("tenant-a")
    tenant_b = await create_tenant("tenant-b")

    # Create data for tenant A
    client_a = TestClient(app, base_url="http://tenant-a.ourapp.com")
    response = client_a.post("/api/appointments", json={...})
    appointment_id = response.json()["id"]

    # Try to access from tenant B (should fail)
    client_b = TestClient(app, base_url="http://tenant-b.ourapp.com")
    response = client_b.get(f"/api/appointments/{appointment_id}")
    assert response.status_code == 404
```

---

## Local Development

**Option 1: /etc/hosts (Mac/Linux)**

```bash
# Add to /etc/hosts
127.0.0.1 acme.localhost
127.0.0.1 demo.localhost
```

**Option 2: Use X-Tenant-ID Header**

```bash
# Development mode: use header instead of subdomain
curl http://localhost:8000/api/appointments \
  -H "X-Tenant-ID: acme-corp"
```

**Option 3: Query Parameter (Dev Only)**

```
http://localhost:8000/api/appointments?tenant=acme-corp
```

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Tenant provisioning time | < 5 seconds | TBD |
| DNS propagation time | < 5 minutes | TBD |
| SSL certificate coverage | 100% subdomains | TBD |
| Cross-tenant leak incidents | 0 | 0 |
| Slug validation errors | < 1% | TBD |

---

## References

- **Multi-Tenant Architecture Guide:** `technical/multi-tenant-architecture.md`
- **Database RLS Documentation:** `technical/adr/003-use-postgresql.md`
- **Tenant Management API:** `technical/api-spec/tenants.md`
- **Deployment Guide:** `technical/infrastructure/DEPLOYMENT.md`

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-01-20 | Initial decision | Engineering Team |
| 2025-01-25 | Added local development options | DevEx Team |

---

**This is an example ADR.** Use this format for your own architecture decisions.

**Subdomain multi-tenancy is ideal when:**
- Tenants want professional branding
- You need clear tenant boundaries
- Cost-effectiveness is important
- You have <10,000 tenants (DNS limits)

**Consider alternatives if:**
- Enterprise customers need custom domains (offer as upgrade)
- You expect >100,000 tenants (DNS and routing challenges)
- Regulatory requirements mandate separate databases
