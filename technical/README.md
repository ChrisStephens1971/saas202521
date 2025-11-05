# Technical Planning

This directory contains all technical documentation, including architecture decisions, technical specifications, system design documents, and DevOps planning.

## Contents

- **architecture/** - System architecture and design documents
- **specs/** - Detailed technical specifications
- **adr/** - Architecture Decision Records (ADRs)
- **infrastructure/** - DevOps, deployment, and infrastructure docs
- **api/** - API documentation and specifications

## Templates Available

- `tech-spec-template.md` - Detailed technical specification
- `adr-template.md` - Architecture Decision Record
- `api-spec-template.md` - API endpoint documentation
- `system-design-template.md` - High-level system design
- `incident-postmortem-template.md` - Postmortem for incidents

## How to Use

### Architecture Decision Records (ADRs)
Use ADRs to document significant architectural decisions:
1. Copy `adr-template.md` to `adr/YYYY-MM-DD-decision-title.md`
2. Number sequentially: `001-use-postgresql.md`, `002-adopt-microservices.md`
3. Keep ADRs immutable - don't edit after approval

### Technical Specs
For new features or major changes:
1. Start with PRD to understand requirements
2. Create tech spec using `tech-spec-template.md`
3. Review with team (or self-review as solo founder)
4. Link to related PRD and user stories

### API Documentation
Document all API endpoints:
- Use `api-spec-template.md` for each endpoint or group
- Consider using OpenAPI/Swagger for auto-generated docs
- Keep docs in sync with implementation

## Examples

See `examples/` folder for filled-in templates.

## Best Practices

- Write ADRs for decisions that are hard to reverse
- Keep technical specs updated as implementation evolves
- Include diagrams where helpful (architecture, flows, data models)
- Document the "why" not just the "what"
- Review and update technical docs quarterly
