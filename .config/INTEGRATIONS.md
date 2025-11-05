# Integration Guide

**Project:** saas202521
**Template Version:** 2.0

This document covers optional external tool integrations for your SaaS project.

---

## 🎯 Quick Answer

**Your templates work standalone - no integrations required!**

When you're ready to code, consider **Claude Code Templates** for technical implementation.

Everything else is optional and situational.

---

## Integration Overview

| What | When | Priority |
|------|------|----------|
| **Built-in Templates** | Always available | ✅ Core |
| **Claude Code Templates** | When coding | ⭐ Recommended |
| **Claude Skills** | Working with documents | Optional |

---

## 🚀 Tier 1: Claude Code Templates (Recommended)

**What it is:** 163 specialized development agents and 210 commands for technical implementation.

**When to use:** When you're ready to start coding and need technical assistance.

**Why recommended:** Purpose-built for development tasks, comprehensive coverage, well-documented.

### Quick Setup
```bash
# Install on-demand as needed
npx claude-code-templates@latest --agent development-team/frontend-developer
npx claude-code-templates@latest --agent development-team/backend-architect
npx claude-code-templates@latest --command testing/generate-tests
```

### Common Use Cases
- **Frontend:** `--agent development-team/frontend-developer`
- **Backend APIs:** `--agent development-team/backend-architect`
- **Full-stack:** `--agent development-team/fullstack-developer`
- **Testing:** `--command testing/generate-tests`
- **Security:** `--agent security/security-auditor`
- **Database:** `--agent database/database-architect`
- **DevOps:** `--agent devops-infrastructure/devops-engineer`

### Full Documentation
See `.config/claude-code-templates-guide.md` for complete reference.

---

## 📦 Tier 2: Optional Tools

### Claude Skills

**What:** Specialized capabilities for documents and specific tasks.

**When:** Working with PDFs, spreadsheets, presentations, or specialized workflows.

**Setup:**
```bash
/plugin marketplace add anthropics/skills
```

**Available:**
- `pdf` - PDF creation, extraction, form filling
- `xlsx` - Spreadsheet creation, editing, analysis
- `docx` - Document creation and editing
- `pptx` - Presentation creation
- `webapp-testing` - Browser testing

**Full guide:** `.config/recommended-claude-skills.md`

---

### Pandoc (Document Converter)

**What:** Fast command-line tool for converting markdown to Word documents (.docx).

**When:** Converting planning docs, PRDs, roadmaps to shareable Word format.

**Setup (one-time):**
```powershell
# Run the included installer
powershell.exe -ExecutionPolicy Bypass -File scripts\install-pandoc.ps1
```

**Usage:**
```bash
# Convert all markdown files in a folder
cd fundraising/
..\scripts\convert-to-docx.bat

# Single file conversion
pandoc document.md -o document.docx
```

**Performance:** 95% faster than manual coding (7 docs in seconds vs 3-5 hours)

**Location:** `scripts/install-pandoc.ps1` and `scripts/convert-to-docx.bat`

**Full docs:** `scripts/README.md`

---

## 🎯 Recommended Setup Path

### Solo Founders (MVP)
1. **Start:** Built-in templates (no setup)
2. **When coding:** Claude Code Templates

### Small Teams (2-5 people)
1. **Start:** Built-in templates
2. **When coding:** Claude Code Templates
3. **Optional:** Skills for documents

### Enterprise Teams
1. **Start:** Built-in templates
2. **Setup:** Claude Code Templates
3. **Add:** Skills for office documents
4. **Consider:** Advanced specialized tools (see below)

---

## 🔧 Advanced Specialists

**Need framework-specific or domain-specific tools?**

See `docs/advanced/SPECIALIZED-TOOLS.md` for:
- Framework specialists (Django, FastAPI, GraphQL)
- Payment integration (Stripe, PayPal)
- AI/ML features (LangChain, RAG)
- SEO & content marketing
- Other specialized domains

**Most projects won't need these** - but they're available if you do.

---

## 🔄 Integration Priority

**Essential (Always):**
- Built-in templates ← You already have this

**High Value (When Coding):**
- Claude Code Templates

**Nice to Have (Optional):**
- Claude Skills (if working with documents)
- Specialized tools (only for specific needs)

---

## ❓ Questions?

Just ask Claude:
- "How do I set up Claude Code Templates?"
- "Install the frontend developer agent"
- "Do I need any integrations for my MVP?"

---

## 📚 Related Documentation

**In .config/:**
- `claude-code-templates-guide.md` - Complete technical reference
- `recommended-claude-skills.md` - Skills catalog

**In docs/:**
- `docs/advanced/SPECIALIZED-TOOLS.md` - Advanced specialists

---

**Last Updated:** 2025-11-05
**Template Version:** 2.0
