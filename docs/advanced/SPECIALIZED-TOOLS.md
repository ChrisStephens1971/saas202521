# Advanced Specialized Tools

**Project:** saas202521
**Audience:** Advanced users with specific needs
**Template Version:** 2.0

---

## ⚠️ Read This First

**Most projects don't need these tools.**

If you're building a standard SaaS application, use:
- Built-in templates (planning)
- Claude Code Templates (development)

**Only explore these if you have specific needs** like:
- Framework-specific patterns (Django, FastAPI)
- Payment processing (Stripe)
- AI-powered features
- SEO content at scale
- Specialized domains (blockchain, gaming, trading)

---

## 🎯 Framework Specialists

**When:** You're using specific frameworks and want deep expertise.

### Django Specialist
```bash
/plugin marketplace add wshobson/agents
/plugin install python-development
```

**Provides:**
- `django-pro` agent - Django 5.x patterns
- Django ORM optimization
- Django Rest Framework best practices
- Celery integration
- Django Channels (WebSockets)

**Use when:** Building Django applications

---

### FastAPI Specialist
```bash
/plugin install python-development
```

**Provides:**
- `fastapi-pro` agent - FastAPI async patterns
- Pydantic V2 models
- SQLAlchemy 2.0 integration
- Modern Python async/await
- WebSocket support

**Use when:** Building FastAPI microservices

---

### GraphQL Specialist
```bash
/plugin install backend-development
```

**Provides:**
- `graphql-architect` agent - GraphQL schema design
- Federation patterns
- Performance optimization
- Caching strategies
- Real-time subscriptions

**Use when:** Building GraphQL APIs

---

## 💳 Payment Integration

**When:** Implementing billing, subscriptions, or payment processing.

```bash
/plugin install payment-integration
```

**Provides:**
- Stripe integration patterns
- PayPal integration
- Subscription billing logic
- Webhook handling
- PCI compliance guidance

**Use when:**
- Implementing SaaS billing
- Adding payment processing
- Building subscription features

**Alternative:** Claude Code Templates also covers payments, but this is more specialized.

---

## 🤖 AI/ML Features

**When:** Building AI-powered features into your SaaS.

```bash
/plugin install llm-application-dev
```

**Provides:**
- LangChain integration
- Retrieval-Augmented Generation (RAG)
- Prompt engineering patterns
- Vector database integration
- Model evaluation

**Use when:**
- Adding AI chat features
- Building recommendation systems
- Implementing semantic search
- Creating AI-powered workflows

---

## 📈 SEO & Content Marketing

**When:** Need to generate marketing content or optimize SEO at scale.

```bash
/plugin install seo-content-writing
```

**Provides:**
- SEO-optimized content generation
- Technical SEO analysis
- Content strategy
- Keyword research
- Meta description generation

**Use when:**
- Building content-heavy SaaS
- Marketing website optimization
- Blog content generation
- Landing page creation

---

## 🔐 Full-Stack Orchestration

**When:** Building complete features end-to-end with coordinated workflow.

```bash
/plugin install full-stack-orchestration
```

**Provides:**
- 12-step feature development workflow:
  1. Database design
  2. Backend architecture
  3. Frontend architecture
  4. Backend implementation
  5. Frontend implementation
  6. Database optimization
  7. Contract testing
  8. E2E testing
  9. Security audit
  10. Infrastructure setup
  11. Observability
  12. Performance optimization

**Use when:**
- Building complex features that span full stack
- Need coordinated multi-agent workflow
- Want opinionated end-to-end process

**Note:** This might overlap with Claude Code Templates' orchestration. Try Templates first.

---

## 🎮 Niche Domains

### Blockchain & Web3
```bash
/plugin install blockchain-web3
```
**Use when:** Building blockchain/crypto features

### Gaming Development
```bash
/plugin install gaming-development
```
**Use when:** Building game-related features

### Quantitative Trading
```bash
/plugin install quantitative-trading
```
**Use when:** Building fintech/trading platforms

---

## 📚 How to Use WSHobson Plugins

### Step 1: Add Marketplace
```bash
/plugin marketplace add wshobson/agents
```

### Step 2: Install Specific Plugin
```bash
/plugin install [plugin-name]
```

### Step 3: Use Agent
```bash
/[plugin-name]:[agent-name] "task description"
```

**Example:**
```bash
/python-development:fastapi-pro "create user authentication with JWT"
```

---

## 🤔 Should You Use These?

**Use if:**
- ✅ You need framework-specific expertise (Django/FastAPI/GraphQL)
- ✅ You're implementing payments (Stripe/PayPal)
- ✅ You're building AI features (LLM/RAG)
- ✅ You need SEO content at scale
- ✅ Your project is in a niche domain (blockchain/gaming/trading)

**Don't use if:**
- ❌ You're building a standard SaaS MVP
- ❌ Claude Code Templates already covers your needs
- ❌ You want simpler, more general tools
- ❌ You're just starting out

---

## 📖 Full Documentation

**WSHobson Repository:**
- https://github.com/wshobson/agents

**Documentation:**
- [Complete Plugin Reference](https://github.com/wshobson/agents/blob/main/docs/plugins.md)
- [All Agents](https://github.com/wshobson/agents/blob/main/docs/agents.md)
- [Agent Skills](https://github.com/wshobson/agents/blob/main/docs/agent-skills.md)

---

## 💡 Recommendation

**Start with Claude Code Templates** (in main INTEGRATIONS.md).

**Come back here only if:**
1. You're using Django, FastAPI, or GraphQL specifically
2. You need Stripe/PayPal integration
3. You're building AI-powered features
4. You need specialized domain expertise

**Most SaaS projects (80%+) won't need these.**

---

**Last Updated:** 2025-11-05
**Template Version:** 2.0
**Audience:** Advanced users only
