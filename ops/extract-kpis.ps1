<#
.SYNOPSIS
    Extract KPIs from SharePoint "Onboarding Runs" list

.DESCRIPTION
    Queries SharePoint for onboarding metrics and generates KPI summary

.PARAMETER SiteUrl
    SharePoint site URL

.PARAMETER OutputFormat
    Output format: JSON, CSV, or Console (default: Console)

.EXAMPLE
    .\extract-kpis.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/HR"

.EXAMPLE
    .\extract-kpis.ps1 -SiteUrl "..." -OutputFormat JSON > kpis.json
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false)]
    [ValidateSet("Console", "JSON", "CSV")]
    [string]$OutputFormat = "Console",

    [Parameter(Mandatory = $false)]
    [int]$LastNDays = 30
)

$ErrorActionPreference = "Stop"

try {
    # Connect to SharePoint
    Write-Verbose "Connecting to $SiteUrl..."
    Connect-PnPOnline -Url $SiteUrl -Interactive -ErrorAction Stop

    # Calculate date range
    $startDate = (Get-Date).AddDays(-$LastNDays)
    $startDateString = $startDate.ToString("yyyy-MM-ddTHH:mm:ssZ")

    # Query SharePoint list
    Write-Verbose "Fetching onboarding runs from last $LastNDays days..."
    $camlQuery = @"
<View>
  <Query>
    <Where>
      <Geq>
        <FieldRef Name='Created' />
        <Value Type='DateTime'>$startDateString</Value>
      </Geq>
    </Where>
    <OrderBy>
      <FieldRef Name='Created' Ascending='FALSE' />
    </OrderBy>
  </Query>
</View>
"@

    $items = Get-PnPListItem -List "Onboarding Runs" -Query $camlQuery

    # Calculate KPIs
    $totalRuns = $items.Count
    $successfulRuns = ($items | Where-Object { $_["Status"] -eq "Success" }).Count
    $failedRuns = ($items | Where-Object { $_["Status"] -eq "Failed" }).Count
    $successRate = if ($totalRuns -gt 0) { [math]::Round(($successfulRuns / $totalRuns) * 100, 2) } else { 0 }

    # Average duration (in minutes)
    $durationsInSeconds = $items | Where-Object { $_["DurationSeconds"] -ne $null } | ForEach-Object { [int]$_["DurationSeconds"] }
    $avgDurationMinutes = if ($durationsInSeconds.Count -gt 0) {
        [math]::Round(($durationsInSeconds | Measure-Object -Average).Average / 60, 2)
    } else { 0 }

    # Unique departments
    $departments = $items | Where-Object { $_["Department"] -ne $null } | ForEach-Object { $_["Department"] } | Select-Object -Unique
    $departmentCount = $departments.Count

    # Manual time saved (assuming 4 hours per manual onboarding)
    $manualHoursPerHire = 4
    $totalHoursSaved = $successfulRuns * $manualHoursPerHire

    # Error rate
    $errorRate = if ($totalRuns -gt 0) { [math]::Round(($failedRuns / $totalRuns) * 100, 2) } else { 0 }

    # Build KPI object
    $kpis = [PSCustomObject]@{
        PeriodDays = $LastNDays
        StartDate = $startDate.ToString("yyyy-MM-dd")
        EndDate = (Get-Date).ToString("yyyy-MM-dd")
        TotalRuns = $totalRuns
        SuccessfulRuns = $successfulRuns
        FailedRuns = $failedRuns
        SuccessRate = "$successRate%"
        AverageDurationMinutes = $avgDurationMinutes
        DepartmentCount = $departmentCount
        ManualHoursSaved = $totalHoursSaved
        ErrorRate = "$errorRate%"
        Departments = $departments
    }

    # Output based on format
    switch ($OutputFormat) {
        "JSON" {
            $kpis | ConvertTo-Json -Depth 3
        }
        "CSV" {
            $kpis | Select-Object -Property * -ExcludeProperty Departments | ConvertTo-Csv -NoTypeInformation
        }
        default {
            Write-Host ""
            Write-Host "📊 KPI Summary (Last $LastNDays Days)" -ForegroundColor Cyan
            Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Period: $($kpis.StartDate) to $($kpis.EndDate)" -ForegroundColor White
            Write-Host ""
            Write-Host "📈 Performance Metrics" -ForegroundColor Yellow
            Write-Host "  Total Runs:            $($kpis.TotalRuns)" -ForegroundColor White
            Write-Host "  Successful:            $($kpis.SuccessfulRuns)" -ForegroundColor Green
            Write-Host "  Failed:                $($kpis.FailedRuns)" -ForegroundColor $(if ($failedRuns -gt 0) { "Red" } else { "White" })
            Write-Host "  Success Rate:          $($kpis.SuccessRate)" -ForegroundColor $(if ($successRate -ge 95) { "Green" } elseif ($successRate -ge 90) { "Yellow" } else { "Red" })
            Write-Host "  Error Rate:            $($kpis.ErrorRate)" -ForegroundColor $(if ($errorRate -le 5) { "Green" } elseif ($errorRate -le 10) { "Yellow" } else { "Red" })
            Write-Host ""
            Write-Host "⚡ Efficiency Metrics" -ForegroundColor Yellow
            Write-Host "  Avg Duration:          $($kpis.AverageDurationMinutes) minutes" -ForegroundColor White
            Write-Host "  Manual Hours Saved:    $($kpis.ManualHoursSaved) hours" -ForegroundColor Green
            Write-Host "  Departments Served:    $($kpis.DepartmentCount)" -ForegroundColor White
            Write-Host ""
            if ($departments.Count -gt 0) {
                Write-Host "🏢 Departments" -ForegroundColor Yellow
                foreach ($dept in $departments) {
                    Write-Host "  - $dept" -ForegroundColor White
                }
            }
            Write-Host ""
        }
    }

    return
}
catch {
    Write-Host "❌ Error extracting KPIs: $($_.Exception.Message)" -ForegroundColor Red
    Write-Verbose $_.ScriptStackTrace
    throw
}
