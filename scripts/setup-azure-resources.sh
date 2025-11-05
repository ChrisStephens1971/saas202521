#!/bin/bash
# Azure Resource Setup Script
# Provisions all required Azure resources for {{PROJECT_NAME}}

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_NAME="{{PROJECT_NAME}}"
RESOURCE_GROUP="${PROJECT_NAME}-rg"
LOCATION="eastus"

# Print with color
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}${1}${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Install from: https://aka.ms/azure-cli"
        exit 1
    fi
    print_success "Azure CLI installed"

    # Check if logged in
    if ! az account show &> /dev/null; then
        print_warning "Not logged in to Azure"
        print_info "Running 'az login'..."
        az login
    fi
    print_success "Logged in to Azure"

    # Show current subscription
    SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
    SUBSCRIPTION_ID=$(az account show --query id -o tsv)
    print_info "Current subscription: ${SUBSCRIPTION_NAME} (${SUBSCRIPTION_ID})"

    read -p "Is this the correct subscription? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Please run 'az account set --subscription <subscription-id>' first"
        exit 1
    fi
}

# Create resource group
create_resource_group() {
    print_header "Creating Resource Group"

    if az group exists --name "$RESOURCE_GROUP" | grep -q "true"; then
        print_warning "Resource group '$RESOURCE_GROUP' already exists"
    else
        az group create \
            --name "$RESOURCE_GROUP" \
            --location "$LOCATION" \
            --tags Project="$PROJECT_NAME" ManagedBy=Script
        print_success "Resource group created: $RESOURCE_GROUP"
    fi
}

# Create container registry
create_container_registry() {
    print_header "Creating Azure Container Registry"

    REGISTRY_NAME="${PROJECT_NAME//[-_]/}acr"

    if az acr show --name "$REGISTRY_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
        print_warning "Container registry '$REGISTRY_NAME' already exists"
    else
        az acr create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$REGISTRY_NAME" \
            --sku Basic \
            --admin-enabled true
        print_success "Container registry created: $REGISTRY_NAME"
    fi

    # Get credentials
    REGISTRY_USERNAME=$(az acr credential show --name "$REGISTRY_NAME" --query username -o tsv)
    REGISTRY_PASSWORD=$(az acr credential show --name "$REGISTRY_NAME" --query "passwords[0].value" -o tsv)

    print_info "Registry: ${REGISTRY_NAME}.azurecr.io"
    print_info "Username: $REGISTRY_USERNAME"
}

# Create PostgreSQL server
create_postgresql() {
    print_header "Creating PostgreSQL Flexible Server"

    DB_SERVER_NAME="${PROJECT_NAME}-db"

    # Generate admin password if not provided
    if [ -z "$DB_ADMIN_PASSWORD" ]; then
        DB_ADMIN_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
        print_info "Generated database admin password"
    fi

    if az postgres flexible-server show --resource-group "$RESOURCE_GROUP" --name "$DB_SERVER_NAME" &> /dev/null; then
        print_warning "PostgreSQL server '$DB_SERVER_NAME' already exists"
    else
        print_info "Creating PostgreSQL server (this may take 5-10 minutes)..."
        az postgres flexible-server create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$DB_SERVER_NAME" \
            --location "$LOCATION" \
            --admin-user dbadmin \
            --admin-password "$DB_ADMIN_PASSWORD" \
            --sku-name Standard_B1ms \
            --tier Burstable \
            --storage-size 32 \
            --version 16 \
            --public-access 0.0.0.0 \
            --yes
        print_success "PostgreSQL server created: $DB_SERVER_NAME"
    fi

    # Create databases
    for ENV in staging production; do
        DB_NAME="${PROJECT_NAME}_${ENV}"
        if az postgres flexible-server db show --resource-group "$RESOURCE_GROUP" --server-name "$DB_SERVER_NAME" --database-name "$DB_NAME" &> /dev/null; then
            print_warning "Database '$DB_NAME' already exists"
        else
            az postgres flexible-server db create \
                --resource-group "$RESOURCE_GROUP" \
                --server-name "$DB_SERVER_NAME" \
                --database-name "$DB_NAME"
            print_success "Database created: $DB_NAME"
        fi
    done
}

# Create Redis cache
create_redis() {
    print_header "Creating Azure Cache for Redis"

    REDIS_NAME="${PROJECT_NAME}-redis"

    if az redis show --resource-group "$RESOURCE_GROUP" --name "$REDIS_NAME" &> /dev/null; then
        print_warning "Redis cache '$REDIS_NAME' already exists"
    else
        print_info "Creating Redis cache (this may take 10-15 minutes)..."
        az redis create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$REDIS_NAME" \
            --location "$LOCATION" \
            --sku Basic \
            --vm-size c0 \
            --enable-non-ssl-port false \
            --minimum-tls-version 1.2
        print_success "Redis cache created: $REDIS_NAME"
    fi
}

