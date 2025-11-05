# Test Cases: [Feature Name]

> **Feature:** [Feature name]
> **Created:** [Date]
> **Author:** [Name]
> **Last Updated:** [Date]

---

## Test Case Overview

**Total Test Cases:** [Number]
**Priority Breakdown:**
- Critical: [#]
- High: [#]
- Medium: [#]
- Low: [#]

**Test Type Breakdown:**
- Unit Tests: [#]
- Integration Tests: [#]
- End-to-End Tests: [#]

---

## Test Case: TC-001 - [Test Name]

**Priority:** Critical | High | Medium | Low
**Type:** Unit | Integration | End-to-End | Performance | Security
**Estimated Time:** [X minutes]
**Status:** ⬜ Not Started | ⬜ Pass | ⬜ Fail | ⬜ Blocked

### Description
[Brief description of what this test case validates]

### Preconditions
- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]
- [ ] [System state requirement]

### Test Data
| Field | Value | Notes |
|-------|-------|-------|
| [Field name] | [Test value] | [Why this value] |

### Test Steps

1. **Action:** [What to do]
   - **Expected Result:** [What should happen]

2. **Action:** [Next action]
   - **Expected Result:** [Expected outcome]

3. **Action:** [Final action]
   - **Expected Result:** [Expected outcome]

### Expected Results
- [ ] [Overall expected outcome 1]
- [ ] [Overall expected outcome 2]
- [ ] [Data validation point]
- [ ] [UI state verification]

### Actual Results
> Fill during test execution

**Date Executed:** [Date]
**Executed By:** [Name]
**Build/Version:** [Version]

**Results:**
[Describe what actually happened]

### Pass/Fail Criteria
**Pass if:**
- [ ] All expected results match actual results
- [ ] No errors in console/logs
- [ ] Performance within acceptable range

**Fail if:**
- [ ] Any expected result doesn't match
- [ ] Error messages appear
- [ ] System crashes or hangs

### Test Evidence
- Screenshots: [Link or attach]
- Logs: [Link or attach]
- Screen recording: [Link]

### Notes
[Any observations, edge cases discovered, or follow-up needed]

---

## Test Case: TC-002 - [Test Name]

**Priority:** Critical | High | Medium | Low
**Type:** Unit | Integration | End-to-End
**Estimated Time:** [X minutes]
**Status:** ⬜ Not Started | ⬜ Pass | ⬜ Fail | ⬜ Blocked

### Description
[What this test validates]

### Preconditions
- [ ] [Requirement 1]
- [ ] [Requirement 2]

### Test Steps

1. [Action 1]
2. [Action 2]
3. [Action 3]

### Expected Results
- [ ] [Expected outcome 1]
- [ ] [Expected outcome 2]

### Actual Results
[To be filled during execution]

### Notes
[Additional context]

---

## Edge Case Tests

### EC-001 - [Edge Case Name]

**Type:** Edge Case / Boundary Test
**Priority:** High
**Status:** ⬜ Not Started | ⬜ Pass | ⬜ Fail

**Scenario:** [Describe the edge case]

**Test Steps:**
1. [Unusual input or condition]
2. [System behavior to verify]

**Expected Behavior:**
- [How system should handle this edge case]
- [Error message if applicable]
- [Recovery behavior]

**Actual Behavior:**
[Fill during testing]

---

### EC-002 - [Boundary Condition]

**Scenario:** [Test at limits]

**Test Variations:**
| Input | Expected Result |
|-------|-----------------|
| Minimum value | [Expected] |
| Maximum value | [Expected] |
| Below minimum | [Error expected] |
| Above maximum | [Error expected] |
| Null/empty | [Expected handling] |

---

## Error Handling Tests

### ERR-001 - [Error Scenario]

**Test:** [What error condition to test]

**Steps to Trigger Error:**
1. [Action that causes error]
2. [Verify error handling]

**Expected Error Handling:**
- [ ] Appropriate error message shown
- [ ] User guided to resolution
- [ ] System remains stable
- [ ] Data not corrupted
- [ ] Error logged correctly

---

## Integration Test Cases

### INT-001 - [Integration Point]

**Integration:** [Service A] → [Service B]

**Test Scenario:** [What integration to verify]

**Test Steps:**
1. **Trigger:** [Action in Service A]
2. **Verify:** [Expected call to Service B]
3. **Validate:** [Expected data passed]
4. **Confirm:** [Expected response received]

**Success Criteria:**
- [ ] API call made with correct payload
- [ ] Response received within timeout
- [ ] Data format matches contract
- [ ] Error handling works correctly

---

## End-to-End Test Cases

### E2E-001 - [Complete User Workflow]

**User Story:** As a [role], I want to [action] so that [benefit]

**Test Scenario:** [Complete workflow description]

**Full Workflow Steps:**

1. **Setup:** [Initial state]

2. **User Action:** Navigate to [page]
   - Expected: [Page loads correctly]

3. **User Action:** Enter [data] in [field]
   - Expected: [Validation feedback]

4. **User Action:** Click [button]
   - Expected: [Processing indicator]

5. **System Action:** [Backend process]
   - Expected: [Data saved, API called]

6. **User Action:** Navigate to [confirmation page]
   - Expected: [Success message shown]

7. **Verification:** Check [data persistence]
   - Expected: [Data retrievable and correct]

**End-to-End Validation:**
- [ ] Complete workflow successful
- [ ] All intermediate states correct
- [ ] Data persisted correctly
- [ ] User experience smooth
- [ ] No errors at any step

---

## Performance Test Cases

### PERF-001 - [Performance Scenario]

**Test:** [What performance aspect to measure]

**Test Configuration:**
- Load: [Number of concurrent users]
- Duration: [Test duration]
- Ramp-up: [How load increases]

**Performance Targets:**
| Metric | Target | Threshold (Max Acceptable) |
|--------|--------|---------------------------|
| Response time (p50) | [X]ms | [Y]ms |
| Response time (p95) | [X]ms | [Y]ms |
| Response time (p99) | [X]ms | [Y]ms |
| Throughput | [X] req/sec | [Y] req/sec |
| Error rate | <1% | <5% |

**Test Results:**
[Fill after execution]

---

## Security Test Cases

### SEC-001 - [Security Test]

**Security Concern:** [What vulnerability or attack to test]

**Attack Scenario:**
[Describe the attack attempt]

**Test Steps:**
1. [Attempt to exploit]
2. [Verify protection mechanism]
3. [Check for security logging]

**Expected Security Behavior:**
- [ ] Attack blocked/prevented
- [ ] Appropriate error message (not revealing system info)
- [ ] Security event logged
- [ ] User session not compromised
- [ ] Data not exposed

**Security Validation:**
- [ ] Authentication required
- [ ] Authorization enforced
- [ ] Input sanitized
- [ ] Output encoded
- [ ] Audit trail created

---

## Accessibility Test Cases

### A11Y-001 - [Accessibility Requirement]

**WCAG Level:** A | AA | AAA
**Assistive Technology:** Screen Reader | Keyboard Only | Voice Control

**Test Scenario:** [What accessibility feature to verify]

**Test Steps:**
1. [Using assistive technology]
2. [Navigate to feature]
3. [Attempt interaction]

**Accessibility Criteria:**
- [ ] Keyboard navigable
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Alternative text provided
- [ ] Form labels associated
- [ ] Error messages accessible

---

## Cross-Browser Test Cases

### BROWSER-001 - [Feature in Different Browsers]

**Feature:** [Feature to test]

**Browser Matrix:**
| Browser | Version | OS | Status | Notes |
|---------|---------|-----|--------|-------|
| Chrome | Latest | Windows | ⬜ | |
| Firefox | Latest | Windows | ⬜ | |
| Safari | Latest | macOS | ⬜ | |
| Edge | Latest | Windows | ⬜ | |
| Mobile Safari | Latest | iOS | ⬜ | |
| Chrome Mobile | Latest | Android | ⬜ | |

**Test Checklist (per browser):**
- [ ] Layout renders correctly
- [ ] Functionality works
- [ ] No console errors
- [ ] Performance acceptable

---

## Mobile/Responsive Test Cases

### MOBILE-001 - [Mobile Feature Test]

**Device Testing:**
| Device Type | Screen Size | Orientation | Status |
|-------------|-------------|-------------|---------|
| Mobile | 375x667 | Portrait | ⬜ |
| Mobile | 667x375 | Landscape | ⬜ |
| Tablet | 768x1024 | Portrait | ⬜ |
| Tablet | 1024x768 | Landscape | ⬜ |

**Responsive Criteria:**
- [ ] Content readable at all sizes
- [ ] Touch targets min 44x44px
- [ ] No horizontal scrolling
- [ ] Images load appropriately
- [ ] Forms usable on mobile

---

## Regression Test Cases

**Purpose:** Verify existing functionality still works after changes

### REG-001 - [Core Functionality]

**Feature:** [What to verify hasn't broken]

**Quick Smoke Test:**
1. [Essential function 1] ✓ / ✗
2. [Essential function 2] ✓ / ✗
3. [Essential function 3] ✓ / ✗

**Full Regression:**
- [ ] Reference TC-XXX (previous test case)
- [ ] All previous test cases still pass

---

## Test Execution Tracking

### Execution Summary

**Test Run:** [Date]
**Build/Version:** [Version]
**Environment:** [Environment name]
**Tester:** [Name]

| Test Case ID | Status | Execution Time | Notes |
|--------------|--------|----------------|-------|
| TC-001 | ✓ Pass | 3 min | |
| TC-002 | ✗ Fail | 2 min | Bug logged: BUG-123 |
| TC-003 | ⬜ Blocked | - | Waiting on API fix |

### Bugs Found

| Bug ID | Test Case | Severity | Status | Description |
|--------|-----------|----------|--------|-------------|
| BUG-123 | TC-002 | High | Open | [Brief description] |

---

## Test Case Template (Blank)

**Test Case: TC-XXX - [Test Name]**

**Priority:**
**Type:**
**Status:** ⬜

**Description:**

**Preconditions:**
- [ ]

**Test Steps:**
1.

**Expected Results:**
- [ ]

**Actual Results:**

**Notes:**

---

## Notes and Observations

**Testing Notes:**
- [Any patterns observed]
- [Common failure modes]
- [Areas needing more test coverage]

**Improvement Suggestions:**
- [How to improve test cases]
- [Additional scenarios to add]
- [Test automation opportunities]

---

**Document Version:** 1.0
**Last Review Date:** [Date]
**Next Review Due:** [Date]
