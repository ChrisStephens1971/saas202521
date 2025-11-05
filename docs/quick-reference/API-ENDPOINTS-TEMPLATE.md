# API Endpoints - Quick Reference

**Project:** saas202521
**Base URL:** `http://localhost:8021`
**API Version:** v1
**Authentication:** Bearer Token (JWT)

---

## Quick Reference

| Category | Endpoint | Method | Auth | Description |
|----------|----------|--------|------|-------------|
| Health | `/health` | GET | No | Health check |
| Auth | `/api/v1/auth/login` | POST | No | User login |
| Auth | `/api/v1/auth/register` | POST | No | User registration |
| Users | `/api/v1/users/me` | GET | Yes | Get current user |
| Users | `/api/v1/users/:id` | GET | Yes | Get user by ID |

> **Note:** Replace this table with your actual API endpoints

---

## Authentication

### Login

**Endpoint:** `POST /api/v1/auth/login`

**Description:** Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "invalid_credentials",
  "message": "Email or password is incorrect"
}

// 422 Validation Error
{
  "error": "validation_error",
  "details": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

---

### Register

**Endpoint:** `POST /api/v1/auth/register`

**Description:** Create a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "name": "Jane Doe"
}
```

**Success Response (201 Created):**
```json
{
  "id": "usr_124",
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "created_at": "2025-11-02T10:00:00Z"
}
```

**Error Responses:**

```json
// 409 Conflict
{
  "error": "email_exists",
  "message": "An account with this email already exists"
}
```

---

## Users

### Get Current User

**Endpoint:** `GET /api/v1/users/me`

**Description:** Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Success Response (200 OK):**
```json
{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin",
  "created_at": "2025-01-01T10:00:00Z",
  "updated_at": "2025-11-02T10:00:00Z"
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "unauthorized",
  "message": "Valid authentication token required"
}
```

---

### Update User

**Endpoint:** `PATCH /api/v1/users/me`

**Description:** Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "John Smith",
  "phone": "+1-555-0123"
}
```

**Success Response (200 OK):**
```json
{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "John Smith",
  "phone": "+1-555-0123",
  "updated_at": "2025-11-02T10:30:00Z"
}
```

---

## Pagination

All list endpoints support pagination using query parameters:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort field (default: created_at)
- `order` - Sort order: `asc` or `desc` (default: desc)

**Example:**
```
GET /api/v1/resources?page=2&limit=50&sort=name&order=asc
```

**Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 50,
    "total": 150,
    "pages": 3,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

## Filtering

List endpoints support filtering using query parameters:

**Example:**
```
GET /api/v1/users?role=admin&status=active
```

**Available Operators:**
- `field=value` - Exact match
- `field[gt]=value` - Greater than
- `field[gte]=value` - Greater than or equal
- `field[lt]=value` - Less than
- `field[lte]=value` - Less than or equal
- `field[ne]=value` - Not equal
- `field[in]=val1,val2` - In list

---

## Error Responses

All errors follow this format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {},  // Optional additional details
  "request_id": "req_abc123"  // For support/debugging
}
```

**Common Error Codes:**

| Status | Code | Description |
|--------|------|-------------|
| 400 | `bad_request` | Invalid request format |
| 401 | `unauthorized` | Authentication required |
| 403 | `forbidden` | Insufficient permissions |
| 404 | `not_found` | Resource not found |
| 409 | `conflict` | Resource already exists |
| 422 | `validation_error` | Request validation failed |
| 429 | `rate_limit_exceeded` | Too many requests |
| 500 | `internal_error` | Server error |
| 503 | `service_unavailable` | Service temporarily unavailable |

---

## Rate Limiting

**Limits:**
- Authenticated: 1000 requests per hour
- Unauthenticated: 100 requests per hour

**Response Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1730548800
```

**When rate limit exceeded (429):**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Try again in 45 minutes.",
  "retry_after": 2700
}
```

---

## Webhooks

**Webhook Events:**

| Event | Description |
|-------|-------------|
| `user.created` | New user registered |
| `user.updated` | User profile updated |
| `user.deleted` | User account deleted |

**Webhook Payload Format:**
```json
{
  "event": "user.created",
  "timestamp": "2025-11-02T10:00:00Z",
  "data": {
    "id": "usr_124",
    "email": "newuser@example.com"
  }
}
```

**Webhook Signature:**
```
X-Webhook-Signature: sha256=abc123...
```

Verify signature using HMAC-SHA256 with your webhook secret.

---

## Example Workflows

### Complete Authentication Flow

```bash
# 1. Register new user
curl -X POST http://localhost:8021/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePass123",
    "name": "John Doe"
  }'

# 2. Login
curl -X POST http://localhost:8021/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePass123"
  }'

# Response: {"access_token": "eyJ..."}

# 3. Get user profile
curl http://localhost:8021/api/v1/users/me \
  -H "Authorization: Bearer eyJ..."
```

---

## Testing Endpoints

### Using cURL

```bash
# GET request
curl http://localhost:8021/api/v1/endpoint

# POST request with JSON
curl -X POST http://localhost:8021/api/v1/endpoint \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"key": "value"}'

# PATCH request
curl -X PATCH http://localhost:8021/api/v1/endpoint/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"field": "new value"}'

# DELETE request
curl -X DELETE http://localhost:8021/api/v1/endpoint/123 \
  -H "Authorization: Bearer {token}"
```

### Using HTTPie

```bash
# GET request
http GET localhost:8021/api/v1/endpoint

# POST request
http POST localhost:8021/api/v1/endpoint \
  Authorization:"Bearer {token}" \
  key=value

# Pretty print JSON
http --print=hb GET localhost:8021/api/v1/endpoint
```

---

## Environment-Specific URLs

| Environment | Base URL |
|-------------|----------|
| **Local** | `http://localhost:8021` |
| **Development** | `https://dev.example.com/api` |
| **Staging** | `https://staging.example.com/api` |
| **Production** | `https://api.example.com` |

---

## Postman Collection

**Import Collection:**
1. Open Postman
2. Click Import
3. Use file: `postman/saas202521.postman_collection.json`

**Environment Variables:**
- `base_url` - API base URL
- `access_token` - JWT token from login

---

## OpenAPI/Swagger

**Interactive API Documentation:**
- Local: `http://localhost:8021/docs`
- OpenAPI JSON: `http://localhost:8021/openapi.json`

---

## References

- **Development Guide:** `DEVELOPMENT-GUIDE.md`
- **Authentication Guide:** `technical/authentication.md`
- **API Specification:** `technical/api-spec/`
- **Postman Collection:** `postman/`

---

## Template Usage Instructions

1. **Replace this file** with your actual API endpoints
2. **Keep the structure** (categories, request/response format)
3. **Add all endpoints** with complete examples
4. **Include error cases** for each endpoint
5. **Update the Quick Reference table** at the top
6. **Test all examples** to ensure they work

**Tip:** Generate this from your OpenAPI spec or create as you build endpoints.
