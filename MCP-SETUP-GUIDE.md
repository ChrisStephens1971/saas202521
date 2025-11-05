# MCP Setup Guide

**Want to enhance Claude with external service integrations?** This guide helps you set up MCP servers.

---

## 🎯 What Are MCPs?

MCP (Model Context Protocol) servers give Claude access to external services like:
- **GitHub** - Read repositories, create issues, manage PRs
- **PostgreSQL** - Query databases, manage schemas
- **Stripe** - Access payment data, create customers
- **Notion** - Read and write documentation
- **Filesystem** - Access local project files

---

## ⚡ Quick Setup (5 Minutes) - Recommended for Most Users

**This is the simplest approach:** All your projects share the same MCP tokens. Perfect for solo developers!

### Step 1: Get Your API Keys

**GitHub Token** (required for GitHub MCP):
1. Visit https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:org`, `read:user`
4. Copy the token (starts with `ghp_...`)

**PostgreSQL Connection** (if using Postgres MCP):
```
postgresql://username:password@localhost:5432/database_name
```

### Step 2: Configure Claude Desktop

**Windows:**
1. Open: `%APPDATA%\Claude\claude_desktop_config.json`
2. If file doesn't exist, create it

**Mac:**
1. Open: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. If file doesn't exist, create it

### Step 3: Copy Template Config

Copy the contents from `.mcp-config-template.json` in this project and paste into your Claude Desktop config file.

**Replace these placeholders:**
- `<your-github-token>` → Your actual GitHub token
- `saas202521` → `saas202521` (this project's name)
- `POSTGRES_CONNECTION_STRING` → Your database URL (if using)

**Example final config:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_abc123xyz..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\devop\\saas202521"]
    }
  }
}
```

### Step 4: Restart Claude Desktop

Close and reopen Claude Desktop app for changes to take effect.

### Step 5: Test It

Open Claude and try:
- "List my GitHub repositories"
- "What files are in this project?" (filesystem)
- "Query the users table" (if Postgres configured)

---

## 💡 Important: MCP Tokens Are for Development Only

**What MCP tokens are:**
- Used by Claude Desktop on your local machine to help you develop
- Help Claude read your repos, check Stripe data, query databases
- Only used during development, never in production

**What they're NOT:**
- NOT your application's production credentials
- NOT used by your deployed SaaS application
- NOT required for Claude to write code or create plans

**Most solo developers can use shared tokens** (the Quick Setup above) since these are just development helpers.

---

## 📦 Recommended MCPs for SaaS Projects

### Essential (Start Here)

| MCP | Why You Need It | Setup Difficulty |
|-----|-----------------|------------------|
| **GitHub** | Manage repos, issues, PRs from Claude | ⭐ Easy (just need token) |
| **Filesystem** | Let Claude read/write project files | ⭐ Easy (no API key needed) |
| **Memory** | Claude remembers context across sessions | ⭐ Easy (no API key needed) |

### Useful for Development

| MCP | Use Case | Setup Difficulty |
|-----|----------|------------------|
| **PostgreSQL** | Query database, manage schema | ⭐⭐ Medium (need connection string) |
| **Stripe** | Access payment data, create customers | ⭐⭐ Medium (need API key) |
| **Notion** | Read/write documentation | ⭐⭐ Medium (need integration token) |

### Advanced

| MCP | Use Case | Setup Difficulty |
|-----|----------|------------------|
| **Slack** | Send notifications, read channels | ⭐⭐⭐ Hard (OAuth setup) |
| **AWS** | Manage cloud resources | ⭐⭐⭐ Hard (IAM credentials) |

---

## 🔧 Configuration Examples

### GitHub Only (Minimal Setup)
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Full SaaS Stack
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost:5432/db"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_API_KEY": "sk_test_..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:devopsaas202521"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

---

## 🔒 Security Best Practices

### ⚠️ CRITICAL: Never Commit Secrets

```bash
# Add to .gitignore (already done in this template)
claude_desktop_config.json
*.env.local
.env
```

### Use Environment-Specific Tokens

**Development:**
- Use test/sandbox API keys
- Limit permissions to minimum needed
- Rotate regularly

**Production:**
- Use separate production keys
- Enable IP restrictions where possible
- Monitor usage

### Token Permissions

**GitHub Token - Minimum Required:**
- ✅ `repo` - Access repositories
- ✅ `read:org` - Read organization data
- ❌ `delete_repo` - Don't grant unless needed
- ❌ `admin:org` - Don't grant unless needed

