#!/bin/bash
# Database Backup Script for Azure PostgreSQL
# Creates a backup of the specified environment database

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
DB_SERVER_NAME="${PROJECT_NAME}-db"

# Parse arguments
ENVIRONMENT="${1:-staging}"

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo -e "${RED}Error: Environment must be 'staging' or 'production'${NC}"
    echo "Usage: $0 <staging|production>"
    exit 1
fi

DB_NAME="${PROJECT_NAME}_${ENVIRONMENT}"
BACKUP_NAME="manual-backup-$(date +%Y%m%d-%H%M%S)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Database Backup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Database: ${DB_NAME}${NC}"
echo -e "${BLUE}Backup name: ${BACKUP_NAME}${NC}"
echo ""

# Check if logged in to Azure
if ! az account show &> /dev/null; then
    echo -e "${RED}Not logged in to Azure. Run 'az login' first.${NC}"
    exit 1
fi

# Confirm before running in production
if [ "$ENVIRONMENT" == "production" ]; then
    echo -e "${YELLOW}Creating backup of PRODUCTION database${NC}"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Backup cancelled${NC}"
        exit 1
    fi
fi

# Create backup using Azure CLI
echo -e "${BLUE}Creating backup...${NC}"
echo ""

az postgres flexible-server backup create \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DB_SERVER_NAME" \
    --backup-name "$BACKUP_NAME"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo -e "${BLUE}Backup name: ${BACKUP_NAME}${NC}"
    echo ""
    echo -e "${BLUE}To restore from this backup, run:${NC}"
    echo -e "${BLUE}  bash scripts/restore-db-azure.sh ${ENVIRONMENT} ${BACKUP_NAME}${NC}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi

# List recent backups
echo ""
echo -e "${BLUE}Recent backups:${NC}"
az postgres flexible-server backup list \
    --resource-group "$RESOURCE_GROUP" \
    --server-name "$DB_SERVER_NAME" \
    --query "[?starts_with(name, 'manual-backup')].{Name:name, Time:backupTime}" \
    --output table
