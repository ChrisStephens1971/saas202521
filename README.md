# Planning Template Repository

A comprehensive planning and documentation template for SaaS projects, especially designed for solo founders and small teams. This repository provides structure, templates, and best practices for every stage of product planning and development.

---

## 🎯 What This Is

This is a **ready-to-use folder structure and template library** for planning and building SaaS products. It includes:

- **Product planning templates** (PRDs, roadmaps, feature specs)
- **Sprint planning workflows** (user stories, retrospectives)
- **Technical documentation** (architecture decisions, tech specs, API docs)
- **Business planning** (OKRs, metrics, goals)
- **Meeting templates** (customer interviews, brainstorms)
- **Process documentation** (runbooks, workflows, SOPs)

**Perfect for:** Solo founders, small teams, and anyone who wants organized, professional planning without starting from scratch.

---

## 📖 Essential Guides

**Start here for setup and standards:**

| Guide | Purpose | When to Use |
|-------|---------|-------------|
| **[_START-HERE.md](_START-HERE.md)** | First-time project setup | ✅ Read this first! |
| **[DEVELOPMENT-GUIDE.md](DEVELOPMENT-GUIDE.md)** | Tooling, Docker, diagnostics | When setting up dev environment |
| **[STYLE-GUIDE.md](STYLE-GUIDE.md)** | Naming conventions, formatting | Before creating files/writing code |
| **[TESTING-CHECKLIST.md](TESTING-CHECKLIST.md)** | Smoke tests, validation steps | Before committing or deploying |
| **[CLAUDE.md](CLAUDE.md)** | AI assistant workflows | When working with Claude Code |

