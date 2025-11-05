# Git Workflow - Quick Reference

**Project:** saas202521
**Main Branch:** master
**Commit Convention:** Conventional Commits

---

## Daily Workflow

### Start Working

```bash
# Pull latest changes
git pull origin master

# Check status
git status

# Check current branch
git branch
```

### Make Changes

```bash
# View changes
git status
git diff

# Add files
git add <file>
git add .  # Add all changes

# Commit with conventional commit message
git commit -m "feat(feature-name): add description"
```

### Push Changes

```bash
# Push to remote
git push origin master

# Push after force-push conflict
git push origin master --force-with-lease  # Safer than --force
```

---

## Conventional Commits

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Use When | Example |
|------|----------|---------|
| `feat` | New feature | `feat(auth): add OAuth login` |
| `fix` | Bug fix | `fix(api): resolve timeout error` |
| `docs` | Documentation | `docs: update developer guide` |
| `style` | Formatting | `style: fix indentation` |
| `refactor` | Code refactoring | `refactor(api): extract middleware` |
| `perf` | Performance | `perf(db): add index on user_id` |
| `test` | Tests | `test(auth): add integration tests` |
| `build` | Dependencies | `build: upgrade fastapi to 0.110.0` |
| `ci` | CI/CD | `ci: add docker build step` |
| `chore` | Maintenance | `chore: update .gitignore` |

### Examples

```bash
# New feature
git commit -m "feat(dashboard): implement real-time updates"

# Bug fix
git commit -m "fix(payment): handle webhook signature validation"

# Documentation
git commit -m "docs: add API endpoint quick reference"

# Breaking change
git commit -m "refactor(api)!: change response format

BREAKING CHANGE: API now returns ISO 8601 timestamps."
```

---

## Branching (Optional for Solo)

### Feature Branches

```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "feat(feature): add functionality"

# Push feature branch
git push origin feature/new-feature

# Merge to master
git checkout master
git merge feature/new-feature
git push origin master

# Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Hotfix Branches

```bash
# Create hotfix branch
git checkout -b hotfix/critical-bug

# Fix and commit
git commit -m "fix(critical): prevent data loss"

# Merge to master
git checkout master
git merge hotfix/critical-bug
git push origin master
```

---

## Viewing History

### Git Log

```bash
# View commit history
git log

# Concise one-line format
git log --oneline

# Last 10 commits
git log -10

# Graph view
git log --graph --oneline --all

# Show changes in commits
git log -p

# Search commits
git log --grep="feature"

# Commits by author
git log --author="Your Name"
```

### Git Show

```bash
# Show latest commit
git show

# Show specific commit
git show abc123

# Show file in specific commit
git show abc123:path/to/file.py
```

---

## Undoing Changes

### Before Commit

```bash
# Discard changes in file
git checkout -- <file>

# Unstage file
git reset HEAD <file>

# Discard all changes
git reset --hard HEAD
```

### After Commit

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Amend last commit (change message or add files)
git add forgotten-file.py
git commit --amend

# Amend commit message only
git commit --amend -m "fix(typo): correct error message"
```

### Revert Commit

```bash
# Create new commit that undoes a commit
git revert abc123

# Revert without committing (review first)
git revert --no-commit abc123
git commit -m "revert: undo problematic change"
```

---

## Working with Remotes

### View Remotes

```bash
# List remotes
git remote -v

# Expected output:
# origin  https://github.com/org/saas202521.git (fetch)
# origin  https://github.com/org/saas202521.git (push)
```

### Sync with Remote

```bash
# Fetch changes (don't merge)
git fetch origin

# Pull changes (fetch + merge)
git pull origin master

# Pull with rebase (cleaner history)
git pull --rebase origin master
```

### Push

```bash
# Push to remote
git push origin master

# Force push (CAREFUL!)
git push origin master --force

# Safer force push
git push origin master --force-with-lease

# Push new branch
git push -u origin feature/new-feature
```

---

## Stashing Changes

### Save Work in Progress

```bash
# Stash changes
git stash

# Stash with message
git stash save "WIP: new feature"

# List stashes
git stash list

# Apply latest stash (keep it)
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

---

## Comparing Changes

### Diff

```bash
# View unstaged changes
git diff

# View staged changes
git diff --staged

# Compare branches
git diff master feature/new-feature

# Compare commits
git diff abc123 def456

# Compare specific file
git diff master path/to/file.py

# Show only file names
git diff --name-only
```

---

## Tags

### Create Tags

```bash
# Lightweight tag
git tag v1.0.0

# Annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v0.9.0 abc123 -m "Beta release"
```

### Push Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### List Tags

```bash
# List all tags
git tag

# List tags matching pattern
git tag -l "v1.*"
```

---

## Cleanup

### Remove Untracked Files

```bash
# Show what would be deleted
git clean -n

# Delete untracked files
git clean -f

# Delete untracked files and directories
git clean -fd

# Delete including ignored files
git clean -fdx
```

### Prune Branches

```bash
# List all branches
git branch -a

# Delete local branch
git branch -d feature/old-feature

# Force delete unmerged branch
git branch -D feature/abandoned

# Delete remote branch
git push origin --delete feature/old-feature

# Prune deleted remote branches
git remote prune origin
```

---

## Merge Conflicts

### Resolve Conflicts

```bash
# When conflict occurs during merge:
git status  # See conflicting files

# Edit files to resolve conflicts
# Look for conflict markers: <<<<<<<, =======, >>>>>>>

# Mark as resolved
git add <resolved-file>

# Continue merge
git commit

# Abort merge
git merge --abort
```

### Merge Strategies

```bash
# Default merge (creates merge commit)
git merge feature/new-feature

# Fast-forward only (no merge commit)
git merge --ff-only feature/new-feature

# No fast-forward (always create merge commit)
git merge --no-ff feature/new-feature

# Squash merge (combine all commits)
git merge --squash feature/new-feature
git commit -m "feat: add complete feature"
```

---

## Advanced

### Cherry-pick

```bash
# Apply specific commit from another branch
git cherry-pick abc123

# Cherry-pick multiple commits
git cherry-pick abc123 def456

# Cherry-pick without committing (review first)
git cherry-pick --no-commit abc123
```

### Rebase

```bash
# Rebase current branch onto master
git rebase master

# Interactive rebase (last 5 commits)
git rebase -i HEAD~5

# Abort rebase
git rebase --abort

# Continue after resolving conflicts
git rebase --continue
```

### Bisect (Find Bug)

```bash
# Start bisect
git bisect start
git bisect bad  # Current commit is bad
git bisect good abc123  # Known good commit

# Git will checkout middle commit
# Test the commit, then:
git bisect good  # or git bisect bad

# Git continues until it finds the bad commit

# End bisect
git bisect reset
```

---

## Aliases

Add to `.gitconfig`:

```ini
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  lg = log --oneline --graph --all --decorate
  amend = commit --amend --no-edit
```

Usage:
```bash
git st  # git status
git co master  # git checkout master
git lg  # Pretty log
```

---

## Common Workflows

### Create Feature

```bash
git checkout -b feature/new-feature
# ... work on feature ...
git add .
git commit -m "feat(feature): add functionality"
git push origin feature/new-feature
# Create PR on GitHub
# After merge:
git checkout master
git pull origin master
git branch -d feature/new-feature
```

### Fix Bug

```bash
git checkout -b fix/bug-name
# ... fix bug ...
git add .
git commit -m "fix(area): prevent issue"
git push origin fix/bug-name
# Create PR and merge
```

### Update Dependencies

```bash
# Update package.json or requirements.txt
git add package.json
git commit -m "build: upgrade package to version"
git push origin master
```

---

## Pre-commit Hooks

### Install

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install
```

### Configuration

Create `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
```

---

## GitHub CLI Commands

```bash
# Create PR
gh pr create --title "feat: new feature" --body "Description"

# List PRs
gh pr list

# View PR
gh pr view 123

# Checkout PR
gh pr checkout 123

# Merge PR
gh pr merge 123
```

---

## Quick Reference Summary

### Most Used Commands

```bash
# Daily workflow
git pull origin master    # Start work
git status               # Check changes
git add .                # Stage all
git commit -m "type: msg"  # Commit
git push origin master   # Push

# Branching
git checkout -b feature/name  # Create branch
git merge feature/name        # Merge branch
git branch -d feature/name    # Delete branch

# Undo
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, discard changes
git checkout -- file     # Discard file changes

# Viewing
git log --oneline       # View history
git diff                # View changes
git show abc123         # View commit
```

---

## References

- **Style Guide:** `STYLE-GUIDE.md` (commit message format)
- **Conventional Commits:** https://www.conventionalcommits.org/
- **Git Documentation:** https://git-scm.com/doc
- **GitHub CLI:** https://cli.github.com/

---

**Remember:** Always pull before starting work, commit frequently with clear messages, and push regularly to avoid conflicts.
