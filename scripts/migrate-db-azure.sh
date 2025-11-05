#!/bin/bash
# Database Migration Script for Azure
# Runs database migrations in the specified environment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Project configuration
PROJECT_NAME="{{PROJECT_NAME}}"
RESOURCE_GROUP="${PROJECT_NAME}-rg"

# Parse arguments
ENVIRONMENT="${1:-staging}"

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo -e "${RED}Error: Environment must be 'staging' or 'production'${NC}"
    echo "Usage: $0 <staging|production>"
    exit 1
fi

# Set container app name
if [ "$ENVIRONMENT" == "production" ]; then
    CONTAINER_APP_NAME="${PROJECT_NAME}-prod"
else
    CONTAINER_APP_NAME="${PROJECT_NAME}-staging"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Running Database Migrations${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Container App: ${CONTAINER_APP_NAME}${NC}"
echo ""

# Check if logged in to Azure
if ! az account show &> /dev/null; then
    echo -e "${RED}Not logged in to Azure. Run 'az login' first.${NC}"
    exit 1
fi

# Check if container app exists
if ! az containerapp show --name "$CONTAINER_APP_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo -e "${RED}Container app '${CONTAINER_APP_NAME}' not found${NC}"
    exit 1
fi

# Detect project type
if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo -e "${GREEN}Detected Python project${NC}"
    MIGRATION_CMD="python manage.py migrate --no-input"
elif [ -f "package.json" ]; then
    echo -e "${GREEN}Detected Node.js project${NC}"
    if grep -q "prisma" package.json; then
        MIGRATION_CMD="npx prisma migrate deploy"
    elif grep -q "typeorm" package.json; then
        MIGRATION_CMD="npm run typeorm migration:run"
    else
        MIGRATION_CMD="npm run migrate"
    fi
else
    echo -e "${YELLOW}Warning: Could not detect project type${NC}"
    echo -e "${YELLOW}Attempting generic migration command...${NC}"
    MIGRATION_CMD="npm run migrate || python manage.py migrate"
fi

echo -e "${BLUE}Migration command: ${MIGRATION_CMD}${NC}"
echo ""

# Confirm before running
if [ "$ENVIRONMENT" == "production" ]; then
    echo -e "${YELLOW}⚠️  WARNING: You are about to run migrations in PRODUCTION${NC}"
    read -p "Are you sure? (yes/no) " -r
    echo
    if [[ ! $REPLY =~ ^yes$ ]]; then
        echo -e "${RED}Migration cancelled${NC}"
        exit 1
    fi
fi

# Run migrations
echo -e "${BLUE}Running migrations...${NC}"
echo ""

az containerapp exec \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --command "$MIGRATION_CMD"

EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations completed successfully${NC}"
else
    echo -e "${RED}✗ Migrations failed with exit code ${EXIT_CODE}${NC}"
    exit $EXIT_CODE
fi
