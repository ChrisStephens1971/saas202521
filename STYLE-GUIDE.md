# Style Guide

**Project:** saas202521
**Last Updated:** 2025-11-05

---

## 🎯 Purpose

This guide ensures consistency across documentation, code, and file naming. **Follow these conventions strictly** to maintain professional quality and searchability.

---

## 📂 File Naming Conventions

### Documentation Files

**Rule:** Naming varies by directory to optimize for different use cases.

| Directory | Convention | Example | Why |
|-----------|-----------|---------|-----|
| `docs/quick-reference/` | **UPPER-KEBAB** | `API-ENDPOINTS.md`<br>`DATABASE-SCHEMA.md` | Easy to scan, stands out in listings |
| `docs/guides/` | **Title-Case** | `Solo-Founder-Guide.md`<br>`Validation-Checklist.md` | Professional, readable |
| `product/`, `sprints/`, `technical/` | **kebab-case** | `sprint-01-initial.md`<br>`prd-user-authentication.md` | Consistent with templates |
| `business/` | **Title-Case** | `Q1-2025-OKRs.md`<br>`Metrics-Dashboard.md` | Business-appropriate |
| `meetings/` | **Date-First** | `2025-01-15-standup.md`<br>`2025-Q1-retrospective.md` | Chronological sorting |

### Generated Output Files

**Rule:** Match the purpose, use UPPER for investor/external docs.

| Type | Convention | Example | Why |
|------|-----------|---------|-----|
| Investor docs | **NN-UPPER-KEBAB.docx** | `01-EXECUTIVE-SUMMARY.docx`<br>`02-PITCH-DECK.docx` | Professional, numbered order |
| Reports | **UPPER-KEBAB-Date.pdf** | `MONTHLY-REPORT-2025-01.pdf` | Easy to identify |
| Exports | **kebab-case-timestamp** | `user-data-20250115.csv` | Programmatic, sortable |

**Example workflow:**
```bash
node scripts/create-pitch-deck.js
# → Outputs: fundraising/02-PITCH-DECK.docx
# ✅ Commit this file (see .gitignore)
```

### Script Files

**Rule:** Always lowercase with clear purpose.

| OS | Convention | Example |
|----|-----------|---------|
| **Windows** | `kebab-case.ps1` or `.bat` | `setup-environment.ps1`<br>`deploy-staging.bat` |
| **Mac/Linux** | `kebab-case.sh` | `setup-environment.sh`<br>`deploy-staging.sh` |
| **Universal** | `kebab-case.js` or `.py` | `create-pitch-deck.js`<br>`migrate-database.py` |

### Code Files

| Language | Convention | Example |
|----------|-----------|---------|
| **JavaScript/TypeScript** | `camelCase.js` | `userController.js`<br>`authService.ts` |
| **Components (React)** | `PascalCase.jsx` | `UserProfile.jsx`<br>`LoginForm.tsx` |
| **Python** | `snake_case.py` | `user_controller.py`<br>`auth_service.py` |
| **CSS/SCSS** | `kebab-case.css` | `user-profile.css`<br>`login-form.scss` |

---

## 📝 Document Structure

### Markdown Formatting

**Headers:**
```markdown
# H1: Document Title (once per file)
## H2: Major Sections
### H3: Subsections
#### H4: Details (use sparingly)
```

**Indentation:** 2 spaces for all nested structures (lists, code blocks, JSON, YAML).

**Example:**
```markdown
## Installation

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure environment
   - Copy `.env.example` to `.env.local`
   - Update values:
     ```bash
     DATABASE_URL=postgresql://localhost:5432/mydb
     REDIS_URL=redis://localhost:6379
     ```

3. Start services
   ```bash
   docker compose up -d
   ```
```

### Code Blocks

**Always specify language:**
```markdown
```bash
docker compose up
```  # ✅ Good

```
docker compose up
```  # ❌ Bad (no syntax highlighting)
```

**Common languages:** `bash`, `javascript`, `typescript`, `python`, `json`, `yaml`, `sql`, `markdown`

---

## 💻 Code Style

### JavaScript/TypeScript

**Naming:**
- **Variables/Functions:** `camelCase`
- **Classes/Components:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Private methods:** `_prefixedCamelCase` (optional)

**Examples:**
```javascript
// ✅ Good
const userName = 'John';
const MAX_RETRIES = 3;

class UserService {
  async fetchUserData(userId) {
    // ...
  }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad
const UserName = 'John';  // Should be camelCase
const max_retries = 3;    // Should be UPPER_SNAKE_CASE
function CalculateTotal() {}  // Should be camelCase
```

**Indentation:** 2 spaces (no tabs)

**Quotes:** Single quotes for strings (except JSON)
```javascript
const message = 'Hello world';  // ✅
const message = "Hello world";  // ❌
```

**Full style:** See `C:\devop\coding_standards.md`

### Python

**Naming:**
- **Variables/Functions:** `snake_case`
- **Classes:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

