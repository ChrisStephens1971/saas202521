# Recommended Claude Skills for SaaS Projects

> **Last Updated:** 2025-10-23
> **Purpose:** Guide for installing and using Claude Skills in your SaaS projects
> **Source:** Analysis of anthropics/skills and awesome-claude-skills repositories

---

## What are Claude Skills?

**Claude Skills** are different from the "virtual agents" we've built in CLAUDE.md:

| Feature | Virtual Agents (in CLAUDE.md) | Claude Skills |
|---------|------------------------------|---------------|
| **Format** | Markdown instructions in CLAUDE.md | Separate folders with SKILL.md |
| **Loading** | Always in context | On-demand (30-50 tokens until loaded) |
| **Portability** | Project-specific | Works across Claude.ai, Code, API |
| **Code Execution** | Uses Claude tools | Can include executable scripts |
| **Best For** | Project workflows | Specialized tasks, document work |

**Use Both Together**: Virtual agents orchestrate your project, Skills provide specialized capabilities.

---

## Quick Start

### Install Skills in Claude Code

```bash
# Install from official marketplace
/plugin marketplace add anthropics/skills

# Install specific skill
/plugin add /path/to/skill-folder

# Install community superpowers library
/plugin marketplace add obra/superpowers-marketplace
```

### Enable Skills in Claude.ai

