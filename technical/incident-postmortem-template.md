# Incident Postmortem: [Brief Description]

**Date of Incident:** [YYYY-MM-DD HH:MM timezone]
**Duration:** [X hours Y minutes]
**Severity:** [SEV-1 | SEV-2 | SEV-3 | SEV-4]
**Incident Lead:** [Your Name]
**Status:** [Draft | Under Review | Final]

---

## Executive Summary

[2-3 sentence summary of what happened, impact, and root cause]

---

## Impact

### User Impact
- **Users Affected:** [Number or percentage]
- **Services Impacted:** [List services]
- **User-Facing Symptoms:** [What users experienced]

### Business Impact
- **Revenue Impact:** [$X estimated or "None"]
- **SLA Breach:** [Yes/No - which SLA if applicable]
- **Customer Escalations:** [Number of support tickets]

---

## Timeline

All times in [UTC/PST/EST]

| Time | Event |
|------|-------|
| 10:00 | [Initial trigger event] |
| 10:05 | [Monitoring alert fired] |
| 10:10 | [On-call engineer paged] |
| 10:15 | [Investigation started] |
| 10:30 | [Root cause identified] |
| 10:45 | [Fix deployed to production] |
| 11:00 | [Service fully restored] |
| 11:15 | [Monitoring confirmed recovery] |

**Total Duration:** 1 hour 15 minutes

---

## Root Cause

### What Happened?
[Detailed technical explanation of what caused the incident]

### Why Did It Happen?
[Underlying reasons - was it a code bug, config error, infrastructure issue, etc.?]

### Contributing Factors
- Factor 1: [Description]
- Factor 2: [Description]

---

## Detection

### How Was It Detected?
- [ ] Automated monitoring alert
- [ ] User report
- [ ] Internal team member noticed
- [ ] Other: [Description]

**First Alert:** [Time and alert name]

**Time to Detection:** [How long after incident started was it detected?]

---

## Response

### What Went Well
- Action 1: [What worked in our response]
- Action 2: [What helped resolve it quickly]

### What Could Have Gone Better
- Issue 1: [What slowed us down]
- Issue 2: [What we missed]

### Communication
- **Internal:** [How team was notified and coordinated]
- **External:** [Status page updates, customer comms sent]
- **Timeliness:** [Was communication prompt and clear?]

---

## Resolution

### Immediate Fix (What stopped the bleeding)
[What was done to restore service immediately]

### Steps Taken
1. Step 1
2. Step 2
3. Step 3

### Verification
[How we confirmed the fix worked]

---

## Root Cause Analysis (5 Whys)

1. **Why did the incident occur?**
   - [Answer]

2. **Why did [answer 1]?**
   - [Answer]

3. **Why did [answer 2]?**
   - [Answer]

4. **Why did [answer 3]?**
   - [Answer]

5. **Why did [answer 4]?**
   - [Root cause]

---

## Action Items

### Immediate (Do within 24 hours)
- [ ] **Action 1:** [Specific action]
  - Owner: [Name]
  - Due: [Date]
  - Status: [Done | In Progress | Blocked]

### Short-term (Do within 1 week)
- [ ] **Action 2:** [Specific action]
  - Owner: [Name]
  - Due: [Date]
  - Priority: [High | Medium | Low]

- [ ] **Action 3:** [Specific action]
  - Owner: [Name]
  - Due: [Date]
  - Priority: [High | Medium | Low]

### Long-term (Do within 1 month)
- [ ] **Action 4:** [Specific action]
  - Owner: [Name]
  - Due: [Date]
  - Priority: [High | Medium | Low]

---

## Prevention

### How Can We Prevent This?

**Technical Improvements:**
- Improvement 1
- Improvement 2

**Process Improvements:**
- Process change 1
- Process change 2

**Monitoring Improvements:**
- Additional alerts needed
- Dashboard changes

**Documentation Improvements:**
- Runbook updates
- Playbook additions

---

## Lessons Learned

### What We Learned
1. Learning 1
2. Learning 2
3. Learning 3

### Knowledge Gaps Identified
- Gap 1: [What we didn't know that we should have]
- Gap 2: [Missing documentation or training]

---

## Related Incidents

Have we seen similar issues before?

- [Link to related incident 1]
- [Link to related incident 2]

---

## Supporting Data

### Logs
[Links to relevant logs, stack traces, error messages]

### Metrics
[Links to dashboards, graphs showing the incident]

### Screenshots
[Any relevant screenshots]

---

## Follow-up

**Review Date:** [When will we check on action items?]
**Retrospective Scheduled:** [Date of team retro if applicable]
**Status Page Postmortem Published:** [Yes/No and link]

---

## Appendix

### Technical Details
[Additional technical context that doesn't fit above]

### External References
- [Link to documentation]
- [Link to vendor status page]
- [Related reading]

---

## Signoff

Reviewed and approved by:
- [ ] Incident Lead: [Name]
- [ ] Engineering Manager: [Name]
- [ ] On-call Engineer: [Name]

**Final Review Date:** [YYYY-MM-DD]