**Examples:**
```python
# ✅ Good
user_name = 'John'
MAX_RETRIES = 3

class UserService:
    def fetch_user_data(self, user_id):
        # ...
        pass

def calculate_total(items):
    return sum(item['price'] for item in items)

# ❌ Bad
userName = 'John'  # Should be snake_case
max_retries = 3    # Should be UPPER_SNAKE_CASE
class userService: pass  # Should be PascalCase
```

**Indentation:** 4 spaces for Python (PEP 8)

**Full style:** See `C:\devop\coding_standards.md`

### JSON/YAML

**Indentation:** 2 spaces

**JSON:**
```json
{
  "name": "saas202521",
  "version": "1.0.0",
  "scripts": {
    "dev": "npm run dev:backend & npm run dev:frontend",
    "test": "jest"
  }
}
```

**YAML:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    ports:
      - "5421:5432"
    environment:
      POSTGRES_DB: mydb
```

---

## 🗂️ Directory Organization

### Keep It Organized

**File Limits:**
- Max **10-15 files** per directory before creating subdirectories
- Use descriptive subdirectory names

**Example:**
```
product/
├── PRDs/                    # All PRDs in one folder
│   ├── prd-authentication.md
│   ├── prd-dashboard.md
│   └── prd-billing.md
├── roadmap/
│   ├── 2025-Q1-roadmap.md
│   └── 2025-Q2-roadmap.md
└── research/
    ├── user-interviews.md
    └── competitor-analysis.md
```

**Template Files:**
- Always suffix with `-template.md`
- Examples prefix with `example-`

---

## 📋 Writing Style

### Documentation

**Tone:** Professional, direct, technical

**Format:**
- **Headers:** Use sentence case: "Getting started" not "Getting Started"
- **Lists:** Start with capital letter, no period unless multiple sentences
- **Commands:** Always in code blocks with proper syntax highlighting
- **File paths:** Use code formatting: `scripts/setup.sh`

**Good Example:**
```markdown
## Starting the application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the database:
   ```bash
   docker compose up -d postgres
   ```

3. Run migrations:
   ```bash
   npm run migrate
   ```
```

**Bad Example:**
```markdown
## Starting The Application

- install dependencies (npm install)
- start database (use docker)
- run migrations
```

### Git Commits

**Format:** `<type>: <description>`

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `test:` Adding or updating tests
- `chore:` Updating build tasks, package manager configs, etc.

**Examples:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify user validation logic"
```

---

## 🎨 Formatting Checklist

### Before Committing

- [ ] File named correctly for its directory
- [ ] Markdown headers use proper hierarchy (H1 → H2 → H3)
- [ ] Code blocks have language specified
- [ ] Indentation is 2 spaces (4 for Python)
- [ ] No trailing whitespace
- [ ] Links are valid and relative where appropriate
- [ ] Examples are concrete and runnable

### Tools

**Linting:**
```bash
# JavaScript/TypeScript
npm run lint

# Markdown
npx markdownlint-cli2 "**/*.md"

# Python
pylint *.py
```

**Formatting:**
```bash
# JavaScript/TypeScript
npm run format

# Python
black *.py

# Markdown (Prettier)
npx prettier --write "**/*.md"
```

---

## 📊 Examples by File Type

### Quick Reference Doc

**Filename:** `docs/quick-reference/DOCKER-COMMANDS.md`

```markdown
# Docker Commands

Quick reference for common Docker operations.

## Starting Services

```bash
docker compose up -d
```

## Viewing Logs

```bash
docker compose logs -f postgres
```

## Stopping Services

```bash
docker compose down
```
```

### Guide Document

**Filename:** `docs/guides/Database-Migration-Guide.md`

```markdown
# Database Migration Guide

This guide explains how to create and run database migrations.

## Creating a migration

1. Generate migration file:
   ```bash
   npm run migrate:create add_users_table
   ```

2. Edit the generated file in `migrations/`

3. Test the migration:
   ```bash
   npm run migrate:test
   ```
```

### Template File

**Filename:** `product/prd-template.md`

```markdown
# PRD: [Feature Name]

**Author:** [Your Name]
**Date:** [YYYY-MM-DD]
**Status:** Draft

## Problem Statement

[What problem are we solving?]

## Proposed Solution

[How will we solve it?]

## Success Metrics

- Metric 1
- Metric 2
```

---

## 🔗 Related Resources

- **Coding Standards:** `C:\devop\coding_standards.md` (comprehensive)
- **Development Guide:** `DEVELOPMENT-GUIDE.md` (tooling, docker)
- **Testing Checklist:** `TESTING-CHECKLIST.md` (validation)
- **Git Workflow:** `.github/CONTRIBUTING.md` (if exists)

---

## 📞 Questions?

If you're unsure about a style choice:

1. Check examples in this guide
2. Look at existing files in the same directory
3. Consult `C:\devop\coding_standards.md` for code
4. Ask your team lead
5. Use Claude Code (it knows these conventions)

---

**Remember:** Consistency matters more than perfection. When in doubt, follow existing patterns.

**Version:** 1.0
**Last Updated:** 2025-11-05
