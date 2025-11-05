# Test Automation Setup Guide

> **Purpose:** Set up automated testing framework for your project
> **Last Updated:** [Date]
> **Maintained By:** [Team/Person]

---

## Overview

This guide will help you set up a complete test automation stack for your project, covering unit tests, integration tests, and end-to-end tests.

---

## Framework Selection

### Recommended Testing Stack

**For JavaScript/TypeScript Projects:**
- **Unit & Integration Tests:** Vitest or Jest
- **E2E Tests:** Playwright (recommended) or Cypress
- **API Tests:** Supertest
- **Component Tests:** Testing Library (@testing-library/react, @testing-library/vue)
- **Performance Tests:** k6
- **Security Tests:** OWASP ZAP, Snyk

**For Python Projects:**
- **Unit & Integration Tests:** Pytest
- **E2E Tests:** Playwright for Python or Selenium
- **API Tests:** Requests + Pytest
- **Performance Tests:** Locust
- **Security Tests:** Bandit, Safety

**For Other Languages:**
- **Java:** JUnit 5, TestNG, Selenium
- **C#/.NET:** xUnit, NUnit, SpecFlow
- **Go:** testing package, Testify
- **Ruby:** RSpec, Capybara

---

## Quick Start: JavaScript/TypeScript

### 1. Install Testing Framework

```bash
# For Vite/Modern projects (Recommended)
npm install --save-dev vitest @vitest/ui

# For Jest (if using Create React App or older projects)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# For E2E testing with Playwright
npm install --save-dev @playwright/test

# For API testing
npm install --save-dev supertest
```

### 2. Configure Vitest

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
})
```

Create `src/test/setup.ts`:

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

### 3. Configure Playwright

```bash
# Initialize Playwright (interactive setup)
npx playwright install
```

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 4. Update package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

---

## Quick Start: Python

### 1. Install Testing Framework

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install testing dependencies
pip install pytest pytest-cov pytest-asyncio

# For E2E testing
pip install playwright
playwright install

# For API testing
pip install requests pytest-mock
```

### 2. Configure Pytest

Create `pytest.ini`:

```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    -v
    --strict-markers
    --cov=src
    --cov-report=html
    --cov-report=term-missing
```

### 3. Create Test Structure

```
your-project/
├── src/
│   └── your_module/
├── tests/
│   ├── __init__.py
│   ├── unit/
│   │   ├── __init__.py
│   │   └── test_example.py
│   ├── integration/
│   │   ├── __init__.py
│   │   └── test_api.py
│   └── e2e/
│       └── test_user_flow.py
└── pytest.ini
```

---

## Writing Your First Tests

### Unit Test Example (JavaScript/Vitest)

```typescript
// src/utils/math.ts
export function add(a: number, b: number): number {
  return a + b
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }
  return a / b
}
```

```typescript
// src/utils/math.test.ts
import { describe, it, expect } from 'vitest'
import { add, divide } from './math'

describe('Math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should handle negative numbers', () => {
      expect(add(-2, 3)).toBe(1)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
    })
  })

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero')
    })
  })
})
```

### Component Test Example (React + Testing Library)

```typescript
// src/components/Button.tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

```typescript
// src/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} />)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

### Integration Test Example (API Testing)

```typescript
// tests/integration/api.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'
import { setupTestDatabase, teardownTestDatabase } from '../helpers/database'

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDatabase()
  })

  afterAll(async () => {
    await teardownTestDatabase()
  })

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'test@example.com',
          name: 'Test User',
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.email).toBe('test@example.com')
    })

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'Test User',
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })
})
```

### E2E Test Example (Playwright)

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login')

    // Fill in login form
    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')

    // Click login button
    await page.click('button[type="submit"]')

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')

    // Verify welcome message
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Verify error message appears
    await expect(page.locator('.error-message')).toContainText('Invalid credentials')

    // Verify still on login page
    await expect(page).toHaveURL('/login')
  })
})
```

---

## Test Organization Patterns

### Arrange-Act-Assert (AAA) Pattern

```typescript
test('should calculate total price', () => {
  // Arrange - Set up test data
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ]

  // Act - Execute the code being tested
  const total = calculateTotal(items)

  // Assert - Verify the result
  expect(total).toBe(35) // (10*2) + (5*3) = 35
})
```

### Given-When-Then Pattern (BDD Style)

```typescript
test('user checkout flow', () => {
  // Given the user has items in cart
  const cart = [{ id: 1, name: 'Product', price: 50 }]

  // When the user proceeds to checkout
  const order = checkout(cart)

  // Then an order is created with correct total
  expect(order.total).toBe(50)
  expect(order.status).toBe('pending')
})
```

---

## Testing Best Practices

### ✅ DO

**Write Focused Tests:**
```typescript
// Good - tests one thing
test('validates email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
})

