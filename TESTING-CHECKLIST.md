# Testing Checklist

**Project:** saas202521
**Last Updated:** 2025-11-05

---

## 🎯 Purpose

This checklist ensures code quality and system reliability before deployment. Use it for:
- Pre-commit validation
- Pre-deployment smoke tests
- Infrastructure health checks
- Release readiness

---

## ✅ Pre-Commit Checklist

**Run before every commit:**

### Code Quality

- [ ] **Linting passes**
  ```bash
  npm run lint
  # Expected: No errors, warnings acceptable if documented
  ```

- [ ] **Formatting applied**
  ```bash
  npm run format
  # Expected: All files formatted, no changes remaining
  ```

- [ ] **Type checking passes** (TypeScript projects)
  ```bash
  npm run type-check
  # Expected: No type errors
  ```

### Tests

- [ ] **Unit tests pass**
  ```bash
  npm test
  # Expected: All tests passing, >80% coverage
  ```

- [ ] **Integration tests pass** (if applicable)
  ```bash
  npm run test:integration
  # Expected: All integration tests passing
  ```

- [ ] **New code has tests**
  - New features must include unit tests
  - Bug fixes must include regression tests

### Build

- [ ] **Build succeeds**
  ```bash
  npm run build
  # Expected: Clean build with no errors
  ```

- [ ] **No console warnings** in build output
  - Document any acceptable warnings in commit message

### Docker (if changed)

- [ ] **Docker Compose validates**
  ```bash
  docker compose config
  # Expected: Valid YAML, no errors
  ```

- [ ] **Compose v2 check**
  ```bash
  docker compose version
  # Expected: v2.x.x (not v1.x.x)
  ```

---

## 🔥 Smoke Tests

**Run after major changes or before deployment:**

### 1. Fresh Environment Test

```bash
# Clean slate
docker compose down -v
rm -rf node_modules
npm install
docker compose up -d
```

**Checklist:**
- [ ] All containers start successfully
- [ ] No error logs in first 30 seconds
- [ ] Health checks pass

### 2. Service Health

```bash
# Check all services
docker compose ps
```

**Expected output:** All services show "Up" status

```bash
# Check service logs
docker compose logs --tail=50
```

**Checklist:**
- [ ] No `ERROR` or `FATAL` messages
- [ ] Postgres: "database system is ready to accept connections"
- [ ] Redis: "Ready to accept connections"
- [ ] Backend: "Server listening on port 8021"
- [ ] Frontend: "Local: http://localhost:3021"

### 3. Endpoint Tests

```bash
# Backend health
curl http://localhost:8021/health
# Expected: {"status":"ok"} (or similar)

# Frontend loads
curl -I http://localhost:3021
# Expected: HTTP/1.1 200 OK

# API responds
curl http://localhost:8021/api/v1/status
# Expected: Valid JSON response
```

**Checklist:**
- [ ] Backend `/health` returns 200
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly

### 4. Database Connectivity

```bash
# Check Postgres
docker compose exec postgres pg_isready
# Expected: accepting connections

# Test connection
docker compose exec postgres psql -U postgres -c "SELECT version();"
# Expected: PostgreSQL version info

# Check Redis
docker compose exec redis redis-cli ping
# Expected: PONG

# Check MongoDB (if used)
docker compose exec mongo mongosh --eval "db.adminCommand('ping')"
# Expected: { ok: 1 }
```

**Checklist:**
- [ ] PostgreSQL is ready
- [ ] Redis responds to ping
- [ ] MongoDB (if used) is accessible
- [ ] Database migrations applied successfully

### 5. Port Availability

```bash
# Check ports are accessible
netstat -ano | findstr :3021  # Windows
lsof -i :3021                # Mac/Linux
```

**Checklist:**
- [ ] Frontend port 3021 is open
- [ ] Backend port 8021 is open
- [ ] No port conflicts with other projects

---

## 🏗️ Infrastructure Validation

**Before deploying infrastructure changes:**

### Docker Compose Changes

- [ ] **Validate syntax**
  ```bash
  docker compose config
  # Expected: Clean output, no errors
  ```

- [ ] **Check for breaking changes**
  - Review `docker compose config` output
  - Verify volume mounts are correct
  - Confirm environment variables are set

- [ ] **Test locally**
  ```bash
  docker compose down
  docker compose up -d
  docker compose ps
  # Expected: All services start successfully
  ```

### Database Migrations

- [ ] **Migration files valid**
  ```bash
  npm run migrate:validate
  # Expected: All migrations valid
  ```

- [ ] **Test on clean database**
  ```bash
  docker compose down -v postgres
  docker compose up -d postgres
  npm run migrate
  # Expected: All migrations apply cleanly
  ```

- [ ] **Rollback test** (if supported)
  ```bash
  npm run migrate:rollback
  # Expected: Clean rollback
  ```

### Environment Variables

