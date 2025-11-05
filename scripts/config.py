"""
Configuration and constants for template system automation.
"""

from pathlib import Path
from typing import Dict

# Paths
DEVOP_ROOT = Path(r'C:\devop')
TEMPLATE_SYSTEM_ROOT = DEVOP_ROOT / '.template-system'
TEMPLATES_ROOT = TEMPLATE_SYSTEM_ROOT / 'templates'
CONFIG_ROOT = DEVOP_ROOT / '.config'

# Templates
TEMPLATES = {
    'minimal': TEMPLATES_ROOT / 'saas-project-minimal',
    'standard': TEMPLATES_ROOT / 'saas-project',
    'enterprise': TEMPLATES_ROOT / 'saas-project-enterprise'
}

# Database paths
SQLITE_DB_PATH = CONFIG_ROOT / 'verdaio-dashboard.db'
JSON_DB_PATH = CONFIG_ROOT / 'projects-database.json'
PORT_REGISTRY_PATH = CONFIG_ROOT / 'port-registry.json'

# Port ranges
PORT_RANGES = {
    'frontend': {'start': 3001, 'end': 3099},
    'backend': {'start': 8001, 'end': 8099},
    'postgres': {'start': 5401, 'end': 5499},
    'redis': {'start': 6401, 'end': 6499},
    'mongo': {'start': 27001, 'end': 27099}
}

# GitHub settings
GITHUB_ORG = 'ChrisStephens1971'
GITHUB_DEFAULT_BRANCH = 'master'

# Placeholders that will be replaced
PLACEHOLDERS = [
    'PROJECT_NAME',
    'CREATION_DATE',
    'PROJECT_PATH',
    'PROJECT_PORT_FRONTEND',
    'PROJECT_PORT_BACKEND',
    'PROJECT_PORT_POSTGRES',
    'PROJECT_PORT_REDIS',
    'PROJECT_PORT_MONGO',
    'TEMPLATE_TYPE',
    'MULTI_TENANT_ENABLED',
    'TENANT_MODEL',
    'LINEAR_PROJECT_ID',
    'LINEAR_PROJECT_URL'
]

# File patterns to process for placeholder replacement
FILE_PATTERNS = ['*.md', '*.json', '*.yml', '*.yaml', '.env*', 'Dockerfile*', '*.sh', '*.bicep', '*.tf', '*.tfvars']

# Directories and patterns to ignore during template copy and validation
IGNORE_PATTERNS = [
    'node_modules',
    '__pycache__',
    '*.pyc',
    '.venv',
    'venv',
    'dist',
    'build',
    '.next',
    'out',
    '*.lock',
    'package-lock.json',
    'yarn.lock',
    'poetry.lock',
    '.git',
    '.DS_Store',
    'Thumbs.db'
]

# Tenant models
TENANT_MODELS = {
    'workspace': 'workspace-based',
    'subdomain': 'subdomain-based',
    'custom-domain': 'custom-domain',
    'hybrid': 'hybrid',
    'single': 'single-tenant'
}

def get_project_path(project_name: str) -> Path:
    """Get the full path for a project."""
    return DEVOP_ROOT / project_name

def get_template_path(template_type: str) -> Path:
    """Get the path to a template."""
    if template_type not in TEMPLATES:
        raise ValueError(f"Invalid template type: {template_type}")
    return TEMPLATES[template_type]
