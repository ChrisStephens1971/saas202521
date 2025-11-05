# Scripts Directory

Utility scripts for the project.

---

## Document Conversion Scripts

### Pandoc Markdown to DOCX Converter

Fast conversion of markdown files to professional Word documents.

**Files:**
- `install-pandoc.ps1` - One-time Pandoc installation
- `convert-to-docx.bat` - Batch conversion script

**Setup (First Time):**

```powershell
# Run the installer
powershell.exe -ExecutionPolicy Bypass -File scripts\install-pandoc.ps1
```

This installs Pandoc to: `%LOCALAPPDATA%\Pandoc\`

**Usage:**

```bash
# Navigate to folder with markdown files
cd fundraising/

# Run the batch converter
..\scripts\convert-to-docx.bat
```

The script will convert all `.md` files in the current directory to `.docx` format.

**Performance:**
- Converts 7 documents in **seconds** vs 3-5 hours of manual coding
- ~95% time savings over manual JavaScript approach
- Basic formatting (can be refined in Word if needed)

**Advanced Usage:**

```bash
# Single file conversion
pandoc document.md -o document.docx

# With custom template (for branded styling)
pandoc document.md -o document.docx --reference-doc=template.docx
```

**Quality Notes:**
- Default Pandoc output: 7-8/10 quality
- Manual refinement in Word: Add 10-15 minutes per doc
- Result: Professional documents in a fraction of the time

---

## Project Health Check### Validator ScriptAutomated validation of project setup and configuration.**Files:**- `validator.py` - Project health check script- `config.py` - Configuration (paths, patterns, constants)**Usage:**```bash# Run full validationpython scriptsalidator.py```**What it validates:**| Check | Description ||-------|-------------|| **No placeholders** | Ensures all template placeholders (in double-braces format) were replaced || **Git initialized** | Verifies .git directory exists || **GitHub remote** | Checks GitHub remote is configured || **Required files** | Validates CLAUDE.md, README.md, .gitignore exist || **Directory structure** | Confirms product/, sprints/, technical/, business/ exist || **CLAUDE.md sections** | Checks required sections present || **VS Code workspace** | Verifies .code-workspace file exists |**Exit codes:**- `0` - All checks passed ✅- `1` - One or more checks failed ❌**When to run:**- After initial project creation- Before deploying to staging/production- When troubleshooting issues- After structural changes**Performance:**- Skips vendor directories (node_modules, dist, .venv, build)- Fast validation (~1-2 seconds for typical project)**Example output:**```=== Validation Report for saas202521 ===============================================================  [OK] No placeholders  [OK] Git initialized  [OK] GitHub remote - https://github.com/ChrisStephens1971/saas202521  [OK] Required files  [OK] Directory structure  [OK] CLAUDE.md sections  [OK] VS Code workspace============================================================  Result: 7/7 checks passed  [OK] All validation checks passed!```---
## Adding More Scripts

Place utility scripts here and document them in this README.

Common script types:
- Data processing scripts
- Build automation
- Testing utilities
- Deployment helpers

---

## Coding Standards

**All scripts in this directory must follow the project's coding standards.**

**Standards Document:** `C:\devop\coding_standards.md`

### Quick Reference

**Shell Scripts (.sh, .bat, .ps1):**
- Clear comments explaining purpose
- Error handling for all operations
- Descriptive variable names
- Exit codes for success/failure

**Python Scripts (.py):**
- snake_case for functions/variables
- PascalCase for classes
- Docstrings for all functions
- Type hints where applicable
- Max line length: 80 characters

**JavaScript Scripts (.js, .cjs):**
- camelCase for functions/variables
- PascalCase for classes
- JSDoc comments for modules
- Use `const`/`let` (never `var`)
- Single quotes for strings

**Universal Rules:**
- Comments explain *why*, not *what*
- Specific exception types (no bare catches)
- Meaningful error messages
- Functions should be small (<50 lines)

**Before committing scripts:**
1. Run linters if available
2. Test thoroughly
3. Document usage in this README
4. Follow naming conventions
