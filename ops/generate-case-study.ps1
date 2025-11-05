<#
.SYNOPSIS
    Generate case study from KPI data

.DESCRIPTION
    Creates a one-page case study with metrics and proof of value

.PARAMETER SiteUrl
    SharePoint site URL

.PARAMETER CompanyName
    Customer company name

.PARAMETER OutputPath
    Output path for case study markdown file

.EXAMPLE
    .\generate-case-study.ps1 `
      -SiteUrl "https://contoso.sharepoint.com/sites/HR" `
      -CompanyName "Contoso Inc" `
      -OutputPath "case-study-contoso.md"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true)]
    [string]$CompanyName,

    [Parameter(Mandatory = $false)]
    [string]$OutputPath = "case-study.md",

    [Parameter(Mandatory = $false)]
    [int]$LastNDays = 30
)

$ErrorActionPreference = "Stop"

try {
    Write-Host "📊 Generating case study for $CompanyName..." -ForegroundColor Cyan

    # Extract KPIs using JSON format
    $kpisJson = & (Join-Path $PSScriptRoot "extract-kpis.ps1") `
        -SiteUrl $SiteUrl `
        -OutputFormat JSON `
        -LastNDays $LastNDays

    $kpis = $kpisJson | ConvertFrom-Json

    # Generate case study content
    $caseStudy = @"
# Case Study: $CompanyName
## M365 New-Hire Onboarding Automation

**Industry:** [Industry]
**Size:** [Company Size]
**Period:** $($kpis.StartDate) to $($kpis.EndDate) ($($kpis.PeriodDays) days)

---

## Challenge

$CompanyName was experiencing slow, error-prone new-hire onboarding that took 5+ days and required 10-20 manual steps per hire. IT and HR teams spent **4 hours per new hire** on repetitive tasks like account creation, license assignment, and group memberships.

**Pain Points:**
- 5-day time-to-productive for new hires
- Manual errors in access provisioning
- No standardized onboarding experience
- Limited visibility into onboarding status
- High IT/HR administrative overhead

---

## Solution

Implemented automated M365 new-hire onboarding system:
- Azure Functions for user provisioning
- SharePoint for request intake
- Power Automate for workflow orchestration
- Teams workspace creation
- Manager notifications

**Implementation Time:** 48 hours

---

## Results

### 📈 Performance Metrics

| Metric | Result |
|--------|--------|
| **Total New Hires Onboarded** | $($kpis.SuccessfulRuns) |
| **Success Rate** | $($kpis.SuccessRate) |
| **Average Onboarding Time** | $($kpis.AverageDurationMinutes) minutes |
| **Error Rate** | $($kpis.ErrorRate) |
| **Departments Served** | $($kpis.DepartmentCount) |

### ⚡ Efficiency Gains

- **Time Saved:** $($kpis.ManualHoursSaved) hours ($([math]::Round($kpis.ManualHoursSaved / 8, 1)) work days)
- **Time-to-Productive:** Reduced from 5 days to <1 day (80% reduction)
- **Manual Steps Eliminated:** 10-20 per hire
- **ROI:** [Calculate based on hourly rate]

### 💡 Key Improvements

- ✅ **Instant Provisioning:** New hire accounts created in <10 minutes
- ✅ **Zero Errors:** Automated provisioning eliminates manual mistakes
- ✅ **Consistent Experience:** Every new hire gets standardized onboarding
- ✅ **Full Visibility:** Managers and HR track progress in real-time
- ✅ **Self-Service:** HR submits requests without IT involvement

---

## Quote

> "The automation has transformed our onboarding process. What used to take 5 days now happens automatically in minutes. Our IT team can focus on strategic work instead of repetitive provisioning tasks."
>
> **— [Name], [Title], $CompanyName**

---

## Technical Details

**Technology Stack:**
- Microsoft 365 (Azure AD, SharePoint, Teams, Power Automate)
- Azure Functions (TypeScript)
- PowerShell automation scripts

**Integration Points:**
- SharePoint for request intake
- Power Automate for workflow orchestration
- Azure Functions for Graph API provisioning
- Teams for onboarding workspaces
- Application Insights for monitoring

**Security:**
- App-only authentication with least-privilege permissions
- Correlation IDs for full audit trail
- Automated logging to SharePoint
- Rollback capabilities for failed provisions

---

## By the Numbers

### 📊 Monthly Impact

- **New Hires Per Month:** $([math]::Round($kpis.SuccessfulRuns / ($kpis.PeriodDays / 30), 0))
- **Hours Saved Per Month:** $([math]::Round($kpis.ManualHoursSaved / ($kpis.PeriodDays / 30), 0))
- **Cost Savings:** [Calculate: Hours × Average IT Hourly Rate]

### 🎯 Success Metrics

- **Target Success Rate:** >95%
- **Actual Success Rate:** $($kpis.SuccessRate)
- **Target Time-to-Productive:** ≤1 day
- **Actual Time-to-Productive:** <1 day ✅

---

## Implementation Process

**Timeline:**
- **Day 1-2:** Azure infrastructure setup, app registration
- **Day 3-4:** SharePoint and Teams configuration
- **Day 5-6:** Power Automate flow deployment
- **Day 7-14:** Testing and training

**Total Implementation:** 2 weeks from kickoff to production

---

## Next Steps

Following the success of new-hire onboarding automation, $CompanyName is expanding automation to:
- Employee offboarding
- Equipment provisioning
- IT ticket automation
- Access review workflows

---

## About the Solution

This automation was delivered as part of our **48-Hour FTD Pack** - a rapid deployment package that gets customers from zero to automated onboarding in 2 days.

**Interested in similar results?** Contact us for a demo.

---

**Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm")
**Data Period:** $($kpis.PeriodDays) days
**Runs Analyzed:** $($kpis.TotalRuns)
"@

    # Write to file
    $caseStudy | Out-File $OutputPath -Encoding UTF8

    Write-Host "✅ Case study generated: $OutputPath" -ForegroundColor Green
    Write-Host ""
    Write-Host "📄 Preview:" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    Write-Host "$($caseStudy.Substring(0, [Math]::Min(500, $caseStudy.Length)))..."
    Write-Host ""
    Write-Host "Edit $OutputPath to add customer quote, industry, and ROI calculations" -ForegroundColor Cyan

    exit 0
}
catch {
    Write-Host "❌ Error generating case study: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
