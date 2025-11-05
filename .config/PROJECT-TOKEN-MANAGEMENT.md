# Project Token Management Guide

**Problem:** MCP tokens are stored in global Claude Desktop config, making it hard to isolate tokens per project.

**Solution:** Store tokens per project and load them dynamically.

---

## ⚠️ Do You Need This Guide?

**Most solo developers DON'T need per-project tokens.** The simple shared tokens approach (see `MCP-SETUP-GUIDE.md`) works great for most use cases.

### You DON'T Need This If:

- ✅ You're a solo developer
- ✅ All your projects use the same GitHub account
- ✅ You're okay with all projects sharing the same tokens
- ✅ You want the simplest setup

**→ Use the Quick Setup in `MCP-SETUP-GUIDE.md` instead!**

### You NEED This If:

- ⚠️ Working with multiple clients (isolate client work)
- ⚠️ Team members need different access levels
- ⚠️ Different projects need different GitHub accounts
- ⚠️ Some projects use production keys, others use test keys
- ⚠️ Security isolation is a priority
- ⚠️ Compliance requirements mandate per-project credentials

**→ Continue reading this guide for per-project token setup.**

---

## 🎯 Recommended Approach: Project .env.local + System Env Vars

**Best for:** Most users, simple setup, secure

### How It Works

1. **Store tokens in project's `.env.local`** (already gitignored)
2. **Load into system environment variables** when working on that project
3. **Claude Desktop MCP config references env vars** (not hardcoded tokens)
4. **Switch projects** by loading different env vars

---

## 🚀 Quick Setup

### Step 1: Add Tokens to Project

```bash
# C:\devop\saas202521\.env.local
GITHUB_TOKEN=ghp_your_github_token_here
POSTGRES_CONNECTION_STRING=postgresql://user:pass@localhost:5432/dbname
STRIPE_API_KEY=sk_test_your_stripe_key_here
```

### Step 2: Update Claude Desktop Config (One-Time)

**Location:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_CONNECTION_STRING}"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_API_KEY": "${STRIPE_API_KEY}"
      }
    }
  }
}
```

**Key:** Use `${VAR_NAME}` syntax to reference environment variables.

### Step 3: Load Project Tokens

**Windows:**
```powershell
cd C:\devop\.template-system\scripts

# Load tokens for specific project
.\load-project-env.ps1 -ProjectName saas202521

# Restart Claude Desktop
```

**Mac/Linux:**
```bash
# Load .env.local into environment
export $(cat .env.local | xargs)

# Restart Claude Desktop
```

---

## 📋 All Available Methods

### Method 1: .env.local + System Env (Recommended)

**Pros:**
- ✅ Tokens stay in project directory
- ✅ Already gitignored (.env.local)
- ✅ Simple to switch between projects
- ✅ Works with existing tooling

**Cons:**
- ⚠️ Must load env vars before starting Claude
- ⚠️ Need to restart Claude when switching projects

**Setup Time:** 5 minutes

**Script:** `scripts/load-project-env.ps1` (Windows) or `export` command (Mac/Linux)

---

### Method 2: Centralized Token Store

**Pros:**
- ✅ Single source of truth for all project tokens
- ✅ Easy to manage multiple projects
- ✅ Can list/clear tokens easily

**Cons:**
- ⚠️ Extra file to secure (`.template-system/config/project-tokens.json`)
- ⚠️ Must remember to add to .gitignore

**Setup Time:** 10 minutes

**Usage:**

```powershell
cd C:\devop\.template-system\scripts

# Save tokens
.\manage-project-tokens.ps1 save -ProjectName saas202521 -Service github -Token ghp_...
.\manage-project-tokens.ps1 save -ProjectName saas202521 -Service stripe -Token sk_test_...

# Load tokens for project
.\manage-project-tokens.ps1 load -ProjectName saas202521

# List all stored tokens (masked)
.\manage-project-tokens.ps1 list

# Clear tokens for project
.\manage-project-tokens.ps1 clear -ProjectName saas202521
```

---

### Method 3: Per-Project MCP Config Files

**Pros:**
- ✅ Complete isolation per project
- ✅ Different MCPs per project

**Cons:**
- ⚠️ Must swap config file when switching projects
- ⚠️ More manual process
- ⚠️ Risk of forgetting to switch back

**Setup Time:** 15 minutes

**Usage:**

1. Create `.mcp-config.json` in project root
2. Add project-specific tokens
3. Run script to swap configs:

```powershell
# Switch to project's config
.\scripts\start-claude-with-config.ps1 -ProjectName saas202521

# Restore original config
Copy-Item "$env:APPDATA\Claude\claude_desktop_config.json.backup" "$env:APPDATA\Claude\claude_desktop_config.json"
```

---

## 🔒 Security Best Practices

### 1. Never Commit Tokens

**Ensure these are in .gitignore:**
```gitignore
.env.local
.env
*.env.local
.mcp-config.json
project-tokens.json
claude_desktop_config.json
```

### 2. Use Environment-Specific Tokens

| Environment | Token Type | Example |
|-------------|------------|---------|
| **Development** | Test keys | `sk_test_...` (Stripe) |
| **Staging** | Staging keys | Separate tokens |
| **Production** | Production keys | Restricted permissions |

### 3. Rotate Tokens Regularly

**Recommended rotation schedule:**
- Development tokens: Every 6 months
- Staging tokens: Every 3 months
- Production tokens: Every 1 month

### 4. Use Restricted Permissions

**GitHub Token:**
- ✅ `repo` (read/write repositories)
- ✅ `read:org` (read organization data)
- ❌ `delete_repo` (don't grant unless needed)
- ❌ `admin:org` (don't grant unless needed)

**Stripe API Key:**
- ✅ Use restricted keys with limited permissions
- ✅ Use `sk_test_...` for development
- ❌ Don't use unrestricted live keys

---

## 🔄 Workflow: Switching Between Projects

### Using .env.local Method

```powershell
# 1. Close Claude Desktop
# 2. Load new project's tokens
cd C:\devop\.template-system\scripts
.\load-project-env.ps1 -ProjectName saas202513

