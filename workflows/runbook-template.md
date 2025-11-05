# Runbook: [System/Service Name]

**System:** [Name of system or service]
**Owner:** [Your Name / Team]
**On-Call:** [Contact info or rotation]
**Last Updated:** [YYYY-MM-DD]
**Severity:** [How critical is this system: P0 | P1 | P2]

---

## System Overview

**Purpose:**
[What this system does and why it's important]

**Dependencies:**
- [Upstream system 1]
- [Downstream system 2]
- [External service 3]

**Architecture:**
[Brief description or link to architecture diagram]

---

## Key Information

### Access & Credentials
- **Production URL:** [URL]
- **Staging URL:** [URL]
- **Admin Panel:** [URL]
- **Credentials location:** [Where to find them - e.g., 1Password, AWS Secrets Manager]
- **SSH Access:** [How to access servers if applicable]

### Monitoring & Dashboards
- **Primary Dashboard:** [Link]
- **Logs:** [Where to find logs - e.g., CloudWatch, Datadog]
- **Alerts:** [Where alerts go - e.g., PagerDuty, Slack]
- **Status Page:** [Public status page if applicable]

### Key Contacts
- **Owner:** [Name, contact]
- **Backup:** [Name, contact]
- **Vendor Support:** [Contact info if using external service]

---

## Common Operations

### Starting the Service

```bash
# Commands to start
```

**Verification:**
- [ ] Check [endpoint] returns 200
- [ ] Confirm [metric] is normal

---

### Stopping the Service

```bash
# Commands to stop
```

**When to stop:**
- [Reason 1]
- [Reason 2]

**Impact:**
[What happens when service is stopped]

---

### Restarting the Service

```bash
# Commands to restart
```

**When to restart:**
- [Symptom 1]
- [Symptom 2]

**Expected downtime:** [X seconds/minutes]

---

### Scaling Operations

**Scale Up:**
```bash
# Commands to increase capacity
```

**Scale Down:**
```bash
# Commands to decrease capacity
```

**Current capacity:** [Normal operating parameters]

---

## Troubleshooting Guide

### Issue 1: [Common Problem]

**Symptoms:**
- [Symptom 1]
- [Symptom 2]

**Diagnosis:**
1. Check [metric/log]
2. Verify [condition]
3. Look for [error pattern]

**Resolution:**
```bash
# Commands to fix
```

**Prevention:**
[How to avoid this in the future]

---

### Issue 2: [Common Problem]

**Symptoms:**
- [Symptom 1]

**Diagnosis:**
1. Check [thing]

**Resolution:**
```bash
# Fix commands
```

---

### Issue 3: Service Not Responding

**Symptoms:**
- No response from endpoints
- Health check failing

**Diagnosis:**
```bash
# Check if process is running
ps aux | grep [process-name]

# Check logs
tail -f /path/to/logs

# Check port is listening
netstat -tuln | grep [port]
```

**Resolution:**
1. Restart service (see above)
2. If restart fails, check logs for root cause
3. Escalate if issue persists after 2 restart attempts

---

## Incident Response

### Severity Definitions

**SEV-1 (Critical):**
- Service completely down
- Data loss occurring
- Security breach

**SEV-2 (High):**
- Degraded performance affecting users
- Partial outage

**SEV-3 (Medium):**
- Minor issues, workaround available

---

### Response Procedure

#### For SEV-1 Incidents

1. **Immediate Actions:**
   - [ ] Check status dashboard
   - [ ] Verify incident is real (not monitoring false alarm)
   - [ ] Update status page if public-facing
   - [ ] Start incident channel/room

2. **Diagnosis:**
   - [ ] Check recent changes (deployments, config changes)
   - [ ] Review logs for errors
   - [ ] Check dependent services

3. **Mitigation:**
   - [ ] Try quick fixes (restart, scale, rollback)
   - [ ] Implement workaround if available

4. **Communication:**
   - [ ] Notify stakeholders every 30 minutes
   - [ ] Update status page
   - [ ] Log all actions taken

5. **Resolution:**
   - [ ] Verify service restored
   - [ ] Monitor for 30 minutes
   - [ ] Update status to resolved
   - [ ] Schedule postmortem within 48 hours

---

## Deployment Procedures

### Standard Deployment

**Pre-deployment checklist:**
- [ ] Code reviewed and approved
- [ ] Tests passing
- [ ] Staging deployment successful
- [ ] Backup taken
- [ ] Rollback plan ready

**Deployment steps:**
```bash
# Deployment commands
```

**Post-deployment verification:**
- [ ] Health checks passing
- [ ] Key metrics normal
- [ ] Smoke tests pass
- [ ] Monitor for 15 minutes

---

### Rollback Procedure

**When to rollback:**
- [Condition 1]
- [Condition 2]

**How to rollback:**
```bash
# Rollback commands
```

**Verification:**
- [ ] Service back to previous version
- [ ] Functionality restored

---

## Maintenance Procedures

### Routine Maintenance

**Frequency:** [Weekly | Monthly]

**Tasks:**
- [ ] Check disk space
- [ ] Review logs for errors
- [ ] Update dependencies
- [ ] Verify backups

---

### Backup & Recovery

**Backup schedule:** [Frequency]
**Backup location:** [Where backups are stored]
**Retention:** [How long kept]

**To restore from backup:**
```bash
# Restore commands
```

**Recovery time objective (RTO):** [X hours]
**Recovery point objective (RPO):** [Y hours]

---

## Performance Baselines

### Normal Operating Parameters

| Metric | Normal Range | Warning Threshold | Critical Threshold |
|--------|--------------|-------------------|-------------------|
| CPU Usage | 20-40% | >70% | >90% |
| Memory Usage | 30-50% | >80% | >95% |
| Response Time | 100-200ms | >500ms | >1000ms |
| Error Rate | <0.1% | >1% | >5% |
| Requests/sec | 100-500 | >1000 | >2000 |

---

## Useful Commands

```bash
# Check service status
systemctl status [service-name]

# View logs
tail -f /var/log/[service]/error.log

# Check resource usage
top
df -h
free -m

# Network diagnostics
curl -v [endpoint]
netstat -tuln
```

---

## Recent Incidents

| Date | Severity | Issue | Resolution | Link |
|------|----------|-------|------------|------|
| [Date] | [SEV-X] | [Brief description] | [How fixed] | [Postmortem] |

---

## Change Log

| Date | Change | Updated By |
|------|--------|------------|
| [YYYY-MM-DD] | Initial runbook | [Name] |
| [YYYY-MM-DD] | Added troubleshooting for [issue] | [Name] |

---

## Additional Resources

- Architecture diagram: [link]
- API documentation: [link]
- Monitoring dashboard: [link]
- Incident response plan: [link]