# Create Key Vault
create_keyvault() {
    print_header "Creating Azure Key Vault"

    KEYVAULT_NAME="${PROJECT_NAME}-kv"

    if az keyvault show --name "$KEYVAULT_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
        print_warning "Key Vault '$KEYVAULT_NAME' already exists"
    else
        az keyvault create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$KEYVAULT_NAME" \
            --location "$LOCATION" \
            --enable-soft-delete true \
            --soft-delete-retention-days 90
        print_success "Key Vault created: $KEYVAULT_NAME"
    fi

    # Store database credentials
    az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "db-admin-username" --value "dbadmin" > /dev/null
    az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "db-admin-password" --value "$DB_ADMIN_PASSWORD" > /dev/null

    # Store connection strings
    DB_HOST="${DB_SERVER_NAME}.postgres.database.azure.com"
    for ENV in staging production; do
        DB_URL="postgresql://dbadmin:${DB_ADMIN_PASSWORD}@${DB_HOST}:5432/${PROJECT_NAME}_${ENV}?sslmode=require"
        az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "database-url-${ENV}" --value "$DB_URL" > /dev/null
    done

    print_success "Secrets stored in Key Vault"
}

# Create storage account
create_storage() {
    print_header "Creating Storage Account"

    STORAGE_NAME="${PROJECT_NAME//[-_]/}storage"

    if az storage account show --name "$STORAGE_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
        print_warning "Storage account '$STORAGE_NAME' already exists"
    else
        az storage account create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$STORAGE_NAME" \
            --location "$LOCATION" \
            --sku Standard_LRS \
            --kind StorageV2 \
            --min-tls-version TLS1_2 \
            --allow-blob-public-access false
        print_success "Storage account created: $STORAGE_NAME"
    fi

    # Create containers
    STORAGE_KEY=$(az storage account keys list --resource-group "$RESOURCE_GROUP" --account-name "$STORAGE_NAME" --query "[0].value" -o tsv)
    for CONTAINER in media static backups; do
        az storage container create --name "$CONTAINER" --account-name "$STORAGE_NAME" --account-key "$STORAGE_KEY" --public-access off > /dev/null || true
    done
    print_success "Storage containers created"
}

# Create Container Apps environment
create_container_apps_env() {
    print_header "Creating Container Apps Environment"

    ENV_NAME="${PROJECT_NAME}-env"

    if az containerapp env show --name "$ENV_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
        print_warning "Container Apps environment '$ENV_NAME' already exists"
    else
        az containerapp env create \
            --name "$ENV_NAME" \
            --resource-group "$RESOURCE_GROUP" \
            --location "$LOCATION"
        print_success "Container Apps environment created: $ENV_NAME"
    fi
}

# Create service principal for GitHub Actions
create_service_principal() {
    print_header "Creating Service Principal for GitHub Actions"

    SP_NAME="${PROJECT_NAME}-github-actions"
    SUBSCRIPTION_ID=$(az account show --query id -o tsv)

    # Check if SP exists
    SP_APP_ID=$(az ad sp list --display-name "$SP_NAME" --query "[0].appId" -o tsv)

    if [ -n "$SP_APP_ID" ]; then
        print_warning "Service Principal '$SP_NAME' already exists"
    else
        print_info "Creating service principal..."
        SP_OUTPUT=$(az ad sp create-for-rbac \
            --name "$SP_NAME" \
            --role contributor \
            --scopes "/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}" \
            --sdk-auth)

        print_success "Service Principal created"
        echo ""
        print_info "Add this as AZURE_CREDENTIALS secret in GitHub:"
        echo "$SP_OUTPUT"
    fi
}

# Print GitHub Secrets summary
print_github_secrets() {
    print_header "GitHub Secrets Configuration"

    REGISTRY_NAME="${PROJECT_NAME//[-_]/}acr"
    REGISTRY_USERNAME=$(az acr credential show --name "$REGISTRY_NAME" --query username -o tsv)
    REGISTRY_PASSWORD=$(az acr credential show --name "$REGISTRY_NAME" --query "passwords[0].value" -o tsv)

    KEYVAULT_NAME="${PROJECT_NAME}-kv"
    DB_URL_STAGING=$(az keyvault secret show --vault-name "$KEYVAULT_NAME" --name "database-url-staging" --query value -o tsv)
    DB_URL_PRODUCTION=$(az keyvault secret show --vault-name "$KEYVAULT_NAME" --name "database-url-production" --query value -o tsv)

    echo ""
    print_info "Add these secrets to GitHub repository settings:"
    echo ""
    echo "AZURE_REGISTRY_NAME=${REGISTRY_NAME}"
    echo "AZURE_REGISTRY_USERNAME=${REGISTRY_USERNAME}"
    echo "AZURE_REGISTRY_PASSWORD=${REGISTRY_PASSWORD}"
    echo ""
    echo "DATABASE_URL_STAGING=${DB_URL_STAGING}"
    echo "DATABASE_URL_PRODUCTION=${DB_URL_PRODUCTION}"
    echo ""
    print_info "GitHub repository: https://github.com/ChrisStephens1971/${PROJECT_NAME}/settings/secrets/actions"
}

# Main execution
main() {
    print_header "Azure Resource Setup for ${PROJECT_NAME}"

    check_prerequisites
    create_resource_group
    create_container_registry
    create_postgresql
    create_redis
    create_keyvault
    create_storage
    create_container_apps_env
    create_service_principal
    print_github_secrets

    print_header "Setup Complete!"
    print_success "All Azure resources have been provisioned"
    print_info "Next steps:"
    echo "  1. Add secrets to GitHub (see above)"
    echo "  2. Push code to 'develop' branch to deploy to staging"
    echo "  3. Create release tag to deploy to production"
}

# Run main function
main
