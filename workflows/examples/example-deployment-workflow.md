# Process: Production Deployment

**Owner:** Solo Founder
**Last Updated:** 2025-01-15
**Frequency:** As needed (typically 1-2x per week)
**Est. Time:** 30 minutes
**Status:** Active

---

## Purpose

**Why this process exists:**
To safely deploy code changes to production with minimal risk of downtime or bugs reaching users. This process ensures consistent, repeatable deployments with proper verification and rollback capability.

**Success criteria:**
- Zero-downtime deployment
- All tests passing
- No errors in logs for 30 minutes post-deployment
- Key metrics remain stable

---

## When to Use This Process

**Triggers:**
- Feature development is complete and tested
- Bug fix is ready to ship
- Security patch needs to be applied

**Who uses it:**
- Solo Founder (initially)
- Engineering team members (in the future)

---

## Prerequisites

**Required access/permissions:**
- [ ] SSH access to production servers (or deployment platform access)
- [ ] Access to CI/CD pipeline (GitHub Actions, CircleCI, etc.)
- [ ] Access to monitoring dashboard (Datadog, New Relic, etc.)
- [ ] Access to error tracking (Sentry)

**Required knowledge:**
- How to run migrations
- How to rollback if needed
- What normal metrics look like

**Tools needed:**
- Terminal
- Git
- Deployment platform CLI (if applicable)
- Access to status page (to update if needed)

---

## Process Steps

### Step 1: Pre-Deployment Checks

**What to do:**
Verify that code is ready to deploy and all prerequisites are met.

**How to do it:**
1. Confirm all tests are passing on `main` branch
2. Check staging environment - deployed and working correctly
3. Review the changes being deployed (git log/diff)
4. Check for any active incidents or ongoing issues
5. Verify no one else is deploying at the same time (coordination)
6. Announce deployment in Slack #eng channel (if applicable)

**Expected outcome:**
- CI is green ✅
- Staging looks good ✅
- No conflicts or blockers ✅

**Troubleshooting:**
- If tests failing: Fix tests before deploying
- If staging broken: Debug and fix staging first
- If active incident: Wait until resolved before deploying

---

### Step 2: Database Migrations (if applicable)

**What to do:**
Run database migrations if the deployment includes schema changes.

**How to do it:**
1. Review migration files for correctness
2. Test migrations on staging first
3. Create database backup
4. Run migrations:
   ```bash
   # Connect to production
   ssh production-server

   # Run migrations
   npm run migrate:production
   # or
   python manage.py migrate
   ```
5. Verify migrations completed successfully

**Expected outcome:**
- Migrations run without errors
- Database schema updated
- No data loss

**Troubleshooting:**
- If migration fails: Rollback migration and investigate
- If data issue: Restore from backup if necessary

---

### Step 3: Deploy Application

**What to do:**
Deploy the new code to production.

**How to do it:**

**Option A: Automated via CI/CD**
1. Merge PR to `main` branch
2. CI automatically builds and deploys
3. Watch deployment logs in CI dashboard
4. Wait for deployment to complete (usually 5-10 minutes)

**Option B: Manual deployment**
1. Pull latest code:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Build application:
   ```bash
   npm run build:production
   ```
3. Deploy:
   ```bash
   npm run deploy
   # or platform-specific: railway up, fly deploy, etc.
   ```

**Expected outcome:**
- Deployment completes successfully
- No build errors
- New version is live

**Troubleshooting:**
- If build fails: Check error logs, fix issue, retry
- If deployment hangs: Check server resources, restart if needed

---

### Step 4: Post-Deployment Verification

**What to do:**
Verify that the deployment was successful and the application is working correctly.

**How to do it:**
1. Check application health endpoint:
   ```bash
   curl https://api.yourapp.com/health
   # Should return 200 OK
   ```
