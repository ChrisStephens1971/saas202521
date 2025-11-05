# Teams Onboarding Template

PowerShell script to create Microsoft Teams onboarding workspaces from a template.

## Overview

Creates a Teams team with pre-configured channels for new hire onboarding. Team name includes timestamp for uniqueness.

## Prerequisites

- **PnP.PowerShell** or **Microsoft.Graph.Teams** module
- Microsoft 365 admin permissions
- Teams license

## Installation

```powershell
# Option 1: PnP.PowerShell (recommended)
Install-Module -Name PnP.PowerShell -Scope CurrentUser

# Option 2: Microsoft.Graph
Install-Module -Name Microsoft.Graph -Scope CurrentUser
```

## Usage

### 1. Connect to Microsoft 365

```powershell
# Using PnP.PowerShell
Connect-PnPOnline -Url "https://contoso.sharepoint.com" -Interactive

# Or using Microsoft.Graph
Connect-MgGraph -Scopes "Team.Create", "Group.ReadWrite.All"
```

### 2. Run Script

```powershell
# Create team
.\apply-teams-template.ps1 -DisplayNamePrefix "Onboarding" -Verbose

# Dry run
.\apply-teams-template.ps1 -DryRun -Verbose
```

## Output

```
✅ Teams template applied successfully
📋 Team Name: Onboarding - 20251105-1430
🔑 Team ID: abc-123-def-456
🌐 Site ID: xyz-789-ghi-012
📁 Output file: C:\...\last-site.json
```

## Template Structure

The template creates:
- **Welcome** channel (with Wiki tab)
- **HR** channel
- **IT-Setup** channel
- **Manager-Checklist** channel

## Next Steps

- **PR 4**: Power Automate flow integration
- **PR 5**: Azure Function calls this script after user provisioning
