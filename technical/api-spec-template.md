# API Specification: [API Name or Group]

**Version:** [v1.0.0]
**Base URL:** `https://api.example.com/v1`
**Last Updated:** [YYYY-MM-DD]
**Owner:** [Your Name]

---

## Overview

Brief description of what this API does and its purpose.

## Authentication

**Type:** [Bearer Token | API Key | OAuth 2.0 | None]

**Headers:**
```
Authorization: Bearer <token>
```

**Getting a Token:**
[Explain how to obtain authentication credentials]

---

## Endpoints

### 1. [Resource Name] - [Action]

#### `[METHOD] /api/resource/{id}`

**Purpose:** [What this endpoint does]

**Authentication:** [Required | Optional | Not Required]

**Rate Limit:** [X requests per minute]

---

#### Request

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Resource identifier |

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 20 | Number of results (max 100) |
| `offset` | integer | No | 0 | Pagination offset |
| `sort` | string | No | created_at | Sort field |
| `order` | string | No | desc | Sort order (asc/desc) |

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "field1": "string",
  "field2": 123,
  "nested": {
    "field3": true
  },
  "array_field": ["item1", "item2"]
}
```

**Field Descriptions:**
| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `field1` | string | Yes | Max 255 chars | Description |
| `field2` | integer | No | Min 1, Max 1000 | Description |
| `nested.field3` | boolean | No | - | Description |

---

#### Response

**Success Response (200 OK):**
```json
{
  "id": "uuid-here",
  "field1": "value",
  "field2": 123,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

**Field Descriptions:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string (UUID) | Unique identifier |
| `field1` | string | Description |
| `created_at` | string (ISO 8601) | Creation timestamp |
| `updated_at` | string (ISO 8601) | Last update timestamp |

---

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "validation_error",
  "message": "Invalid input provided",
  "details": [
    {
      "field": "field1",
      "issue": "Field is required"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "error": "unauthorized",
  "message": "Invalid or missing authentication token"
}
```

**403 Forbidden:**
```json
{
  "error": "forbidden",
  "message": "You don't have permission to access this resource"
}
```

**404 Not Found:**
```json
{
  "error": "not_found",
  "message": "Resource not found"
}
```

**429 Too Many Requests:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Try again in 60 seconds.",
  "retry_after": 60
}
```

**500 Internal Server Error:**
```json
{
  "error": "internal_error",
  "message": "An unexpected error occurred",
  "request_id": "req-uuid-here"
}
```

---

#### Example Request

**cURL:**
```bash
curl -X POST https://api.example.com/v1/resource \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "field1": "example",
    "field2": 42
  }'
```

**JavaScript (fetch):**
```javascript
const response = await fetch('https://api.example.com/v1/resource', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    field1: 'example',
    field2: 42
  })
});

const data = await response.json();
```

**Python (requests):**
```python
import requests

response = requests.post(
    'https://api.example.com/v1/resource',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN'
    },
    json={
        'field1': 'example',
        'field2': 42
    }
)

data = response.json()
```

---

## Data Models

### Model: ResourceModel

```typescript
interface ResourceModel {
  id: string;              // UUID
  field1: string;          // Max 255 characters
  field2: number;          // Integer, 1-1000
  nested: {
    field3: boolean;
  };
  created_at: string;      // ISO 8601 timestamp
  updated_at: string;      // ISO 8601 timestamp
}
```

---

## Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, PATCH, DELETE |
| 201 | Created | Successful POST that creates a resource |
| 204 | No Content | Successful DELETE with no response body |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists or conflict |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Temporary downtime |

---

## Pagination

List endpoints support cursor-based pagination:

**Request:**
```
GET /api/resources?limit=20&offset=40
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 40,
    "has_more": true
  }
}
```

---

## Rate Limiting

- **Default:** 100 requests per minute per API key
- **Burst:** Up to 200 requests
- **Headers returned:**
  - `X-RateLimit-Limit`: Requests allowed per window
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Webhooks

[If applicable, describe webhook functionality]

---

## Versioning

API versioning is done via the URL path: `/v1/`, `/v2/`, etc.

**Deprecation Policy:**
- 6 months notice before deprecating an API version
- Old versions continue to work until sunset date

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-15 | v1.0.0 | Initial API release |

---

## Support

**Issues:** [GitHub Issues link or support email]
**Documentation:** [Link to additional docs]
