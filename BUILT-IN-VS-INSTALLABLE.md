# Built-in vs. Installable Tools

**Created:** 2025-11-05
**Project:** saas202521

---

## 🎯 Critical Distinction

**Claude Code has TWO types of capabilities:**

1. **✅ Built-in Tools** - Always available, ZERO setup required
2. **📦 Installable Extensions** - Require one-time installation

**Common Mistake:** Thinking specialized Task agents need installation (they don't!)

---

## ✅ Built-in Tools (No Installation Required)

These are ALWAYS available in every Claude Code session:

### Core File Operations
- **Read** - Read any file
- **Write** - Create or overwrite files
- **Edit** - Make targeted edits to existing files
- **Glob** - Find files by pattern (e.g., `**/*.js`)
- **Grep** - Search file contents with regex

### System Operations
- **Bash** - Execute shell commands
- **BashOutput** - Monitor background processes
- **KillShell** - Terminate background processes

### Web & Research
- **WebSearch** - Search the web for current information
- **WebFetch** - Fetch and analyze web pages

### Specialized Agents (Task Tool)
- **Task tool with subagent_type parameter** - Launches specialized agents
  - `subagent_type: "Explore"` - Fast codebase exploration
  - `subagent_type: "Plan"` - Fast planning and analysis
  - `subagent_type: "general-purpose"` - Multi-step complex tasks
  - `subagent_type: "statusline-setup"` - Configure status line

**⚠️ IMPORTANT:** Task tool's specialized agents are **BUILT-IN**. They do NOT require installation!

### Interactive Tools
- **AskUserQuestion** - Ask user for input/decisions
- **TodoWrite** - Manage task lists

---

## 📦 Installable Extensions (Require Installation)

These require one-time setup before use:

### 1. Claude Skills (Anthropic Official)

**What:** Pre-built capabilities for document processing, testing, etc.

**Examples:**
- `xlsx` - Excel spreadsheet processing
- `docx` - Word document processing
- `pdf` - PDF document processing
- `skill-creator` - Create custom skills
- `webapp-testing` - Web application testing
- `mcp-builder` - Build MCP servers

**Installation:**
```bash
# Browse marketplace
/plugin marketplace add anthropics/skills

# Install specific skill
/plugin add xlsx

# Verify installation
# Check .claude/settings.local.json for "Skill(xlsx)"
```

**Documentation:** See `docs/recommended-claude-skills.md`

---

### 2. WSHobson Agents (Third-Party Framework Specialists)

**What:** Specialized agents for specific frameworks/languages

**Examples:**
- `full-stack-orchestration` - Coordinate full-stack development
- `python-development` - Python/FastAPI specialist
- `react-typescript` - React/TypeScript specialist
- `database-design` - Database architecture

**Installation:**
```bash
# Add marketplace
/plugin marketplace add wshobson/agents

# Install plugin
/plugin install full-stack-orchestration

# Verify installation
/plugin list
```

**Documentation:** See `docs/wshobson-agents-guide.md`

---

### 3. Claude Code Templates (Project Templates)

**What:** Pre-built agent templates for common roles

**Examples:**
- `frontend-developer` - Frontend specialist
- `backend-architect` - Backend architecture
- `code-reviewer` - Code review workflows
- `test-engineer` - Testing specialist

**Installation:**
```bash
# Install specific template
npx claude-code-templates@latest --agent development-team/frontend-developer

# Verify installation
# Check .claude/ directory created
```

**Documentation:** See `docs/claude-code-templates-guide.md`

---

### 4. MCP Servers (External Integrations)

**What:** Connect to external services (APIs, databases, analytics)

**Examples:**
- Socket MCP - Dependency security scanning
- Clarity MCP - Web analytics integration
- Figma MCP - Design system tokens
- Tableau MCP - BI dashboards

**Installation:** Varies by MCP server (see specific docs)

**Documentation:** See `docs/MCP-USAGE-GUIDE.md`

---

## 🔍 Quick Reference Table

| Capability | Type | Installation Required? | Example |
|------------|------|------------------------|---------|
| Read file | Built-in | ❌ No | `Read("path/to/file.js")` |
| Search code | Built-in | ❌ No | `Grep("pattern", "*.ts")` |
| Explore codebase | Built-in | ❌ No | `Task(subagent_type="Explore")` |
| Plan implementation | Built-in | ❌ No | `Task(subagent_type="Plan")` |
| Process Excel | Skill | ✅ Yes | Install: `/plugin add xlsx` |
| React specialist | WSHobson | ✅ Yes | Install: `/plugin install react-typescript` |
| Frontend dev | Template | ✅ Yes | Install: `npx claude-code-templates...` |
| External API | MCP | ✅ Yes | Install: (varies by MCP) |

---

## 🚀 When to Install Extensions

**For planning and documentation:** NO installation needed
- Virtual agents in CLAUDE.md use built-in tools only
- Can create roadmaps, PRDs, sprint plans immediately

**When ready to code:** Consider installing extensions
- Framework-specific work → WSHobson agents
- Document processing → Claude Skills
- External integrations → MCP servers
- Role-based workflows → Claude Code Templates

**Decision Matrix:**

| Your Situation | Recommended Extensions |
|----------------|------------------------|
| Solo MVP, planning only | None (built-ins sufficient) |
| Solo MVP, coding | Claude Code Templates (minimal) |
| Small team, planning | None (built-ins sufficient) |
| Small team, coding | Claude Code Templates + Skills |
| Enterprise, planning | None (built-ins sufficient) |
| Enterprise, full dev | All three tiers |
| Framework-specific | WSHobson + Claude Code Templates |
| External integrations | Relevant MCP servers |

---

## ✅ Verification: What Do I Have?

**Check built-in tools:** Try using them (they always work)
```bash
# These always work without installation
Read("CLAUDE.md")
Grep("TODO", "**/*.md")
Task(subagent_type="Explore", prompt="Find all components")
```

**Check installed Skills:**
```bash
# Look in settings file
cat .claude/settings.local.json
# Look for: "Skill(xlsx)", "Skill(docx)", etc.
```

**Check installed WSHobson plugins:**
```bash
/plugin list
# Shows all installed plugins
```

**Check installed Claude Code Templates:**
```bash
ls .claude/
# Templates create files in .claude/ directory
```

---

## 🎯 Key Takeaway

**If you see an error about "specialized agents need to be installed":**

1. **First:** Check if it's a Task tool agent (Explore/Plan) → These are built-in!
2. **Second:** Check if it's a Skill/plugin → These DO need installation
3. **Third:** Read the error carefully → It tells you what's missing

**Most common mistake:** Thinking Task tool's Explore/Plan agents need installation. They don't!

---

## 📚 See Also

- `SETUP-CHECKLIST.md` - Step-by-step installation guide
- `INTEGRATIONS.md` - Integration overview
- `docs/recommended-claude-skills.md` - Claude Skills catalog
- `docs/wshobson-agents-guide.md` - WSHobson agents guide
- `docs/MCP-USAGE-GUIDE.md` - MCP servers guide

---

## 📋 Quick Syntax Reference

**Need to invoke an agent? Here's the exact syntax:**

### Built-in Task Agents (Always Available)

```python
# Codebase exploration
Task(subagent_type="Explore", prompt="search for authentication code")

# Planning and analysis
Task(subagent_type="Plan", prompt="analyze testing strategy")

# Multi-step tasks
Task(subagent_type="general-purpose", prompt="implement feature X")
```

### Claude Skills (Install Once, Use Naturally)

```bash
# Installation
/plugin marketplace add anthropics/skills
/plugin add xlsx

# Usage (natural language after installation)
"Create a spreadsheet with this data..."
"Extract text from this PDF..."
```

### WSHobson Agents (Install Once, Invoke via Slash)

```bash
# Installation
/plugin marketplace add wshobson/agents
/plugin install full-stack-orchestration

# Usage
/full-stack-orchestration:feature-name
/python-development:implement-feature
```

### Claude Code Templates (Install As Needed)

```bash
# Installation
npx claude-code-templates@latest --agent development-team/frontend-developer
npx claude-code-templates@latest --command testing/generate-tests

# Usage (natural language after installation)
"Help me build the login component..."
```
