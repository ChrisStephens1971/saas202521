<#
.SYNOPSIS
    Package FTD (Foot-In-The-Door) deployment pack

.DESCRIPTION
    Creates ftd-pack.zip containing all deployment artifacts
#>

$ErrorActionPreference = "Stop"

Write-Host "📦 Packaging FTD Pack..." -ForegroundColor Cyan

# Create dist directory
$distDir = Join-Path $PSScriptRoot "..\dist"
$tempDir = Join-Path $distDir "temp-ftd-pack"

if (Test-Path $distDir) {
    Remove-Item $distDir -Recurse -Force
}
New-Item -ItemType Directory -Path $distDir | Out-Null
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy artifacts
Write-Host "Copying artifacts..." -ForegroundColor Yellow

# Azure Functions
Write-Host "  - Azure Functions app"
Copy-Item -Path (Join-Path $PSScriptRoot "..\apps\azfunc-provision") `
  -Destination (Join-Path $tempDir "azfunc-provision") `
  -Recurse `
  -Exclude @("node_modules", "dist", ".env", "local.settings.json")

# SharePoint scripts
Write-Host "  - SharePoint provisioning"
Copy-Item -Path (Join-Path $PSScriptRoot "..\infra\sharepoint") `
  -Destination (Join-Path $tempDir "sharepoint") `
  -Recurse

# Teams scripts
Write-Host "  - Teams template"
Copy-Item -Path (Join-Path $PSScriptRoot "..\infra\teams") `
  -Destination (Join-Path $tempDir "teams") `
  -Recurse

# Power Automate flow
Write-Host "  - Power Automate flow"
Copy-Item -Path (Join-Path $PSScriptRoot "..\flows\newhire") `
  -Destination (Join-Path $tempDir "flow") `
  -Recurse

# Documentation
Write-Host "  - Documentation"
Copy-Item -Path (Join-Path $PSScriptRoot "..\docs\RUNBOOK.md") `
  -Destination (Join-Path $tempDir "RUNBOOK.md")
Copy-Item -Path (Join-Path $PSScriptRoot "..\docs\ROLLBACK.md") `
  -Destination (Join-Path $tempDir "ROLLBACK.md")

# Templates
Write-Host "  - Templates"
Copy-Item -Path (Join-Path $PSScriptRoot "..\project-brief\automation") `
  -Destination (Join-Path $tempDir "templates") `
  -Recurse

# Create README
Write-Host "  - README"
$readmeContent = @"
# M365 New-Hire Onboarding Automation - FTD Pack

**48-Hour Deployment Package**

## Contents

- /azfunc-provision/ - Azure Functions app (TypeScript)
- /sharepoint/ - SharePoint list provisioning scripts
- /teams/ - Teams template application scripts
- /flow/ - Power Automate flow definition
- /templates/ - JSON templates (SharePoint schema, Teams template)
- RUNBOOK.md - Complete deployment guide
- ROLLBACK.md - Rollback procedures

## Quick Start

1. Read RUNBOOK.md for complete instructions
2. Deploy in order: Azure → SharePoint → Teams → Flow
3. Test with sandbox data before production
4. Monitor first 3-5 runs closely

## Requirements

- Microsoft 365 E3/E5
- Azure subscription
- PowerShell 7+
- Node.js 18+
- PnP.PowerShell module

## Support

Refer to RUNBOOK.md for troubleshooting and support contacts.

## Time Estimate

- Setup & deployment: 24-36 hours
- Testing & training: 12 hours
- Total: 36-48 hours

---

**Version:** 1.0
**Created:** $(Get-Date -Format "yyyy-MM-dd")
"@

$readmeContent | Out-File (Join-Path $tempDir "README.md") -Encoding UTF8

# Create ZIP
Write-Host "Creating archive..." -ForegroundColor Yellow
$zipPath = Join-Path $distDir "ftd-pack.zip"
Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipPath -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

# Summary
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host ""
Write-Host "✅ FTD Pack created successfully!" -ForegroundColor Green
Write-Host "📁 Location: $zipPath" -ForegroundColor Cyan
Write-Host "📊 Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Extract and follow RUNBOOK.md for deployment" -ForegroundColor Yellow