1. Go to [Settings > Capabilities](https://claude.ai/settings/capabilities)
2. Enable Skills toggle
3. Browse available skills

---

## 🎯 Recommended Skills for SaaS Projects

### Essential Skills (Install First)

#### 1. **skill-creator** ⭐
**Why:** Create custom skills for your specific SaaS workflow

```bash
/plugin add anthropics/skills/skill-creator
```

**Use cases:**
- Create deployment runbook skill
- Create customer onboarding checklist skill
- Create API testing workflow skill

**How to use:**
- Ask: "Use skill-creator to build a skill for [your workflow]"
- Answer questions about your workflow
- Claude generates the complete skill structure

---

#### 2. **webapp-testing** 🧪
**Why:** Essential for testing your SaaS web application

```bash
/plugin add anthropics/skills/webapp-testing
```

**Use cases:**
- Test user registration flow
- Verify login functionality
- Debug UI issues with screenshots
- Automated E2E testing with Playwright

**Complements:** Your QA Testing Agent (from CLAUDE.md)

**Example:**
```python
# Test login flow
python scripts/with_server.py --server "npm run dev" --port 3000 -- python test_login.py
```

---

#### 3. **mcp-builder** 🔌
**Why:** Build MCP servers to integrate external services into your SaaS

```bash
/plugin add anthropics/skills/mcp-builder
```

**Use cases:**
- Integrate Stripe payment processing
- Connect to your database (Postgres, MongoDB)
- Build custom API integrations
- Add third-party service connectors

**Perfect for:**
- CRM integration
- Payment gateways
- Analytics platforms
- Email service providers

**Example workflow:**
- "Help me build an MCP server for Stripe payments"
- Claude guides you through best practices
- Generates production-ready MCP server code

---

### Document Skills (For Product Teams)

#### 4. **xlsx** 📊
**Why:** Analyze user data, create reports, work with exports

```bash
/plugin add anthropics/skills/document-skills/xlsx
```

**Use cases:**
- Analyze user data exports
- Create financial reports
- Generate product metrics dashboards
- Work with CSV/Excel data

**Example:**
- "Analyze this user data and create a pivot table"
- "Generate monthly revenue report from this CSV"

---

#### 5. **pdf** 📄
**Why:** Generate contracts, invoices, reports

```bash
/plugin add anthropics/skills/document-skills/pdf
```

**Use cases:**
- Generate customer contracts
- Create invoices and receipts
- Extract text from uploaded documents
- Merge/split PDFs

---

#### 6. **docx** 📝
**Why:** Create documentation, proposals, user guides

```bash
/plugin add anthropics/skills/document-skills/docx
```

**Use cases:**
- Generate API documentation
- Create customer onboarding guides
- Write product proposals
- Track changes in collaborative documents

---

### Development Skills

#### 7. **artifacts-builder** 🎨
**Why:** Rapidly prototype UI features

```bash
/plugin add anthropics/skills/artifacts-builder
```

**Use cases:**
- Prototype new features quickly
- Build interactive demos for stakeholders
- Create internal admin dashboards
- Test UI concepts before full implementation

**Technologies:** React, Tailwind CSS, shadcn/ui components

**Example:**
- "Build a user dashboard with charts showing signup trends"
- "Create a settings page with profile editing"

---

### Communication Skills

#### 8. **internal-comms** 📢
**Why:** Write consistent internal communications

```bash
/plugin add anthropics/skills/internal-comms
```

**Use cases:**
- Weekly team status reports
- Product update newsletters
- Internal FAQs
- Sprint retrospective summaries

**Perfect for:** Solo founders and small teams who need professional communication

---

### Community Skills (Advanced)

#### 9. **obra/superpowers** 💪
**Why:** 20+ battle-tested skills for development workflows

```bash
/plugin marketplace add obra/superpowers-marketplace
```

**Includes:**
- `/brainstorm` - Structured brainstorming
- `/write-plan` - Project planning
- `/execute-plan` - Plan execution
- TDD workflows
- Debugging patterns
- Collaboration tools

**Resources:**
- [GitHub: obra/superpowers](https://github.com/obra/superpowers)
- [Blog: Superpowers Overview](https://blog.fsck.com/2025/10/09/superpowers/)

---

## 🚀 Skills for Specific SaaS Scenarios

### B2B SaaS
**Essential:**
- mcp-builder (API integrations)
- xlsx (data analysis)
- docx (documentation)
- internal-comms

**Nice to have:**
- pdf (contracts, invoices)
- artifacts-builder (admin dashboards)

---

### B2C SaaS
**Essential:**
- webapp-testing (E2E tests)
- artifacts-builder (rapid prototyping)
- mcp-builder (payment/analytics)

**Nice to have:**
- pdf (receipts, reports)
- xlsx (user analytics)

---

### SaaS Platform/Marketplace
**Essential:**
- mcp-builder (vendor integrations)
- webapp-testing (complex flows)
- xlsx (transaction data)

**Nice to have:**
- pdf (vendor agreements)
- artifacts-builder (seller dashboards)

---

### Enterprise SaaS
**Essential:**
- All document skills (docx, pdf, xlsx, pptx)
- mcp-builder (enterprise integrations)
- internal-comms (stakeholder updates)

**Nice to have:**
- brand-guidelines (consistent branding)
- skill-creator (custom workflows)

---

## 💡 Creating Custom Skills for Your SaaS

### When to Create Custom Skills

Create a custom skill when you:
- ✅ Repeat the same workflow multiple times
- ✅ Have company-specific processes
- ✅ Need to enforce standards (code style, documentation format)
- ✅ Want to share expertise across team members

### Example Custom Skills for SaaS

**1. deployment-runbook**
```
deployment-runbook/
├── SKILL.md                    # Deployment checklist
├── scripts/
│   ├── pre-deploy-check.sh    # Validation script
│   └── rollback.sh             # Emergency rollback
└── references/
    └── deployment-process.md   # Detailed procedures
```

**2. customer-onboarding**
```
customer-onboarding/
├── SKILL.md                      # Onboarding workflow
├── assets/
│   ├── welcome-email.html       # Email template
│   └── setup-guide.pdf          # Customer guide
└── scripts/
    └── create-account.py         # Account setup automation
```

**3. database-migrations**
```
database-migrations/
├── SKILL.md                    # Migration best practices
├── scripts/
│   ├── generate-migration.py  # Migration generator
│   └── validate-schema.py     # Schema validator
└── references/
    └── schema.md               # Database schema docs
```

**4. api-testing**
```
api-testing/
├── SKILL.md                  # API test guidelines
├── scripts/
│   └── api-test-runner.py   # Test automation
└── references/
    └── api-spec.yaml         # OpenAPI specification
```

### How to Create Custom Skills

**Method 1: Use skill-creator (Recommended)**
```
1. Ask Claude: "Use skill-creator to build a skill for [your workflow]"
2. Answer questions about your process
3. Claude generates complete skill structure
4. Test and iterate
```

**Method 2: Manual Creation**
```bash
# 1. Create skill folder
mkdir my-saas-skill
cd my-saas-skill

# 2. Create SKILL.md
cat > SKILL.md << 'EOF'
---
name: my-saas-skill
description: Brief description for when Claude should use this skill
---

# Skill Instructions

Detailed instructions for Claude...
EOF

# 3. Add scripts/references/assets as needed
mkdir scripts references assets

# 4. Test the skill
/plugin add ./my-saas-skill
```

---

## 🔄 Integration with Your Template

### How Skills Work with Virtual Agents

**Your CLAUDE.md virtual agents can invoke skills:**

```markdown
#### Virtual Agent: Deployment Manager

**Workflow:**
1. Use `deployment-runbook` skill for checklist
2. Run pre-deployment tests
3. Execute deployment
4. Verify with `webapp-testing` skill
5. Document with `internal-comms` skill
```

### Recommended CLAUDE.md Addition

Add to your template's CLAUDE.md:

```markdown
## 🎯 Claude Skills Integration

**Recommended Skills for this project:**
- [ ] skill-creator (for custom workflows)
- [ ] webapp-testing (for E2E testing)
- [ ] mcp-builder (for API integrations)
- [ ] [Add project-specific skills]

**When to use Skills vs Virtual Agents:**
- **Virtual Agents** (in CLAUDE.md): Project-specific workflows
- **Skills**: Specialized tasks, documents, reusable across projects

**Example:**
- User: "test the login flow"
- Claude: Uses webapp-testing skill + QA Testing Agent workflow
```

---

## 📚 Learning Resources

### Official Documentation
- [What are Skills?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [Skills API Documentation](https://docs.claude.com/en/api/skills)
- [Engineering Deep Dive](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

### Repositories
- [anthropics/skills](https://github.com/anthropics/skills) - Official skills repository
- [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) - Curated list
- [obra/superpowers](https://github.com/obra/superpowers) - Community skills library

### Tutorials
- [How to Create Your First Claude Skill](https://skywork.ai/blog/ai-agent/how-to-create-claude-skill-step-by-step-guide/)
- [How to Use Skills in Claude Code](https://skywork.ai/blog/how-to-use-skills-in-claude-code-install-path-project-scoping-testing/)
- [Simon Willison: Claude Skills Analysis](https://simonwillison.net/2025/Oct/16/claude-skills/)

---

## 🔒 Security Considerations

⚠️ **Important**: Skills can execute arbitrary code in Claude's environment.

**Before installing a skill:**
- ✅ Review the SKILL.md file
- ✅ Inspect all scripts in `scripts/` folder
- ✅ Only install from trusted sources
- ✅ Audit before enterprise deployment

**For team use:**
- Use version control (git) for custom skills
- Peer review custom skills before distribution
- Establish approval process for new skills
- Monitor skill usage and performance

---

## 🎬 Getting Started Checklist

**Week 1: Essential Skills**
- [ ] Install skill-creator
- [ ] Install webapp-testing (if building web app)
- [ ] Install mcp-builder (if need integrations)

**Week 2: Document Skills**
- [ ] Install xlsx (for data analysis)
- [ ] Install pdf (for reports/contracts)
- [ ] Install docx (for documentation)

**Week 3: Custom Skills**
- [ ] Create custom deployment runbook skill
- [ ] Create custom onboarding workflow skill
- [ ] Document custom skills in project README

**Ongoing:**
- [ ] Evaluate new community skills
- [ ] Iterate on custom skills based on usage
- [ ] Share valuable skills with team

---

## 💬 Common Questions

**Q: Do skills replace the virtual agents we built in CLAUDE.md?**
A: No! They complement each other. Virtual agents orchestrate project workflows, skills provide specialized capabilities.

**Q: Can I use skills offline?**
A: Skills work in Claude Code even without internet (except those requiring API calls).

**Q: How many skills can I install?**
A: Unlimited. Skills only consume tokens when loaded (30-50 tokens each until activated).

**Q: Can skills call each other?**
A: Yes! Claude can automatically compose multiple skills together.

**Q: Should every SaaS project have custom skills?**
A: Start with official skills. Create custom skills when you notice repeated workflows.

---

## 📊 Skills Priority Matrix

### Solo Founder (MVP Phase)
**High Priority:**
- skill-creator
- webapp-testing
- artifacts-builder

**Medium Priority:**
- mcp-builder
- xlsx

**Low Priority:**
- Document skills (docx, pdf)
- internal-comms

---

### Small Team (2-5 people)
**High Priority:**
- skill-creator
- webapp-testing
- mcp-builder
- internal-comms

**Medium Priority:**
- All document skills
- artifacts-builder

**Low Priority:**
- Advanced community skills

---

### Enterprise Team
**High Priority:**
- All document skills
- mcp-builder
- skill-creator
- internal-comms

**Medium Priority:**
- webapp-testing
- brand-guidelines
- artifacts-builder

**Low Priority:**
- Specialized community skills

---

## 🎯 Next Steps

1. **Install essential skills** based on your team size
2. **Test with real tasks** to understand how they work
3. **Create custom skills** for repeated workflows
4. **Update CLAUDE.md** to reference skills in virtual agents
5. **Document skills** your team uses in project README

---

**Related Files:**
- `C:\devop\template\CLAUDE.md` - Virtual agents configuration
- `C:\devop\template\README.md` - Project documentation
- `C:\devop\.config\projects.json` - Project registry

**Skill Repositories:**
- `C:\devop\skills\` - Official Anthropic skills
- `C:\devop\awesome-claude-skills\` - Awesome list and documentation

---

**Document Version:** 1.0
**Last Review:** 2025-10-23