**Quick Reference:**
- 🔧 **Need to install tools?** → [DEVELOPMENT-GUIDE.md](DEVELOPMENT-GUIDE.md#tooling-requirements)
- 📝 **How to name files?** → [STYLE-GUIDE.md](STYLE-GUIDE.md#file-naming-conventions)
- 🐳 **Docker not working?** → [DEVELOPMENT-GUIDE.md](DEVELOPMENT-GUIDE.md#infrastructure-diagnostics)
- ✅ **Pre-commit checklist?** → [TESTING-CHECKLIST.md](TESTING-CHECKLIST.md#pre-commit-checklist)
- 📁 **What gets committed?** → [.gitignore](.gitignore) (see comments at top)

---

## 📁 Repository Structure

```
.
├── product/              # Product requirements, roadmaps, features
│   ├── PRDs/            # Product Requirements Documents
│   ├── roadmap/         # Product roadmap planning
│   ├── features/        # Feature specifications
│   ├── strategy/        # Product strategy docs
│   └── examples/        # Example: User onboarding PRD
│
├── sprints/             # Sprint planning and agile workflows
│   ├── current/         # Active sprint
│   ├── archive/         # Past sprints
│   ├── user-stories/    # User story backlog
│   ├── retrospectives/  # Sprint retrospectives
│   └── examples/        # Example: Completed Sprint 1
│
├── technical/           # Technical specs and architecture
│   ├── architecture/    # System design docs
│   ├── specs/           # Technical specifications
│   ├── adr/             # Architecture Decision Records
│   ├── infrastructure/  # DevOps and infrastructure
│   ├── api/             # API documentation
│   └── examples/        # Example: PostgreSQL ADR
│
├── business/            # Business planning and metrics
│   ├── okrs/            # Objectives and Key Results
│   ├── goals/           # Annual/quarterly goals
│   ├── metrics/         # KPI tracking
│   ├── milestones/      # Launch planning
│   └── strategy/        # Business strategy
│
├── meetings/            # Meeting notes and conversations
│   ├── customer-calls/  # Customer interviews
│   ├── advisor-meetings/ # Advisor/investor meetings
│   ├── team/            # Team meetings
│   ├── brainstorms/     # Brainstorming sessions
│   └── general/         # Other meetings
│
├── workflows/           # Process documentation
│   ├── development/     # Dev workflows
│   ├── operations/      # Operational runbooks
│   ├── business/        # Business processes
│   └── examples/        # Example: Deployment workflow
│
├── scripts/             # Utility scripts
│   ├── install-pandoc.ps1  # Install Pandoc for document conversion
│   ├── convert-to-docx.bat # Convert markdown to Word documents
│   └── README.md        # Scripts documentation
│
├── .github/             # GitHub templates
│   ├── ISSUE_TEMPLATE/  # Feature, bug, task templates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .gitignore           # Comprehensive exclusions
├── .editorconfig        # Editor configuration
├── CLAUDE.md            # Guidance for Claude Code
└── README.md            # This file
```

---

## 🚀 Quick Start

### 1. Use This Template

**Option A: Clone for your project**
```bash
git clone <this-repo-url> your-project-name
cd your-project-name
rm -rf .git
git init
```

**Option B: Fork on GitHub**
- Click "Use this template" or "Fork"
- Clone your fork
- Customize for your needs

### 2. Remove What You Don't Need

**For solo founders (minimal setup):**
- Keep: `product/`, `sprints/`, `business/metrics/`
- Optional: `technical/`, `meetings/`, `workflows/`
- Can remove: Other subdirectories

**For small teams:**
- Keep most folders
- Customize templates to match your workflow

**For enterprise:**
- Use everything
- Add company-specific sections

### 3. Start Planning

**Day 1:**
- [ ] Create your first roadmap (`product/roadmap-template.md`)
- [ ] Set up Sprint 1 (`sprints/sprint-plan-template.md`)
- [ ] Define initial OKRs (`business/okr-template.md`)

**Week 1:**
- [ ] Write PRD for first feature
- [ ] Break down into user stories
- [ ] Start tracking metrics

**Ongoing:**
- [ ] Weekly sprint planning and retrospectives
- [ ] Monthly roadmap updates
- [ ] Quarterly OKR reviews

---

## 📝 Available Templates

### Product Planning (product/)
- **prd-template.md** - Comprehensive Product Requirements Document
- **roadmap-template.md** - Product roadmap planning (Now/Next/Later)
- **feature-spec-template.md** - Lightweight feature specification
- **user-research-template.md** - User research and feedback documentation

### Sprint Planning (sprints/)
- **sprint-plan-template.md** - Sprint planning with daily progress tracking
- **user-story-template.md** - Individual user story format
- **retrospective-template.md** - Sprint retrospective structure
- **daily-standup-template.md** - Daily standup notes (optional)

### Technical (technical/)
- **tech-spec-template.md** - Detailed technical specification
- **adr-template.md** - Architecture Decision Record (ADR)
- **api-spec-template.md** - API endpoint documentation
- **incident-postmortem-template.md** - Postmortem analysis
- **system-design-template.md** - High-level system design

### Business (business/)
- **okr-template.md** - Quarterly OKR planning
- **metrics-dashboard-template.md** - KPI tracking dashboard
- **weekly-review-template.md** - Weekly business review
- **annual-goals-template.md** - Yearly goal setting
- **milestone-plan-template.md** - Launch and milestone planning

### Meetings (meetings/)
- **meeting-notes-template.md** - General meeting notes
- **customer-interview-template.md** - Customer discovery calls
- **1-on-1-template.md** - One-on-one meeting format
- **brainstorm-template.md** - Structured brainstorming
- **decision-meeting-template.md** - Decision-making meetings

### Workflows (workflows/)
- **process-documentation-template.md** - Document any process
- **runbook-template.md** - Operational runbook for systems
- **checklist-template.md** - Reusable checklists
- **sop-template.md** - Standard Operating Procedure

---

## 💡 How to Use These Templates

### For Solo Founders

**Essential Workflow:**
1. **Product:** Write simple PRDs or feature specs
2. **Sprints:** Track work in 1-2 week sprints
3. **Business:** Weekly reviews + quarterly OKRs
4. **Technical:** Document major decisions (ADRs)

**Time Investment:**
- Planning: 2-4 hours/week
- Retrospectives: 1 hour/week
- Reviews: 30 min/week

**You don't need to use everything!** Start with 20% of the templates and add more as needed.

### For Small Teams (2-5 people)

**Team Workflow:**
1. **Weekly:** Sprint planning, retrospectives
2. **Bi-weekly:** Roadmap reviews
3. **Monthly:** OKR check-ins
4. **Quarterly:** Goal setting, strategy reviews

**Collaboration:**
- Share templates via GitHub/Notion/Confluence
- Assign owners to each document
- Review together during meetings

### For Larger Teams

**Full Implementation:**
- Use all folders and templates
- Integrate with tools (Jira, Linear, Notion)
- Establish review processes
- Create team-specific variations

---

## ✨ Key Features

### 1. Complete Examples
Every major template has a filled-in example:
- `product/examples/example-prd-user-onboarding.md`
- `sprints/examples/example-sprint-1.md`
- `technical/examples/example-adr-use-postgresql.md`
- `workflows/examples/example-deployment-workflow.md`

### 2. GitHub Integration
Ready-to-use GitHub templates:
- Feature request template
- Bug report template
- Task template
- Pull request template

### 3. Best Practices Built-In
Templates include:
- Section prompts and examples
- Decision frameworks
- Common pitfalls to avoid
- Metrics and success criteria

### 4. Customizable
Every template can be:
- Simplified (remove sections)
- Expanded (add fields)
- Adapted (industry-specific)
- Integrated (link to external tools)

---

## 🎯 Best Practices

### Documentation

**✅ Do:**
- Update docs as you go (not after)
- Document "why" not just "what"
- Link related documents
- Use examples to clarify
- Keep it scannable (headings, bullets, tables)

**❌ Don't:**
- Over-document (80% done > perfect)
- Let docs go stale
- Write docs no one reads
- Copy-paste without customizing

### Planning

**✅ Do:**
- Start simple, add complexity as needed
- Review retrospectives and adjust
- Be honest about timelines
- Celebrate wins
- Keep the customer at the center

**❌ Don't:**
- Overthink (paralysis by analysis)
- Ignore retrospective insights
- Commit to unrealistic deadlines
- Plan in isolation

### Process

**✅ Do:**
- Document processes you repeat
- Automate where possible
- Review quarterly
- Make it easy to follow

**❌ Don't:**
- Create unnecessary bureaucracy
- Make processes too rigid
- Skip retrospectives
- Ignore pain points

---

## 🔧 Customization Guide

### Simplify for MVPs
1. Remove folders you don't need
2. Use "lite" versions of templates
3. Combine similar documents
4. Focus on essentials only

### Expand for Enterprise
1. Add compliance sections (SOC 2, HIPAA, etc.)
2. Include approval workflows
3. Add company-specific fields
4. Create detailed runbooks

### Industry-Specific Additions

**Healthcare/Medical:**
- HIPAA compliance checkboxes
- PHI handling sections
- Audit trail requirements
- Clinical validation docs

**Fintech:**
- PCI-DSS requirements
- AML/KYC procedures
- Regulatory filing tracking
- Risk assessment templates

**EdTech:**
- FERPA compliance
- COPPA considerations
- Accessibility (WCAG) checklist
- Pedagogical approach docs

---

## 📚 Real-World Examples

### Example 1: Solo Founder Journey

**Week 1:**
- Created initial roadmap with 3 features
- Defined Q1 OKRs
- Set up Sprint 1

**Week 4:**
- Completed Sprint 1, held retrospective
- Updated roadmap based on learnings
- Wrote PRD for feature 2

**Month 3:**
- Launched MVP
- Started tracking metrics
- Customer interview notes in `meetings/`

**Result:** Organized planning led to faster shipping and better focus.

### Example 2: 3-Person Team

**Initial Setup:**
- Customized templates for team workflow
- Set up 2-week sprint cadence
- Integrated with Linear for task tracking

**Ongoing:**
- Weekly sprint planning (1 hour)
- Daily async updates in sprint doc
- Bi-weekly retrospectives
- Monthly roadmap reviews

**Result:** Clear communication, less confusion, better alignment.

---

## 🤝 Contributing

Have improvements? Found a better template format? Want to add examples?

**Welcome contributions:**
- Additional templates
- Industry-specific variations
- Better examples
- Clarifications and improvements

**How to contribute:**
1. Fork this repository
2. Make your changes
3. Submit a pull request
4. Explain the value

---

## 📖 Recommended Resources

### Product Management
- [The Mom Test](http://momtestbook.com/) - Rob Fitzpatrick
- [Inspired](https://svpg.com/inspired-how-to-create-products-customers-love/) - Marty Cagan
- [Shape Up](https://basecamp.com/shapeup) - Basecamp

### Agile & Sprint Planning
- [Scrum Guide](https://scrumguides.org/)
- [User Story Mapping](https://www.jpattonassociates.com/user-story-mapping/) - Jeff Patton

### Technical Documentation
- [Architecture Decision Records](https://adr.github.io/)
- [Google SRE Books](https://sre.google/books/)
- [Documenting APIs](https://swagger.io/resources/articles/documenting-apis/)

### For Solo Founders
- [Indie Hackers](https://www.indiehackers.com/)
- [MicroConf](https://microconf.com/)
- [Zero to Sold](https://thebootstrappedfounder.com/zero-to-sold/) - Arvid Kahl

---

## 🏗️ Solo Founder Essentials

**You're building alone? Here's what to focus on:**

### Must Have (Start here)
1. ✅ Basic roadmap (`product/roadmap-template.md`)
2. ✅ Sprint tracking (`sprints/sprint-plan-template.md`)
3. ✅ Weekly review habit (`business/weekly-review-template.md`)
4. ✅ Metrics dashboard (`business/metrics-dashboard-template.md`)

### Should Have (Add soon)
5. ⚡ Retrospectives (learn & improve)
6. ⚡ PRDs for major features
7. ⚡ ADRs for big decisions
8. ⚡ Customer interview notes

### Nice to Have (Eventually)
9. 💎 Detailed tech specs
10. 💎 Comprehensive runbooks
11. 💎 Full OKR system

**Remember:**
- Shipping > Perfect planning
- Document enough to stay organized
- Simplicity > comprehensiveness
- Progress > perfection

**You've got this!** 🚀

---

## ⚖️ License

This template is released under the **MIT License**. Use it however you want for your projects!

---

## 💬 Support

**Questions or Issues?**
- Open an issue in this repository
- Submit improvements via PR
- Share how you're using these templates

---

## 🎉 Acknowledgments

**Created by:** Claude Code (claude.ai/code)

**Inspired by:**
- Basecamp's Shape Up methodology
- Amazon's PR/FAQ process
- Google's Design Doc template
- Architecture Decision Records (ADRs)
- Agile/Scrum best practices
- Indie Hacker community

**Built for:** Solo founders and small teams who want to build great products with professional planning—without the overhead.

---

## 📊 Quick Reference

### Time Estimates (Solo Founder)

| Activity | Weekly | Monthly | Quarterly |
|----------|--------|---------|-----------|
| Sprint Planning | 1-2 hrs | - | - |
| Retrospective | 1 hr | - | - |
| Weekly Review | 30 min | - | - |
| Roadmap Update | - | 2 hrs | - |
| OKR Planning | - | - | 4 hrs |
| Metrics Review | 15 min | 30 min | 1 hr |

**Total:** ~3-4 hours/week for organized planning

### Template Popularity (Most Used)

1. ⭐⭐⭐⭐⭐ Sprint plan
2. ⭐⭐⭐⭐⭐ Weekly review
3. ⭐⭐⭐⭐ Roadmap
4. ⭐⭐⭐⭐ User story
5. ⭐⭐⭐⭐ Retrospective
6. ⭐⭐⭐ PRD
7. ⭐⭐⭐ Metrics dashboard
8. ⭐⭐⭐ OKRs

---

**Happy Planning! 🎯**

*Now go build something amazing.*
