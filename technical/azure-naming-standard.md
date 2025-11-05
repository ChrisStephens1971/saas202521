# Azure Naming & Tagging Standard (v1.1)

A practical, boring-on-purpose convention for large multi-project Azure estates.

**Version:** 1.1
**Last Updated:** 2025-11-05
**Status:** Production-ready

---

## Table of Contents

1. [Global Pattern](#global-pattern)
2. [Token Dictionary](#token-dictionary)
3. [Region Codes](#region-codes)
4. [Type Abbreviations Reference](#type-abbreviations-reference)
5. [Service Length Constraints](#service-length-constraints)
6. [Global Uniqueness Strategy](#global-uniqueness-strategy)
7. [Resource-Specific Patterns](#resource-specific-patterns)
8. [Multi-Region Patterns](#multi-region-patterns)
9. [DNS & Public Names](#dns--public-names)
10. [Tagging Standard](#tagging-standard)
11. [Enforcement](#enforcement)
12. [IaC Integration](#iac-integration)
13. [Worked Examples](#worked-examples)
14. [Non-Resource Names](#non-resource-names)
15. [Exception Process](#exception-process)
16. [Migration Strategy](#migration-strategy)
17. [Versioning](#versioning)

---

## Global Pattern

**Format**
```
{type}-{org}-{proj}-{env}-{region}-{slice}-{seq}
```
- **Required:** `type`, `org`, `proj`, `env`, `region`
- **Optional:** `slice` (layer like `app|data|net|sec|ops`) and `seq` (`01–99`)

**Rules**
- Lowercase only. Hyphens as separators.
- Keep total length under service limits (see constraints table below).
- Prefer ≤ 60 chars where applicable.
- Never omit environment or region. No exceptions.
- For globally-unique services, always include `{seq}` or subscription fragment.

---

## Token Dictionary

| Token   | Meaning                                   | Examples / Allowed values |
|---------|-------------------------------------------|---------------------------|
| `type`  | Resource abbreviation (see reference)     | `rg`, `app`, `sqlsvr`, `st`, `kv`, `acr`, `vnet`, `snet`, `nsg`, `la`, `appi`, `sb`, `eh`, `redis`, `aks`, `agw`, `bastion`, `pe` |
| `org`   | Holding company or LLC code (2–4 chars)   | `vrd`, `mls`, `arm`, `acm` |
| `proj`  | Product or project code (2–5 chars)       | `hoa`, `tmt`, `sntl`, `pest`, `auto` |
| `env`   | Deployment stage                           | `prd`, `stg`, `dev`, `tst`, `sbx` |
| `region`| Azure region short code                    | `eus`, `eus2`, `wus2`, `scus`, `neu`, `weu` |
| `slice` | Logical layer                              | `app`, `data`, `net`, `sec`, `ops` |
| `seq`   | Sequence when multiples exist              | `01` … `99` |

---

## Region Codes

| Region            | Code  | Paired Region | Paired Code |
|-------------------|-------|---------------|-------------|
| East US           | `eus` | West US       | `wus`       |
| East US 2         | `eus2`| Central US    | `cus`       |
| West US 2         | `wus2`| West Central US | `wcus`    |
| South Central US  | `scus`| North Central US | `ncus`   |
| North Europe      | `neu` | West Europe   | `weu`       |
| West Europe       | `weu` | North Europe  | `neu`       |
| UK South          | `uks` | UK West       | `ukw`       |
| Southeast Asia    | `sea` | East Asia     | `ea`        |

> Add more as needed, but keep the compact style (3-4 chars max).

---

## Type Abbreviations Reference

Complete reference of resource type abbreviations:

| Abbreviation | Full Name | Azure Service | Max Length |
|--------------|-----------|---------------|------------|
| `rg` | Resource Group | Microsoft.Resources/resourceGroups | 90 |
| `vnet` | Virtual Network | Microsoft.Network/virtualNetworks | 64 |
| `snet` | Subnet | Microsoft.Network/virtualNetworks/subnets | 80 |
| `nsg` | Network Security Group | Microsoft.Network/networkSecurityGroups | 80 |
| `rt` | Route Table | Microsoft.Network/routeTables | 80 |
| `pip` | Public IP Address | Microsoft.Network/publicIPAddresses | 80 |
| `kv` | Key Vault | Microsoft.KeyVault/vaults | 24 |
| `acr` | Azure Container Registry | Microsoft.ContainerRegistry/registries | 50 |
| `asp` | App Service Plan | Microsoft.Web/serverfarms | 60 |
| `app` | Web App | Microsoft.Web/sites | 60 |
| `func` | Function App | Microsoft.Web/sites | 60 |
| `appi` | Application Insights | Microsoft.Insights/components | 260 |
| `la` | Log Analytics Workspace | Microsoft.OperationalInsights/workspaces | 63 |
| `st` | Storage Account | Microsoft.Storage/storageAccounts | 24 |
| `sqlsvr` | SQL Server | Microsoft.Sql/servers | 63 |
| `sqldb` | SQL Database | Microsoft.Sql/servers/databases | 128 |
| `cosmos` | Cosmos DB | Microsoft.DocumentDB/databaseAccounts | 44 |
| `sb` | Service Bus Namespace | Microsoft.ServiceBus/namespaces | 50 |
| `eh` | Event Hub Namespace | Microsoft.EventHub/namespaces | 50 |
| `redis` | Azure Cache for Redis | Microsoft.Cache/redis | 63 |
| `azfw` | Azure Firewall | Microsoft.Network/azureFirewalls | 80 |
| `pe` | Private Endpoint | Microsoft.Network/privateEndpoints | 80 |
| `pvtlink` | Private Link Service | Microsoft.Network/privateLinkServices | 80 |
| `agw` | Application Gateway | Microsoft.Network/applicationGateways | 80 |
| `bastion` | Azure Bastion | Microsoft.Network/bastionHosts | 80 |
| `aks` | Azure Kubernetes Service | Microsoft.ContainerService/managedClusters | 63 |
| `vm` | Virtual Machine | Microsoft.Compute/virtualMachines | 64 |
| `vmss` | Virtual Machine Scale Set | Microsoft.Compute/virtualMachineScaleSets | 64 |
| `disk` | Managed Disk | Microsoft.Compute/disks | 80 |
| `nic` | Network Interface | Microsoft.Network/networkInterfaces | 80 |
| `lb` | Load Balancer | Microsoft.Network/loadBalancers | 80 |
| `tm` | Traffic Manager | Microsoft.Network/trafficManagerProfiles | 63 |
| `fd` | Front Door | Microsoft.Network/frontDoors | 64 |
| `cdn` | CDN Profile | Microsoft.Cdn/profiles | 260 |

---

## Service Length Constraints

Critical services with strict naming limits:

| Service | Max Length | Characters Allowed | Global Unique? |
|---------|-----------|-------------------|----------------|
| **Storage Account** | 24 | Lowercase letters, numbers only | ✅ Yes |
| **Key Vault** | 24 | Alphanumeric + hyphens | ✅ Yes |
| **Azure Container Registry** | 50 | Alphanumeric only | ✅ Yes |
| **App Service / Function** | 60 | Alphanumeric + hyphens | ✅ Yes |
| **Service Bus Namespace** | 50 | Alphanumeric + hyphens | ✅ Yes |
| **Event Hub Namespace** | 50 | Alphanumeric + hyphens | ✅ Yes |
| **Cosmos DB** | 44 | Lowercase, alphanumeric + hyphens | ✅ Yes |
| **SQL Server** | 63 | Lowercase, alphanumeric + hyphens | ✅ Yes |
| **Redis Cache** | 63 | Alphanumeric + hyphens | ✅ Yes |
| **AKS Cluster** | 63 | Alphanumeric + hyphens | ❌ No |
| **Log Analytics** | 63 | Alphanumeric + hyphens | ❌ No |

**Planning tip:** For short-limit services, keep `{org}` to 3 chars and `{proj}` to 3-4 chars max.

---

## Global Uniqueness Strategy

Many Azure services require **globally unique** names across all Azure tenants:

### Services Requiring Global Uniqueness
- Storage Accounts
- Key Vaults
- Azure Container Registries
- App Services / Function Apps
- Service Bus Namespaces
- Event Hub Namespaces
- Cosmos DB Accounts

### Uniqueness Strategies

**Strategy 1: Sequential suffix (Recommended)**
```
kv-vrd-tmt-prd-eus2-01
kv-vrd-tmt-prd-eus2-02
```

**Strategy 2: Subscription ID fragment**
```
kv-vrd-tmt-prd-eus2-a1b2
# where a1b2 = last 4 chars of subscription ID
```

**Strategy 3: Random suffix (for automation)**
```
kv-vrd-tmt-prd-eus2-x7k9
# generated during provisioning
```

**Collision handling:**
1. Attempt name with `{seq}=01`
2. If exists, increment: `02`, `03`, etc.
3. Document actual name in IaC outputs
4. Never reuse names (even after deletion, names are reserved for 24-48 hours)

---

## Resource-Specific Patterns

Most resources follow the base pattern with service-specific adjustments:

### Resource Groups
```
rg-{org}-{proj}-{env}-{region}-{slice}
# e.g., rg-vrd-tmt-prd-eus2-app
```

**Best practice:** One RG per slice per env per region for blast radius control.

### Networking
```
vnet-{org}-{proj}-{env}-{region}
snet-{org}-{proj}-{env}-{region}-{purpose}
nsg-{org}-{proj}-{env}-{region}-{purpose}
rt-{org}-{proj}-{env}-{region}-{purpose}

# Examples:
vnet-vrd-tmt-prd-eus2
snet-vrd-tmt-prd-eus2-app
snet-vrd-tmt-prd-eus2-data
nsg-vrd-tmt-prd-eus2-app
```

### Compute / Runtime
```
asp-{org}-{proj}-{env}-{region}
app-{org}-{proj}-{env}-{region}-{seq}
func-{org}-{proj}-{env}-{region}-{seq}
vm-{org}-{proj}-{env}-{region}-{purpose}-{seq}

# Examples:
asp-vrd-tmt-prd-eus2
app-vrd-tmt-prd-eus2-01
func-vrd-tmt-prd-eus2-01
vm-vrd-tmt-prd-eus2-web-01
```

### Secrets & Registries
```
kv-{org}-{proj}-{env}-{region}-{seq}
acr{org}{proj}{env}{region}

# Examples:
kv-vrd-tmt-prd-eus2-01    (23 chars - fits in 24 limit)
acrvrdtmtprdeus2          (16 chars - alphanumeric only)
```

### Observability
```
appi-{org}-{proj}-{env}-{region}
la-{org}-{proj}-{env}-{region}

# Examples:
appi-vrd-tmt-prd-eus2
la-vrd-tmt-prd-eus2
```

### Data Services
```
sqlsvr-{org}-{proj}-{env}-{region}
sqldb-{org}-{proj}-{env}-{region}-{name}
cosmos-{org}-{proj}-{env}-{region}
redis-{org}-{proj}-{env}-{region}-{seq}

# Examples:
sqlsvr-vrd-tmt-prd-eus2
sqldb-vrd-tmt-prd-eus2-core
cosmos-vrd-tmt-prd-eus2
redis-vrd-tmt-prd-eus2-01
```

### Storage (strict constraints)
Storage account names must be **3–24 chars**, **alphanumeric only**, **globally unique**.
```
st{org}{proj}{env}{region}{seq}
# e.g., stvrdtmtprdeus201 (18 chars)

# For specific purposes:
st{org}{proj}{env}{region}{purpose}{seq}
# e.g., stvrdtmtprdeus2app01 (22 chars)
```

### Messaging
```
sb-{org}-{proj}-{env}-{region}
eh-{org}-{proj}-{env}-{region}

# Examples:
sb-vrd-tmt-prd-eus2
eh-vrd-tmt-prd-eus2
```

### Edge Security & Connectivity
```
azfw-{org}-{proj}-{env}-{region}
agw-{org}-{proj}-{env}-{region}
bastion-{org}-{proj}-{env}-{region}
pe-{org}-{proj}-{env}-{region}-{target}

# Examples:
azfw-vrd-tmt-prd-eus2
agw-vrd-tmt-prd-eus2
bastion-vrd-tmt-prd-eus2
pe-vrd-tmt-prd-eus2-sqlsvr
```

### Kubernetes
```
aks-{org}-{proj}-{env}-{region}

# Example:
aks-vrd-tmt-prd-eus2
```

---

## Multi-Region Patterns

For disaster recovery, high availability, or geo-distributed workloads:

### Primary-Secondary (Active-Passive DR)
```
# Primary region
vnet-vrd-tmt-prd-eus2-primary
app-vrd-tmt-prd-eus2-primary-01
sqlsvr-vrd-tmt-prd-eus2-primary

# Secondary region (DR)
vnet-vrd-tmt-prd-wus2-secondary
app-vrd-tmt-prd-wus2-secondary-01
sqlsvr-vrd-tmt-prd-wus2-secondary
```

### Active-Active (Multi-region load balancing)
```
# Region 1
app-vrd-tmt-prd-eus2-01
sqlsvr-vrd-tmt-prd-eus2

# Region 2
app-vrd-tmt-prd-wus2-01
sqlsvr-vrd-tmt-prd-wus2
```

### Global Services (region-agnostic)
```
# Traffic Manager, Front Door, CDN
tm-vrd-tmt-prd-global
fd-vrd-tmt-prd-global
cdn-vrd-tmt-prd-global
```

**Tagging for multi-region:**
- Add `RegionRole` tag: `primary`, `secondary`, `dr`, `active`
- Add `PairedRegion` tag: `wus2`, `eus2`, etc.

---

## DNS & Public Names

### Public-Facing Endpoints
```
# API endpoints
api.{proj}-{env}.{orgroot}.com
api.tmt-prd.verdaio.com

# Web apps
app.{proj}-{env}.{orgroot}.com
app.tmt-prd.verdaio.com

# Tenant-specific (multi-tenant)
{tenant}.{proj}.{orgroot}.com
acme.tmt.verdaio.com
```

### Private DNS Zones
```
pdns-{org}-{proj}-{env}-{region}-{zone}

# Where {zone} is a normalized label:
# privatelink.database.windows.net → pl-database-windows-net
# privatelink.blob.core.windows.net → pl-blob-core

# Examples:
pdns-vrd-tmt-prd-eus2-pl-database
pdns-vrd-tmt-prd-eus2-pl-blob
```

---

## Tagging Standard

Apply these tags to **every resource and resource group**:

### Core Tags (Required)

| Tag Key | Example Value | Notes |
|---------|---------------|-------|
| `Org` | `vrd` | Holding company / LLC |
| `Project` | `tmt` | Product code |
| `Environment` | `prd` | `prd\|stg\|dev\|tst\|sbx` |
| `Region` | `eus2` | Match short code |
| `Owner` | `ops@verdaio.com` | Distribution list preferred |

### Financial Tags (Required)

| Tag Key | Example Value | Notes |
|---------|---------------|-------|
| `CostCenter` | `tmt-llc` | Billing/chargeback unit |
| `BusinessUnit` | `marketing` | Department/division |
| `Application` | `tournament-mgmt` | Service tree mapping |

### Security & Compliance Tags (Required)

| Tag Key | Example Value | Notes |
|---------|---------------|-------|
| `DataSensitivity` | `confidential` | `public\|internal\|confidential\|regulated` |
| `Compliance` | `none` | `none\|pci\|hipaa\|sox\|gdpr` |

### Operational Tags (Recommended)

| Tag Key | Example Value | Notes |
|---------|---------------|-------|
| `DRTier` | `rpo15m-rto4h` | Recovery objectives |
| `BackupRetention` | `30d` | Backup policy (7d, 30d, 90d, 1y) |
| `AutoShutdown` | `true` | Dev/test resource management |
| `MaintenanceWindow` | `sun-02:00-06:00` | Allowed maintenance time |
| `CreatedBy` | `pipeline` | `pipeline\|human\|terraform\|bicep` |
| `CreatedDate` | `2025-11-05` | ISO 8601 format |
| `ManagedBy` | `terraform` | IaC tool used |

### Multi-Region Tags (When Applicable)

| Tag Key | Example Value | Notes |
|---------|---------------|-------|
| `RegionRole` | `primary` | `primary\|secondary\|dr\|active` |
| `PairedRegion` | `wus2` | DR/HA paired region |

---

## Enforcement

### Azure Policy – Resource Group Naming

Deny RGs that don't match `rg-{org}-{proj}-{env}-{region}-{slice}`:

```json
{
  "properties": {
    "displayName": "Enforce RG naming standard",
    "policyType": "Custom",
    "mode": "All",
    "description": "rg-{org}-{proj}-{env}-{region}-{slice}",
    "policyRule": {
      "if": {
        "allOf": [
          {
            "field": "type",
            "equals": "Microsoft.Resources/subscriptions/resourceGroups"
          },
          {
            "not": {
              "field": "name",
              "match": "rg-???-???-(prd|stg|dev|tst|sbx)-(eus|eus2|wus2|scus|neu|weu|uks|ukw)-(app|data|net|sec|ops)"
            }
          }
        ]
      },
      "then": {
        "effect": "deny"
      }
    }
  }
}
```

### Azure Policy – Required Tags

Require core tags on all resources:

```json
{
  "properties": {
    "displayName": "Require standard tags",
    "policyType": "Custom",
    "mode": "Indexed",
    "parameters": {},
    "policyRule": {
      "if": {
        "anyOf": [
          { "field": "tags['Org']", "exists": "false" },
          { "field": "tags['Project']", "exists": "false" },
          { "field": "tags['Environment']", "exists": "false" },
          { "field": "tags['Region']", "exists": "false" },
          { "field": "tags['Owner']", "exists": "false" },
          { "field": "tags['CostCenter']", "exists": "false" }
        ]
      },
      "then": {
        "effect": "deny"
      }
    }
  }
}
```

### Azure Policy – Tag Inheritance

Auto-inherit tags from resource group to resources:

```json
{
  "properties": {
    "displayName": "Inherit tags from RG",
    "policyType": "Custom",
    "mode": "Indexed",
    "policyRule": {
      "if": {
        "allOf": [
          { "field": "tags['Org']", "exists": "false" },
          { "value": "[resourceGroup().tags['Org']]", "notEquals": "" }
        ]
      },
      "then": {
        "effect": "modify",
        "details": {
          "roleDefinitionIds": [
            "/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c"
          ],
          "operations": [
            {
              "operation": "add",
              "field": "tags['Org']",
              "value": "[resourceGroup().tags['Org']]"
            }
          ]
        }
      }
    }
  }
}
```

### Azure Resource Graph – Find Noncompliant Names

Identify resources with suspiciously short or malformed names:

```kusto
Resources
| where type != "microsoft.resources/subscriptions/resourcegroups"
| extend parts = split(name, "-")
| where array_length(parts) < 5
  or parts[0] !in~ ("app","func","kv","acr","sqlsvr","sqldb","vnet","snet","nsg","st","appi","la","azfw","sb","eh","redis","aks","asp","agw","bastion","pe","vm","vmss","nic","lb","rt","pip","cosmos","disk")
| project name, type, resourceGroup, subscriptionId
| order by name asc
```

### Find Resources Missing Required Tags

```kusto
Resources
| where tags !has "Org"
   or tags !has "Project"
   or tags !has "Environment"
   or tags !has "Owner"
| project name, type, resourceGroup, tags
| order by name asc
```

---

## IaC Integration

### Terraform Module Example

**File: `modules/azure-naming/main.tf`**

```hcl
variable "org" {
  description = "Organization code (2-4 chars)"
  type        = string
  validation {
    condition     = length(var.org) >= 2 && length(var.org) <= 4
    error_message = "Org code must be 2-4 characters."
  }
}

variable "project" {
  description = "Project code (2-5 chars)"
  type        = string
  validation {
    condition     = length(var.project) >= 2 && length(var.project) <= 5
    error_message = "Project code must be 2-5 characters."
  }
}

variable "env" {
  description = "Environment"
  type        = string
  validation {
    condition     = contains(["prd", "stg", "dev", "tst", "sbx"], var.env)
    error_message = "Environment must be prd, stg, dev, tst, or sbx."
  }
}

variable "region" {
  description = "Azure region short code"
  type        = string
}

variable "location" {
  description = "Azure region full name"
  type        = string
}

locals {
  name_prefix = "${var.org}-${var.project}-${var.env}-${var.region}"

  common_tags = {
    Org          = var.org
    Project      = var.project
    Environment  = var.env
    Region       = var.region
    Owner        = var.owner
    CostCenter   = var.cost_center
    ManagedBy    = "terraform"
    CreatedDate  = timestamp()
  }
}

output "name_prefix" {
  value = local.name_prefix
}

output "resource_group_name" {
  value = "rg-${local.name_prefix}-${var.slice}"
}

output "storage_account_name" {
  value = "st${var.org}${var.project}${var.env}${var.region}${format("%02d", var.sequence)}"
}

output "key_vault_name" {
  value = "kv-${local.name_prefix}-${format("%02d", var.sequence)}"
}

output "app_service_name" {
  value = "app-${local.name_prefix}-${format("%02d", var.sequence)}"
}

output "tags" {
  value = local.common_tags
}
```

**Usage:**

```hcl
module "naming" {
  source = "./modules/azure-naming"

  org         = "vrd"
  project     = "tmt"
  env         = "prd"
  region      = "eus2"
  location    = "eastus2"
  slice       = "app"
  sequence    = 1
  owner       = "ops@verdaio.com"
  cost_center = "tmt-llc"
}

resource "azurerm_resource_group" "app" {
  name     = module.naming.resource_group_name
  location = module.naming.location
  tags     = module.naming.tags
}

resource "azurerm_storage_account" "main" {
  name                     = module.naming.storage_account_name
  resource_group_name      = azurerm_resource_group.app.name
  location                 = azurerm_resource_group.app.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  tags                     = module.naming.tags
}
```

### Bicep Module Example

**File: `modules/naming.bicep`**

```bicep
@description('Organization code (2-4 chars)')
@minLength(2)
@maxLength(4)
param org string

@description('Project code (2-5 chars)')
@minLength(2)
@maxLength(5)
param project string

@description('Environment')
@allowed([
  'prd'
  'stg'
  'dev'
  'tst'
  'sbx'
])
param env string

@description('Azure region short code')
param region string

@description('Logical slice')
@allowed([
  'app'
  'data'
  'net'
  'sec'
  'ops'
])
param slice string

@description('Sequence number')
@minValue(1)
@maxValue(99)
param sequence int = 1

@description('Owner email')
param owner string

@description('Cost center')
param costCenter string

var namePrefix = '${org}-${project}-${env}-${region}'
var seqPadded = format('{0:00}', sequence)

var commonTags = {
  Org: org
  Project: project
  Environment: env
  Region: region
  Owner: owner
  CostCenter: costCenter
  ManagedBy: 'bicep'
  CreatedDate: utcNow('yyyy-MM-dd')
}

output namePrefix string = namePrefix
output resourceGroupName string = 'rg-${namePrefix}-${slice}'
output storageAccountName string = 'st${org}${project}${env}${region}${seqPadded}'
output keyVaultName string = 'kv-${namePrefix}-${seqPadded}'
output appServiceName string = 'app-${namePrefix}-${seqPadded}'
output tags object = commonTags
```

**Usage:**

```bicep
module naming 'modules/naming.bicep' = {
  name: 'naming'
  params: {
    org: 'vrd'
    project: 'tmt'
    env: 'prd'
    region: 'eus2'
    slice: 'app'
    sequence: 1
    owner: 'ops@verdaio.com'
    costCenter: 'tmt-llc'
  }
}

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: naming.outputs.resourceGroupName
  location: 'eastus2'
  tags: naming.outputs.tags
}

resource storage 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: naming.outputs.storageAccountName
  location: rg.location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_GRS'
  }
  tags: naming.outputs.tags
}
```

---

## Worked Examples

Assume `org=vrd`, `proj=tmt` (tournaments), `env=prd`, `region=eus2`.

### Resource Groups
```
rg-vrd-tmt-prd-eus2-app
rg-vrd-tmt-prd-eus2-data
rg-vrd-tmt-prd-eus2-net
rg-vrd-tmt-prd-eus2-sec
```

### Networking
```
vnet-vrd-tmt-prd-eus2
snet-vrd-tmt-prd-eus2-app
snet-vrd-tmt-prd-eus2-data
snet-vrd-tmt-prd-eus2-mgmt
nsg-vrd-tmt-prd-eus2-app
nsg-vrd-tmt-prd-eus2-data
```

### Compute
```
asp-vrd-tmt-prd-eus2
app-vrd-tmt-prd-eus2-01
app-vrd-tmt-prd-eus2-02
func-vrd-tmt-prd-eus2-01
vm-vrd-tmt-prd-eus2-web-01
```

### Data & Storage
```
sqlsvr-vrd-tmt-prd-eus2
sqldb-vrd-tmt-prd-eus2-core
sqldb-vrd-tmt-prd-eus2-analytics
cosmos-vrd-tmt-prd-eus2
redis-vrd-tmt-prd-eus2-01
stvrdtmtprdeus201
stvrdtmtprdeus2app01
```

### Secrets & Observability
```
kv-vrd-tmt-prd-eus2-01
acrvrdtmtprdeus2
appi-vrd-tmt-prd-eus2
la-vrd-tmt-prd-eus2
```

### Messaging
```
sb-vrd-tmt-prd-eus2
eh-vrd-tmt-prd-eus2
```

### Security & Connectivity
```
azfw-vrd-tmt-prd-eus2
agw-vrd-tmt-prd-eus2
bastion-vrd-tmt-prd-eus2
pe-vrd-tmt-prd-eus2-sqlsvr
pe-vrd-tmt-prd-eus2-st
```

---

## Non-Resource Names

For consistency across your Azure ecosystem:

### Repositories
```
{proj}-{service}-{env}
{proj}-infra

# Examples:
tmt-api-prd
tmt-web-prd
tmt-infra
```

### Entra ID (Azure AD) Groups
```
grp-{proj}-{role}-{env}

# Examples:
grp-tmt-owners-prd
grp-tmt-contributors-stg
grp-tmt-readers-dev
```

### Service Principals
```
spn-{proj}-{service}-{env}

# Examples:
spn-tmt-api-prd
spn-tmt-terraform-prd
```

### Azure DevOps / GitHub Pipelines
```
pipe-{proj}-{service}-{env}

# Examples:
pipe-tmt-api-prd
pipe-tmt-infra-deploy
```

### Key Vault Secrets
```
{service}-{purpose}-{env}

# Examples:
sqlsvr-connection-string-prd
storage-access-key-prd
api-client-secret-prd
```

---

## Exception Process

Sometimes you need to deviate from the standard. Document all exceptions:

### Create EXCEPTIONS.md

In your IaC repository root, create `EXCEPTIONS.md`:

```markdown
# Azure Naming Standard Exceptions

| Resource Name | Standard Name | Reason | Approved By | Date | Sunset Date |
|---------------|---------------|--------|-------------|------|-------------|
| mylegacystorage | stvrdtmtprdeus201 | Pre-dates standard, migration in Q2 | John Doe | 2025-01-15 | 2025-06-30 |
| specialapp | app-vrd-tmt-prd-eus2-01 | Third-party integration requires specific name | Jane Smith | 2025-02-01 | Permanent |
```

### Exception Criteria

**Valid reasons for exceptions:**
- Pre-existing resources (with migration plan)
- Third-party integration requirements
- Service-specific technical limitations
- Temporary resources (clearly marked)

**Invalid reasons:**
- "It's easier this way"
- "We've always done it like this"
- Personal preference
- Lack of planning

### Exception Approval Process

1. Document exception in `EXCEPTIONS.md`
2. Get approval from platform/cloud team
3. Add `Exception` tag to resource: `Exception=naming-standard-legacy`
4. Set sunset date for temporary exceptions
5. Review exceptions quarterly

---

## Migration Strategy

For existing Azure environments:

### Phase 1: Assessment (Week 1-2)

1. **Inventory current resources**
   ```bash
   # Export all resource names
   az resource list --query "[].{name:name, type:type, rg:resourceGroup}" -o table > azure-inventory.txt
   ```

2. **Identify noncompliant resources**
   - Run Resource Graph queries (see Enforcement section)
   - Categorize by risk: High (exposed to internet), Medium (internal), Low (dev/test)

3. **Create migration plan**
   - Prioritize by risk and business impact
   - Identify resources that can't be renamed (some services don't support rename)
   - Plan downtime windows

### Phase 2: Tag First (Week 3-4)

**Before renaming, apply tags** (tags can be applied without downtime):

```bash
# Bulk tag resources
az resource list --query "[?resourceGroup=='myapp-rg'].id" -o tsv | \
  xargs -I {} az resource tag --ids {} --tags \
    Org=vrd \
    Project=tmt \
    Environment=prd \
    Region=eus2 \
    Owner=ops@verdaio.com \
    CostCenter=tmt-llc
```

### Phase 3: Rename Resources (Week 5-12)

**Renaming strategy by resource type:**

| Resource Type | Rename Method | Downtime? |
|---------------|---------------|-----------|
| Resource Groups | Can't rename - recreate | ✅ Yes |
| Storage Accounts | Can't rename - recreate | ✅ Yes |
| Key Vaults | Can rename (via portal/CLI) | ❌ No |
| App Services | Can rename (DNS change) | ⚠️ Minimal |
| SQL Databases | Can rename (T-SQL) | ⚠️ Minimal |
| VNets/Subnets | Can't rename easily | ✅ Yes |
| NSGs | Can rename | ❌ No |

**Migration order:**
1. **Low-risk environments first** (dev, test, sbx)
2. **Observability resources** (Log Analytics, App Insights)
3. **Security resources** (Key Vaults, NSGs)
4. **Data resources** (SQL, Storage - highest risk)
5. **Production environments last**

### Phase 4: Enforce (Week 13+)

1. **Deploy Azure Policies in Audit mode** (Week 13-14)
   - Monitor violations
   - Don't block yet

2. **Fix policy violations** (Week 15-16)
   - Address flagged resources
   - Update EXCEPTIONS.md

3. **Enable Deny policies** (Week 17+)
   - Start with non-production subscriptions
   - Production subscriptions last

### Migration Script Example

```bash
#!/bin/bash
# migrate-resource-group.sh

OLD_RG="myapp-rg"
NEW_RG="rg-vrd-tmt-prd-eus2-app"
LOCATION="eastus2"

# Create new resource group
az group create --name "$NEW_RG" --location "$LOCATION" \
  --tags Org=vrd Project=tmt Environment=prd Region=eus2 Owner=ops@verdaio.com

# Move resources (if supported)
RESOURCES=$(az resource list --resource-group "$OLD_RG" --query "[].id" -o tsv)
for RESOURCE in $RESOURCES; do
  az resource move --destination-group "$NEW_RG" --ids "$RESOURCE"
done

# Delete old resource group
az group delete --name "$OLD_RG" --yes --no-wait
```

### Resources That Can't Be Renamed

For resources that **can't be renamed** without recreation:
- Document as exception with sunset date
- Plan recreation during next maintenance cycle
- Use Blue/Green deployment strategy where possible

---

## Versioning

### Version History

| Version | Date | Changes | Breaking? |
|---------|------|---------|-----------|
| 1.1 | 2025-11-05 | Added length constraints, uniqueness strategy, IaC examples, migration guide | ❌ No |
| 1.0 | 2025-10-28 | Initial release | - |

### Version Format

`MAJOR.MINOR`

- **MAJOR**: Breaking changes (pattern format changes, removed tokens)
- **MINOR**: Additions (new types, tags, clarifications, examples)

### Change Process

1. **Propose change**
   - Create GitHub issue/PR with rationale
   - Tag: `azure-naming-standard`

2. **Review**
   - Platform team reviews
   - Test with IaC modules
   - Update automation scripts

3. **Approval**
   - Requires 2 approvals from platform team
   - Breaking changes require VP approval

4. **Communication**
   - Announce in Slack/Teams
   - Update IaC module documentation
   - Send email to all cloud engineers

5. **Implementation**
   - Update this document
   - Update Terraform/Bicep modules
   - Update Azure Policies (audit mode first)
   - Update automation scripts

6. **Rollout**
   - Week 1-2: Audit mode, gather feedback
   - Week 3-4: Fix violations
   - Week 5+: Enable enforcement

### Backward Compatibility

**Promise:** Minor version updates will NOT break existing resources.

- New tags are recommended, not required (for minor versions)
- New types can be added without breaking existing patterns
- Breaking changes require MAJOR version bump

---

## Quick Reference Card

Print and share with your team:

```
═══════════════════════════════════════════════════════════════
   AZURE NAMING STANDARD v1.1 - QUICK REFERENCE
═══════════════════════════════════════════════════════════════

PATTERN: {type}-{org}-{proj}-{env}-{region}-{slice}-{seq}

EXAMPLES:
  rg-vrd-tmt-prd-eus2-app         (Resource Group)
  app-vrd-tmt-prd-eus2-01         (App Service)
  kv-vrd-tmt-prd-eus2-01          (Key Vault)
  stvrdtmtprdeus201               (Storage - no hyphens!)
  sqlsvr-vrd-tmt-prd-eus2         (SQL Server)

REQUIRED TAGS:
  Org, Project, Environment, Region, Owner, CostCenter

ENVIRONMENTS:
  prd, stg, dev, tst, sbx

REGIONS:
  eus, eus2, wus2, scus, neu, weu, uks, sea

SLICES:
  app, data, net, sec, ops

═══════════════════════════════════════════════════════════════
Full docs: /technical/azure-naming-standard.md
Automation: /scripts/azure-name-*.py
═══════════════════════════════════════════════════════════════
```

---

## Support & Feedback

**Questions?** Contact the platform team:
- Email: ops@verdaio.com
- Slack: #azure-platform

**Found an issue?** Submit a PR or issue to improve this standard.

**Need an exception?** Follow the [Exception Process](#exception-process).

---

**Document owner:** Platform Engineering Team
**Last reviewed:** 2025-11-05
**Next review:** 2025-12-05
