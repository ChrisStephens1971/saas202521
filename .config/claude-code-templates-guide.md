# Claude Code Templates Integration

**Repository:** https://github.com/davila7/claude-code-templates
**Browse Catalog:** https://aitmpl.com
**Documentation:** https://docs.aitmpl.com

---

## 🎯 What is Claude Code Templates?

A massive collection of ready-to-use AI agents, commands, MCPs (integrations), and configurations for Claude Code. Contains **163 agents**, **210 commands**, and **50+ external integrations**.

---

## 🚀 Quick Install

### Interactive Browser
```bash
npx claude-code-templates@latest
```

### Install Specific Components
```bash
# Install an agent
npx claude-code-templates@latest --agent development-team/frontend-developer

# Install a command
npx claude-code-templates@latest --command testing/generate-tests

# Install an MCP (integration)
npx claude-code-templates@latest --mcp database/postgresql-integration
```

### Install Multiple at Once
```bash
npx claude-code-templates@latest \
  --agent development-team/frontend-developer \
  --agent security/security-auditor \
  --command testing/generate-tests
```

---

## 📦 Recommended Components for SaaS Projects

### Development Agents

**Frontend Development:**
```bash
npx claude-code-templates@latest --agent development-team/frontend-developer
npx claude-code-templates@latest --agent development-team/ui-ux-designer
```

**Backend Development:**
```bash
npx claude-code-templates@latest --agent development-team/backend-architect
npx claude-code-templates@latest --agent development-team/fullstack-developer
```

**Database:**
```bash
npx claude-code-templates@latest --agent database/database-architect
npx claude-code-templates@latest --agent database/postgresql-expert
```

**DevOps & Infrastructure:**
```bash
npx claude-code-templates@latest --agent devops-infrastructure/devops-engineer
npx claude-code-templates@latest --agent devops-infrastructure/kubernetes-expert
```

### Testing & Quality

**Test Generation:**
```bash
npx claude-code-templates@latest --command testing/generate-tests
npx claude-code-templates@latest --command testing/setup-comprehensive-testing
npx claude-code-templates@latest --command testing/e2e-setup
```

**Code Quality:**
```bash
npx claude-code-templates@latest --command performance/optimize-bundle
npx claude-code-templates@latest --command security/check-security
```

### Security

**Security Auditing:**
```bash
npx claude-code-templates@latest --agent security/security-auditor
npx claude-code-templates@latest --agent security/penetration-tester
npx claude-code-templates@latest --command security/security-audit
```

### Business & Marketing

**Product & Marketing:**
```bash
npx claude-code-templates@latest --agent business-marketing/product-strategist
npx claude-code-templates@latest --agent business-marketing/content-marketer
npx claude-code-templates@latest --agent business-marketing/marketing-attribution-analyst
```

**Customer Support:**
```bash
npx claude-code-templates@latest --agent business-marketing/customer-support
```

### External Integrations (MCPs)

**Database:**
```bash
npx claude-code-templates@latest --mcp database/postgresql-integration
npx claude-code-templates@latest --mcp database/supabase
```

**Development Tools:**
```bash
npx claude-code-templates@latest --mcp devtools/github
npx claude-code-templates@latest --mcp devtools/circleci
```

**Payment Processing:**
```bash
npx claude-code-templates@latest --mcp integration/stripe
```

**Browser Automation:**
```bash
npx claude-code-templates@latest --mcp browser_automation/playwright-mcp
```

---

## 🎯 When to Use What

### Built-in Virtual Agents (This Project)
Use for **planning and documentation**:
- Sprint Planner
- PRD Assistant
- Roadmap Creator
- System Architect (ADRs)
- Project Manager
- Documentation Agent

### Claude Code Templates Catalog
Use for **technical implementation**:
- Frontend/Backend Development
- Testing & QA
- Security Audits
- Performance Optimization
- Deployment & DevOps
- External Integrations

---

## 📚 Component Categories

### Agents (163 total)

| Category | Description | Examples |
|----------|-------------|----------|
| **development-team** | Frontend, backend, fullstack, mobile | frontend-developer, backend-architect |
| **business-marketing** | Product, marketing, sales | product-strategist, content-marketer |
| **security** | Security auditing and testing | security-auditor, penetration-tester |
| **database** | Database design and optimization | database-architect, postgresql-expert |
| **devops-infrastructure** | DevOps, cloud, Kubernetes | devops-engineer, kubernetes-expert |
| **ai-specialists** | AI/ML development | ai-engineer, ml-specialist |
| **data-ai** | Data science and analytics | data-scientist, analytics-engineer |
| **programming-languages** | Language-specific experts | python-expert, go-developer |

### Commands (210 total)

| Category | Description | Examples |
|----------|-------------|----------|
| **testing** | Test generation and setup | generate-tests, e2e-setup |
| **deployment** | Deployment automation | deploy-production, ci-cd-setup |
| **performance** | Performance optimization | optimize-bundle, profile-performance |
| **security** | Security scanning | check-security, security-audit |
| **documentation** | Auto-documentation | generate-api-docs, update-readme |
| **git-workflow** | Git automation | create-pr, review-changes |

### MCPs (50+ total)

| Category | Description | Examples |
|----------|-------------|----------|
| **database** | Database integrations | postgresql, mysql, supabase |
| **devtools** | Development tools | github, circleci, azure |
| **integration** | Third-party APIs | stripe, aws, various services |
| **browser_automation** | Browser testing | playwright, puppeteer |

---

## 🛠️ Advanced Tools

### Claude Code Analytics
Monitor AI development sessions:
```bash
npx claude-code-templates@latest --analytics
```

### Conversation Monitor
View Claude responses in real-time:
```bash
# Local access
npx claude-code-templates@latest --chats

# Secure remote access
npx claude-code-templates@latest --chats --tunnel
```

### Health Check
Diagnose Claude Code installation:
```bash
npx claude-code-templates@latest --health-check
```

### Plugin Dashboard
Manage installed plugins:
```bash
npx claude-code-templates@latest --plugins
```

---

## 💡 Example Workflow

### Starting a New Feature

**1. Planning (Use Built-in Virtual Agents):**
```
User: "Write a PRD for user authentication"
Claude: [Uses PRD Assistant virtual agent]
```

**2. Implementation (Install Technical Agents):**
```bash
# Install backend and security agents
npx claude-code-templates@latest \
  --agent development-team/backend-architect \
  --agent security/security-auditor
```

**3. Development:**
```
User: "Implement OAuth2 authentication"
Claude: [Uses backend-architect agent to implement]
```

**4. Testing:**
```bash
# Install testing command
npx claude-code-templates@latest --command testing/generate-tests
```

```
User: "/generate-tests src/auth"
Claude: [Generates comprehensive test suite]
```

**5. Security Review:**
```
User: "Audit the authentication implementation"
Claude: [Uses security-auditor agent for review]
```

---

## 🔗 Additional Resources

- **Browse All Components:** https://aitmpl.com
- **Full Documentation:** https://docs.aitmpl.com
- **GitHub Repository:** https://github.com/davila7/claude-code-templates
- **Community Discussions:** https://github.com/davila7/claude-code-templates/discussions

---

## 📝 Notes

- **Agents** are installed to `.claude/agents/`
- **Commands** are installed to `.claude/commands/`
- **MCPs** are added to `.mcp.json`
- All components are markdown-based and can be customized

---

**Last Updated:** 2025-10-25