# 3. Start Claude Desktop
# MCPs now use saas202513's tokens

# 4. Switch to another project
.\load-project-env.ps1 -ProjectName saas202514
# Restart Claude Desktop
```

### Using Token Store Method

```powershell
# 1. Close Claude Desktop
# 2. Load different project's tokens
cd C:\devop\.template-system\scripts
.\manage-project-tokens.ps1 load -ProjectName saas202514

# 3. Start Claude Desktop
# MCPs now use saas202514's tokens
```

---

## 🧪 Testing Token Setup

### Verify Tokens Are Loaded

**Windows:**
```powershell
# Check if env var is set
echo $env:GITHUB_TOKEN
echo $env:STRIPE_API_KEY
```

**Mac/Linux:**
```bash
echo $GITHUB_TOKEN
echo $STRIPE_API_KEY
```

### Test MCP Connection

**In Claude Desktop:**
```
# Test GitHub MCP
"List my GitHub repositories"

# Test Stripe MCP (if configured)
"Show my Stripe customers"

# Test PostgreSQL MCP (if configured)
"Query the users table"
```

**If working:** You'll get real data from your services

**If not working:**
- Check env vars are set: `echo $env:GITHUB_TOKEN`
- Restart Claude Desktop
- Check Claude Desktop config uses `${VAR_NAME}` syntax
- Verify token is valid (not expired)

---

## 📊 Comparison Table

| Method | Setup | Switching | Security | Maintenance |
|--------|-------|-----------|----------|-------------|
| **.env.local + Env Vars** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ High | ⭐⭐⭐ Low |
| **Token Store** | ⭐⭐ Medium | ⭐⭐⭐ Easy | ⭐⭐ Medium | ⭐⭐ Medium |
| **Per-Project Configs** | ⭐⭐⭐ Hard | ⭐ Hard | ⭐⭐⭐ High | ⭐ High |

**Recommendation:** Use **.env.local + Env Vars** for most projects.

---

## 🆘 Troubleshooting

### MCP Can't Read Environment Variable

**Problem:** MCP says token is invalid or missing

**Solution:**
1. Verify env var is set in system (not just terminal)
2. Use User or System level env vars, not Process level
3. Restart Claude Desktop after setting env vars

**Windows:**
```powershell
# Set at User level (persists)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_...', 'User')
```

### Token Works in Terminal, Not in Claude

**Problem:** Token works with `gh` or `stripe` CLI, but not in Claude Desktop

**Solution:** Claude Desktop needs User-level env vars, not just terminal session vars.

**Fix:**
```powershell
# Load into User environment (not just session)
.\load-project-env.ps1 -ProjectName saas202521
```

### Wrong Project's Tokens Being Used

**Problem:** MCP is using tokens from previous project

**Solution:**
1. Load correct project's env vars
2. Restart Claude Desktop completely (quit, not just close window)
3. Verify with `echo $env:GITHUB_TOKEN`

### Tokens Committed to Git

**Problem:** Accidentally committed `.env.local` or tokens

**Solution:**
```bash
# Remove from git history
git rm --cached .env.local
git commit -m "Remove accidentally committed tokens"

# Rotate the exposed tokens immediately
# GitHub: https://github.com/settings/tokens
# Stripe: https://dashboard.stripe.com/apikeys

# Ensure .gitignore includes .env.local
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "Add .env.local to gitignore"
```

---

## 📝 Setup Checklist

**For each new project:**

- [ ] Create `.env.local` in project root
- [ ] Add tokens to `.env.local`
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Update Claude Desktop config to use `${VAR_NAME}` syntax (one-time)
- [ ] Test token loading with `load-project-env.ps1`
- [ ] Restart Claude Desktop
- [ ] Test MCP connection: "List my GitHub repositories"
- [ ] Document which MCPs are configured for this project

---

## 🔗 Related Files

**Scripts:**
- `C:\devop\.template-system\scripts\load-project-env.ps1` - Load .env.local into system
- `C:\devop\.template-system\scripts\manage-project-tokens.ps1` - Centralized token store

**Configuration:**
- `C:devopsaas202521\.env.local` - Project tokens (gitignored)
- `%APPDATA%\Claude\claude_desktop_config.json` - Claude Desktop MCP config

**Documentation:**
- `MCP-SETUP-GUIDE.md` - Complete MCP setup guide
- `.mcp-config-template.json` - Sample MCP configuration

---

## 💡 Pro Tips

**Tip 1: Create alias for loading tokens**

```powershell
# Add to PowerShell profile
function Load-ProjectEnv {
    param([string]$Project)
    & "C:\devop\.template-system\scripts\load-project-env.ps1" -ProjectName $Project
}

# Usage:
Load-ProjectEnv saas202512
```

**Tip 2: Use different tokens for different projects**

Even if using the same service (e.g., GitHub), consider creating separate tokens per project for better security and tracking.

**Tip 3: Document your MCP setup**

Add to project's README.md:

```markdown
## MCP Configuration

**MCPs Used:**
- GitHub (repository management)
- Stripe (payment processing)
- PostgreSQL (database queries)

**Setup:**
1. Add tokens to `.env.local` (see `.env.example`)
2. Run: `.\scripts\load-project-env.ps1 -ProjectName saas202521`
3. Restart Claude Desktop
```

---

**Document Version:** 1.0
**Last Updated:** 2025-11-05