**Stripe API Key:**
- ✅ Use `sk_test_...` for development
- ✅ Use `sk_live_...` only when ready for production
- ✅ Create restricted keys with limited permissions

---

## 🐛 Troubleshooting

### MCP Not Working

**Check:**
1. Restarted Claude Desktop after config change?
2. Config file syntax is valid JSON? (use JSONLint.com)
3. API keys are correct and not expired?
4. `npx` command works in terminal?

**Test npx directly:**
```bash
npx -y @modelcontextprotocol/server-github
```

### "Command not found" Error

**Install Node.js:**
- Download from https://nodejs.org/
- Restart terminal/Claude Desktop

### API Key Invalid

**GitHub:**
- Token expired? Create new one
- Correct scopes selected?
- Token copied completely?

**Stripe:**
- Using test key (`sk_test_...`) vs live key?
- Key has required permissions?

### Config File Not Loading

**Windows:**
```powershell
# Check if file exists
ls "$env:APPDATA\Claude\claude_desktop_config.json"

# Open in editor
notepad "$env:APPDATA\Claude\claude_desktop_config.json"
```

**Mac:**
```bash
# Check if file exists
ls ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Open in editor
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

---

## 📚 Additional Resources

**Official MCP Documentation:**
- https://modelcontextprotocol.io/

**MCP Server Registry:**
- https://github.com/modelcontextprotocol/servers

**Available MCP Servers:**
- GitHub: https://github.com/modelcontextprotocol/servers/tree/main/src/github
- PostgreSQL: https://github.com/modelcontextprotocol/servers/tree/main/src/postgres
- Filesystem: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
- Memory: https://github.com/modelcontextprotocol/servers/tree/main/src/memory

---

## ❓ FAQ

**Q: Do I need to install MCPs?**
A: No, they're optional. Projects work fine without them.

**Q: Which MCPs should I start with?**
A: GitHub + Filesystem are the most useful for development.

**Q: Are MCPs free?**
A: The MCP servers are free. You pay for the external services (GitHub is free, Stripe requires account, etc.)

**Q: Can I use MCPs in production?**
A: Yes, but use production API keys and follow security best practices.

**Q: Do MCPs slow down Claude?**
A: Only slightly when actively querying external services.

**Q: Can I uninstall an MCP?**
A: Yes, just remove it from claude_desktop_config.json and restart Claude Desktop.

---

## 🔧 Advanced: Per-Project Token Management (Optional)

**Most users don't need this.** The shared tokens approach (Quick Setup above) works great for solo developers.

**Use per-project tokens if:**
- Working with multiple clients (isolate client work)
- Team members need different access levels
- Some projects need production keys, others need test keys
- Security isolation is a priority

### Why Per-Project Tokens?

**Benefits:**
- ✅ Isolate tokens per project (different projects = different tokens)
- ✅ Easier to rotate tokens without affecting all projects
- ✅ Different GitHub accounts or permissions per project
- ✅ Tokens stay in `.env.local` (already gitignored)

**Trade-offs:**
- ⚠️ More setup per project
- ⚠️ Must load tokens when switching projects
- ⚠️ More maintenance (multiple token sets)

### Quick Setup

**Step 1: Add tokens to project's `.env.local`:**

```bash
# C:devopsaas202521\.env.local
GITHUB_TOKEN=ghp_project_specific_token_here
STRIPE_API_KEY=sk_test_project_specific_key_here
POSTGRES_CONNECTION_STRING=postgresql://user:pass@localhost:5432/dbname
```

**Step 2: Update Claude Desktop config to use environment variables:**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Note:** Use `${VAR_NAME}` syntax instead of hardcoded tokens.

**Step 3: Load tokens before opening Claude:**

**Windows:**
```powershell
cd C:\devop\.template-system\scripts
.\load-project-env.ps1 -ProjectName saas202521
```

**Mac/Linux:**
```bash
export $(cat .env.local | xargs)
```

**Step 4: Restart Claude Desktop**

### Switching Between Projects

```powershell
# Load different project's tokens
.\load-project-env.ps1 -ProjectName saas202513

# Restart Claude Desktop
# Now using saas202513's tokens
```

**Full documentation:** See `.config/PROJECT-TOKEN-MANAGEMENT.md` for complete guide, troubleshooting, and advanced options.

---

**Next Steps:**
1. Start with GitHub MCP (easiest, most useful)
2. Add Filesystem MCP for local file access
3. Add others as needed for your workflow

**Questions?** See `.mcp-config-template.json` for complete examples.