test('rejects invalid email format', () => {
  expect(isValidEmail('invalid-email')).toBe(false)
})
```

**Use Descriptive Test Names:**
```typescript
// Good - clear what's being tested
test('should throw error when user is not authenticated')
test('should return 404 when resource does not exist')
test('should disable submit button when form is invalid')
```

**Test Behavior, Not Implementation:**
```typescript
// Good - tests user-facing behavior
test('user can add item to cart', () => {
  render(<ProductPage />)
  fireEvent.click(screen.getByText('Add to Cart'))
  expect(screen.getByText('1 item in cart')).toBeInTheDocument()
})

// Bad - tests internal implementation
test('calls addToCart method', () => {
  const component = new ProductPage()
  component.addToCart()
  expect(component.cartCount).toBe(1)
})
```

**Keep Tests Independent:**
```typescript
// Good - each test is independent
describe('User management', () => {
  beforeEach(() => {
    // Reset state before each test
    database.reset()
  })

  test('can create user', () => {
    const user = createUser({ email: 'test@example.com' })
    expect(user).toBeDefined()
  })

  test('can delete user', () => {
    const user = createUser({ email: 'test@example.com' })
    deleteUser(user.id)
    expect(getUser(user.id)).toBeNull()
  })
})
```

### ❌ DON'T

**Don't Test Framework Code:**
```typescript
// Bad - testing React's useState, not your code
test('useState works', () => {
  const [count, setCount] = useState(0)
  setCount(1)
  expect(count).toBe(1)
})
```

**Don't Write Tests That Depend on Each Other:**
```typescript
// Bad - tests depend on order
let userId: string

test('creates user', () => {
  userId = createUser({ email: 'test@example.com' })
  expect(userId).toBeDefined()
})

test('deletes user', () => {
  // Fails if previous test didn't run
  deleteUser(userId)
})
```

**Don't Test Multiple Things:**
```typescript
// Bad - tests too many things
test('user flow', () => {
  const user = register({ email: 'test@example.com' })
  login(user)
  const post = createPost({ title: 'Test' })
  expect(post).toBeDefined()
  logout()
})
```

---

## Mocking and Test Doubles

### Mocking API Calls (Vitest)

```typescript
import { vi } from 'vitest'

// Mock the entire module
vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))

import { fetchUser } from './api'

test('displays user data', async () => {
  // Setup mock response
  vi.mocked(fetchUser).mockResolvedValue({
    id: '1',
    name: 'Test User',
  })

  // Test component that uses fetchUser
  render(<UserProfile userId="1" />)

  await waitFor(() => {
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})
```

### Spy on Functions

```typescript
test('calls callback on success', () => {
  const onSuccess = vi.fn()

  processData(data, onSuccess)

  expect(onSuccess).toHaveBeenCalledWith(expectedResult)
  expect(onSuccess).toHaveBeenCalledTimes(1)
})
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

### Quality Gates

Add to your CI pipeline:

```yaml
- name: Check test coverage
  run: |
    coverage=$(npm test -- --coverage --json | jq '.coverageMap.total.statements.pct')
    if (( $(echo "$coverage < 80" | bc -l) )); then
      echo "Coverage $coverage% is below 80%"
      exit 1
    fi
```

---

## Test Coverage

### Generate Coverage Report

```bash
# Vitest
npm run test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage Thresholds

Add to `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

---

## Debugging Tests

### Vitest UI (Interactive Debugging)

```bash
npm run test:ui
```

Opens a browser interface where you can:
- Run individual tests
- See test results in real-time
- View code coverage
- Filter and search tests

### Playwright Debug Mode

```bash
# Run in debug mode
npm run test:e2e:debug

# Or specific test
npx playwright test --debug login.spec.ts
```

### VSCode Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["test", "--", "--run"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

## Common Pitfalls and Solutions

### Flaky Tests

**Problem:** Tests pass sometimes, fail others

**Solutions:**
- Avoid timing-dependent tests
- Use proper async/await
- Increase timeouts for slow operations
- Reset state between tests
- Use deterministic data

```typescript
// Bad - timing dependent
test('animation completes', () => {
  startAnimation()
  setTimeout(() => {
    expect(element).toHaveClass('completed')
  }, 1000)
})

// Good - wait for actual condition
test('animation completes', async () => {
  startAnimation()
  await waitFor(() => {
    expect(element).toHaveClass('completed')
  })
})
```

### Slow Tests

**Solutions:**
- Run tests in parallel
- Use test.concurrent
- Mock expensive operations
- Use test databases in memory
- Skip E2E when unit tests suffice

### Test Pollution

**Problem:** Tests affect each other

**Solutions:**
- Use beforeEach/afterEach for cleanup
- Don't share state between tests
- Reset mocks between tests

```typescript
beforeEach(() => {
  vi.clearAllMocks()
  database.reset()
})
```

---

## Next Steps

**Once tests are set up:**

1. **Write tests for critical paths first**
2. **Add tests for new features as you build**
3. **Refactor existing code to be more testable**
4. **Increase coverage gradually**
5. **Monitor test performance**
6. **Fix flaky tests immediately**

**Resources:**
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Kent C. Dodds Testing Articles](https://kentcdodds.com/blog)

---

**Document Version:** 1.0
**Last Updated:** [Date]