- [ ] **All required vars present**
  ```bash
  npm run env:check
  # Expected: No missing variables
  ```

- [ ] **No secrets in code**
  ```bash
  git diff | grep -i "password\|secret\|api_key"
  # Expected: No secrets found
  ```

- [ ] **`.env.local` not committed**
  ```bash
  git status | grep ".env.local"
  # Expected: Nothing (file should be ignored)
  ```

---

## 🚀 Pre-Deployment Checklist

**Before deploying to staging/production:**

### Code Review

- [ ] Pull request approved by at least one reviewer
- [ ] All CI/CD checks passing
- [ ] No merge conflicts
- [ ] Branch up-to-date with main/master

### Testing

- [ ] All smoke tests pass (see above)
- [ ] Load testing completed (for major releases)
- [ ] Security scan clean
  ```bash
  npm audit
  # Expected: 0 high/critical vulnerabilities
  ```

- [ ] Docker image scan (if applicable)
  ```bash
  docker scan saas202521-backend:latest
  # Expected: No critical vulnerabilities
  ```

### Documentation

- [ ] `CHANGELOG.md` updated with changes
- [ ] Migration guide created (for breaking changes)
- [ ] API documentation updated
- [ ] Environment variable changes documented

### Infrastructure

- [ ] Database backup verified
  ```bash
  # Verify backup exists and is recent
  ```

- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Resource limits verified (CPU, memory)

### Deployment Plan

- [ ] Deployment window scheduled
- [ ] Team notified
- [ ] Rollback strategy confirmed
- [ ] Post-deployment verification plan ready

---

## 🔍 Post-Deployment Validation

**After deploying to staging/production:**

### Immediate Checks (0-5 minutes)

- [ ] **Deployment succeeded**
  - CI/CD pipeline completed successfully
  - No errors in deployment logs

- [ ] **Application started**
  ```bash
  # Check application logs
  # Verify "Server started" or equivalent message
  ```

- [ ] **Health endpoints respond**
  ```bash
  curl https://your-domain.com/health
  # Expected: 200 OK
  ```

- [ ] **Database connection established**
  - Check logs for database connection success
  - No connection errors

### Functional Checks (5-15 minutes)

- [ ] **Critical user flows work**
  - Login/authentication
  - Core features
  - Payment processing (if applicable)

- [ ] **API endpoints functional**
  - Test key API endpoints
  - Verify response times acceptable

- [ ] **Background jobs running**
  - Check job queue
  - Verify scheduled tasks executing

### Monitoring (15+ minutes)

- [ ] **Error rates normal**
  - Check error tracking (Sentry, etc.)
  - No spike in errors

- [ ] **Performance metrics good**
  - Response times within SLA
  - Database query performance acceptable

- [ ] **Resource usage healthy**
  - CPU usage < 70%
  - Memory usage < 80%
  - Disk space sufficient

---

## 🐛 Debugging Failed Tests

### Systematic Approach

1. **Read the error message carefully**
   - What failed?
   - What was expected vs actual?

2. **Check recent changes**
   ```bash
   git log --oneline -10
   git diff HEAD~1
   ```

3. **Isolate the problem**
   - Run single test: `npm test -- testName`
   - Check test in isolation
   - Verify test environment

4. **Check logs**
   ```bash
   docker compose logs --tail=100 [service]
   npm run dev  # Watch for errors
   ```

5. **Common fixes**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Reset database: `docker compose down -v && docker compose up -d`
   - Clear caches: `npm run clean`

---

## 📊 Test Coverage Goals

| Type | Minimum Coverage | Target Coverage |
|------|------------------|-----------------|
| **Unit Tests** | 70% | 85% |
| **Integration Tests** | 50% | 70% |
| **E2E Tests** | Key user flows | All happy paths + error cases |

**Check coverage:**
```bash
npm run test:coverage
# Review coverage/index.html
```

---

## 🔗 Related Resources

- **Development Guide:** `DEVELOPMENT-GUIDE.md` (setup, docker)
- **Style Guide:** `STYLE-GUIDE.md` (code standards)
- **CI/CD:** `.github/workflows/` (automated tests)
- **Monitoring:** `technical/infrastructure/MONITORING.md`

---

## 📝 Creating New Tests

### Unit Test Template

```javascript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' };

      // Act
      const user = await userService.createUser(userData);

      // Assert
      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
    });

    it('should throw error with invalid email', async () => {
      // Arrange
      const userData = { email: 'invalid', name: 'Test User' };

      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Invalid email');
    });
  });
});
```

### Integration Test Template

```javascript
describe('User API Integration', () => {
  beforeAll(async () => {
    // Setup test database
    await setupTestDatabase();
  });

  afterAll(async () => {
    // Cleanup
    await cleanupTestDatabase();
  });

  it('should create user via API', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  });
});
```

---

**Remember:** Tests are documentation. Write clear, readable tests that explain what the code should do.

**Version:** 1.0
**Last Updated:** 2025-11-05
