<#
.SYNOPSIS
    Provision SharePoint "New-Hire Requests" list from JSON schema (idempotent)

.DESCRIPTION
    Creates or updates a SharePoint list with fields defined in sharepoint-list-schema.json.
    Idempotent - running twice shows no changes on the second run.
    Supports -WhatIf and -Verbose for dry-run testing.

.PARAMETER SiteUrl
    SharePoint site URL (e.g., https://contoso.sharepoint.com/sites/HR)

.PARAMETER ListName
    Name of the list to create/update (default: "New-Hire Requests")

.PARAMETER SchemaPath
    Path to sharepoint-list-schema.json (default: ../../project-brief/automation/sharepoint-list-schema.json)

.EXAMPLE
    Connect-PnPOnline -Url https://contoso.sharepoint.com/sites/HR -Interactive
    .\provision-sharepoint.ps1 -SiteUrl https://contoso.sharepoint.com/sites/HR -WhatIf

.EXAMPLE
    .\provision-sharepoint.ps1 -SiteUrl https://contoso.sharepoint.com/sites/HR -ListName "New-Hire Requests"

.NOTES
    Requires PnP.PowerShell module: Install-Module -Name PnP.PowerShell
    Must be connected to SharePoint via Connect-PnPOnline before running
#>

[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)]
    [string]$SiteUrl,

    [Parameter(Mandatory = $false)]
    [string]$ListName = "New-Hire Requests",

    [Parameter(Mandatory = $false)]
    [string]$SchemaPath = "..\..\project-brief\automation\sharepoint-list-schema.json"
)

$ErrorActionPreference = "Stop"
$logFile = Join-Path $PSScriptRoot "provision.log"

# Function to write log
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Write-Verbose $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

# Function to ensure connection
function Test-PnPConnection {
    try {
        $ctx = Get-PnPContext
        if ($null -eq $ctx) {
            throw "Not connected to SharePoint"
        }
        Write-Log "Connected to SharePoint site: $($ctx.Url)"
        return $true
    }
    catch {
        Write-Error "Not connected to SharePoint. Run Connect-PnPOnline first."
        return $false
    }
}

# Main execution
try {
    Write-Log "=== SharePoint List Provisioning Started ===" "INFO"
    Write-Log "Site URL: $SiteUrl"
    Write-Log "List Name: $ListName"
    Write-Log "Schema Path: $SchemaPath"

    # Validate connection
    if (-not (Test-PnPConnection)) {
        exit 1
    }

    # Read schema file
    if (-not (Test-Path $SchemaPath)) {
        Write-Error "Schema file not found: $SchemaPath"
        exit 1
    }

    Write-Log "Reading schema from: $SchemaPath"
    $schema = Get-Content $SchemaPath -Raw | ConvertFrom-Json
    Write-Log "Schema loaded: $($schema.Fields.Count) fields defined"

    # Check if list exists
    $list = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue

    if ($null -eq $list) {
        # Create new list
        if ($PSCmdlet.ShouldProcess($ListName, "Create SharePoint list")) {
            Write-Log "Creating new list: $ListName" "INFO"
            $list = New-PnPList -Title $ListName -Template GenericList -Url "Lists/$($ListName.Replace(' ', ''))"
            Write-Log "List created successfully" "INFO"
        }
        else {
            Write-Log "WHATIF: Would create list $ListName" "INFO"
        }
    }
    else {
        Write-Log "List already exists: $ListName" "INFO"
    }

    # Process each field from schema
    $changesDetected = $false

    foreach ($fieldDef in $schema.Fields) {
        $fieldName = $fieldDef.name
        $fieldType = $fieldDef.type
        $required = if ($fieldDef.required) { $true } else { $false }

        Write-Log "Processing field: $fieldName (Type: $fieldType, Required: $required)"

        # Check if field exists
        $existingField = Get-PnPField -List $ListName -Identity $fieldName -ErrorAction SilentlyContinue

        if ($null -eq $existingField) {
            $changesDetected = $true

            if ($PSCmdlet.ShouldProcess($fieldName, "Add field to list $ListName")) {
                Write-Log "Adding field: $fieldName" "INFO"

                switch ($fieldType) {
                    "Text" {
                        Add-PnPField -List $ListName -DisplayName $fieldName -InternalName $fieldName `
                            -Type Text -Required:$required | Out-Null
                    }
                    "DateTime" {
                        Add-PnPField -List $ListName -DisplayName $fieldName -InternalName $fieldName `
                            -Type DateTime -Required:$required | Out-Null
                    }
                    "Choice" {
                        $choices = $fieldDef.choices -join ','
                        Add-PnPField -List $ListName -DisplayName $fieldName -InternalName $fieldName `
                            -Type Choice -Choices $choices -Required:$required | Out-Null
                    }
                    default {
                        Write-Log "Unsupported field type: $fieldType for field $fieldName" "WARNING"
                    }
                }

                Write-Log "Field added: $fieldName" "INFO"
            }
            else {
                Write-Log "WHATIF: Would add field $fieldName" "INFO"
            }
        }
        else {
            Write-Log "Field already exists: $fieldName" "INFO"

            # Check if field configuration matches
            if ($existingField.Required -ne $required) {
                $changesDetected = $true
                Write-Log "Field $fieldName has different Required setting (Current: $($existingField.Required), Expected: $required)" "WARNING"

                if ($PSCmdlet.ShouldProcess($fieldName, "Update Required property")) {
                    Set-PnPField -List $ListName -Identity $fieldName -Values @{Required = $required} | Out-Null
                    Write-Log "Updated Required property for field: $fieldName" "INFO"
                }
                else {
                    Write-Log "WHATIF: Would update Required property for field $fieldName" "INFO"
                }
            }
        }
    }

    # Summary
    if ($changesDetected) {
        if ($WhatIfPreference) {
            Write-Log "=== Dry run complete: Changes would be applied ===" "INFO"
        }
        else {
            Write-Log "=== Provisioning complete: Changes applied ===" "INFO"
        }
    }
    else {
        Write-Log "=== Provisioning complete: No changes needed (idempotent) ===" "INFO"
    }

    Write-Host "✅ SharePoint list provisioning completed successfully" -ForegroundColor Green
    Write-Host "📋 Log file: $logFile" -ForegroundColor Cyan

    exit 0
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)" "ERROR"
    Write-Log "Stack trace: $($_.ScriptStackTrace)" "ERROR"
    Write-Host "❌ Provisioning failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