2. Run smoke tests (manual or automated):
   - [ ] Homepage loads
   - [ ] User can sign up
   - [ ] User can log in
   - [ ] Core feature X works
   - [ ] API endpoint Y responds correctly
3. Check error tracking (Sentry):
   - Look for new errors in last 5 minutes
   - Verify error rate hasn't spiked
4. Check monitoring dashboards:
   - CPU and memory usage normal
   - Response times normal
   - Error rate normal (<1%)
5. Monitor for 30 minutes

**Expected outcome:**
- All smoke tests pass ✅
- No new errors in Sentry ✅
- Metrics look normal ✅

**Troubleshooting:**
- If errors spiking: Investigate immediately, consider rollback
- If performance degraded: Check server resources, consider rollback
- If feature not working: Investigate logs, may need hotfix or rollback

---

### Step 5: Communication & Cleanup

**What to do:**
Notify team and clean up temporary resources.

**How to do it:**
1. Announce successful deployment:
   - Slack message: "Deployed v1.2.3 to production ✅ - [brief description of changes]"
   - Update status page if customer-facing changes
2. Close related GitHub issues/PRs
3. Update CHANGELOG.md if you maintain one
4. Create git tag for this release:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

**Expected outcome:**
- Team is aware of deployment
- Documentation updated
- Release tagged in git

---

## Verification

**How to verify success:**
- [ ] Application responds to requests
- [ ] Error rate remains <1%
- [ ] Response time P95 <500ms
- [ ] No customer complaints
- [ ] Monitoring shows no anomalies after 30 minutes

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Deployment fails | Build error, test failure | Check logs, fix error, redeploy |
| Service not starting | Config error, missing env var | Check environment variables, verify config |
| High error rate after deploy | New bug introduced | Rollback immediately, investigate |
| Slow response times | Resource exhaustion, inefficient code | Scale resources or rollback |
| Database migration failed | Schema conflict, syntax error | Rollback migration, fix, retry |

---

## Rollback / Undo

**If something goes wrong:**

**Quick rollback:**
1. Redeploy previous version:
   ```bash
   git checkout v1.2.2  # Previous stable version
   npm run deploy
   ```
2. Or use platform rollback:
   ```bash
   railway rollback
   # or
   heroku releases:rollback
   ```
3. Verify application working again
4. Announce rollback to team
5. Investigate issue in staging/locally

**Recovery time:** ~5-10 minutes

**When to rollback:**
- Error rate >5% for more than 5 minutes
- Critical functionality broken
- Data integrity issues
- Performance severely degraded

---

## Metrics & Success Tracking

**Key metrics:**
- Deployment frequency: Target 2-3x per week
- Deployment success rate: Target >95%
- Time to deploy: Target <30 minutes
- Rollback rate: Target <10%

**How to measure:**
Track in spreadsheet or deployment dashboard.

---

## Process Improvement Notes

### What Works Well
- Automated CI/CD reduces human error
- 30-minute monitoring window catches issues early
- Staging environment provides confidence

### Pain Points
- Database migrations can be slow on large tables
- Manual smoke testing is time-consuming
- Sometimes deployments happen outside business hours

### Future Improvements
- [ ] Automate smoke tests
- [ ] Set up blue-green deployments for zero downtime
- [ ] Add automated rollback on error threshold
- [ ] Implement feature flags for safer releases
- [ ] Create deployment dashboard showing history and metrics

---

## Related Processes

- Runbook: Production System - `workflows/operations/production-runbook.md`
- Incident Response - `workflows/operations/incident-response.md`
- Hotfix Process - `workflows/development/hotfix-process.md`

---

## Change Log

| Date | Change | Updated By |
|------|--------|------------|
| 2025-01-15 | Initial version | Solo Founder |

---

## Additional Resources

- CI/CD Pipeline: https://github.com/yourapp/actions
- Monitoring Dashboard: https://app.datadog.com/dashboard/abc
- Deployment Guide (detailed): https://docs.yourapp.com/deployment
