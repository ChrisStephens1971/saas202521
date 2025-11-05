# Repository Guidelines

## Project Structure & Module Organization
- Top-level docs: `README.md`, `project-brief.md`, `_START-HERE.md`.
- Planning: `product/`, `sprints/`, `business/`, `meetings/`, `brand/`.
- Technical: `technical/` (architecture, testing templates, infra), `docs/` (guides, quick refs).
- Infrastructure as code: `technical/infrastructure/azure/` (Bicep, params); environment docs in `technical/infrastructure/`.
- Dev services: `docker-compose.yml` (Postgres on 5412, Redis on 6412).
- Utilities & automation: `scripts/` (Azure setup, backups, conversions), `fundraising/` (Node-based document generators).

## Build, Test, and Development Commands
- Start dev services: `docker compose up -d postgres redis`
- Stop services: `docker compose down`
- Fundraising tools: `cd fundraising && npm ci && node create-pitch-deck.js`
- Azure infra bootstrap: `./scripts/setup-azure-resources.sh` (requires Azure CLI login)
- Convert to DOCX (Windows): `./scripts/convert-to-docx.bat`

## Coding Style & Naming Conventions
- Markdown: wrap at ~100 cols, use descriptive headings, ordered lists for procedures.
- Filenames: documentation uses UPPER-KEBAB (e.g., `SPECIALIZED-TOOLS.md`); guides/templates may use Title Case or kebab where already established. Scripts use lower-kebab for JS (`create-cap-table.js`) and `.ps1`/`.sh` by platform.
- Indentation: 2 spaces for JS, 2 spaces for YAML, 2 spaces for JSON.
- Linting: keep Markdown links relative; prefer fenced code blocks with language hints.

## Testing Guidelines
- This repo is documentation-first. For scripts, include a sample run section in PRs (command + produced file path). For infra changes, reference `technical/infrastructure/CI-CD-SETUP.md` and validate with `docker compose config`.
- Place any test artefacts under `technical/testing/` or alongside examples.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `infra:`.
- Commits should be scoped where helpful (e.g., `docs(quick-reference): add checklist`).
- PRs must include: purpose, impacted paths, manual test notes or screenshots (for generated docs), and links to any related issues/ADRs.

## Security & Configuration Tips
- Do not commit secrets. Follow `technical/infrastructure/SECRETS-MANAGEMENT.md`.
- Use `.env` locally only; prefer Key Vault/secure stores for shared environments.
- Database defaults are dev-only; change ports/creds in deployment parameters as needed.

