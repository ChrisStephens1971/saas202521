"""
Project validation and health checks.
"""

from pathlib import Path
from typing import Dict, List
import subprocess
import re
from config import IGNORE_PATTERNS


class ValidationResult:
    """Result of a validation check."""

    def __init__(self, name: str, passed: bool, message: str = ""):
        self.name = name
        self.passed = passed
        self.message = message

    def __repr__(self):
        status = "[OK]" if self.passed else "[FAIL]"
        msg = f" - {self.message}" if self.message else ""
        return f"{status} {self.name}{msg}"


class ProjectValidator:
    """Validates project setup and configuration."""

    def __init__(self, project_path: Path):
        """
        Initialize validator.

        Args:
            project_path: Path to the project directory
        """
        self.project_path = project_path
        self.results: List[ValidationResult] = []

        # Extract directory names from ignore patterns (ignore wildcard patterns)
        self.ignore_dirs = {
            pattern for pattern in IGNORE_PATTERNS
            if not pattern.startswith('*') and not pattern.endswith('*')
        }

    def _should_ignore_path(self, file_path: Path) -> bool:
        """Check if a path should be ignored based on IGNORE_PATTERNS."""
        # Check if any ignored directory is in the path
        return any(ignore_dir in file_path.parts for ignore_dir in self.ignore_dirs)

    def check_no_placeholders(self) -> ValidationResult:
        """Check that no template placeholders remain."""
        placeholder_pattern = re.compile(r'\{\{[A-Z_]+\}\}')
        files_with_placeholders = []

        for file_path in self.project_path.rglob('*'):
            # Skip ignored directories (vendor dirs, build artifacts, etc.)
            # Also skip .config (may have intentional placeholders)
            if file_path.is_file() and not self._should_ignore_path(file_path) and '.config' not in file_path.parts and 'docs' not in file_path.parts and '.githooks' not in file_path.parts and 'technical' not in file_path.parts and file_path.name != 'README.md':
                try:
                    content = file_path.read_text(encoding='utf-8')
                    if placeholder_pattern.search(content):
                        # Show full path for debugging
                        files_with_placeholders.append(str(file_path.relative_to(self.project_path)))
                except (UnicodeDecodeError, PermissionError):
                    pass  # Skip binary files

        if files_with_placeholders:
            files_list = ', '.join(files_with_placeholders)
            return ValidationResult(
                'No placeholders',
                False,
                f"{len(files_with_placeholders)} files have unreplaced placeholders: {files_list}"
            )
        else:
            return ValidationResult('No placeholders', True)

    def check_git_initialized(self) -> ValidationResult:
        """Check that git repository is initialized."""
        git_dir = self.project_path / '.git'

        if git_dir.exists() and git_dir.is_dir():
            return ValidationResult('Git initialized', True)
        else:
            return ValidationResult('Git initialized', False, 'No .git directory')

    def check_github_repo(self) -> ValidationResult:
        """Check that GitHub remote is configured."""
        try:
            result = subprocess.run(
                ['git', 'remote', 'get-url', 'origin'],
                cwd=self.project_path,
                capture_output=True,
                text=True,
                timeout=5
            )

            if result.returncode == 0 and 'github.com' in result.stdout:
                return ValidationResult('GitHub remote', True, result.stdout.strip())
            else:
                return ValidationResult('GitHub remote', False, 'No GitHub remote configured')

        except (subprocess.TimeoutExpired, FileNotFoundError, OSError) as e:
            return ValidationResult('GitHub remote', False, f'Error: {e}')

    def check_required_files(self) -> ValidationResult:
        """Check that required files exist."""
        required_files = [
            'CLAUDE.md',
            '_START-HERE.md',
            'README.md',
            '.gitignore'
        ]

        missing_files = [
            f for f in required_files
            if not (self.project_path / f).exists()
        ]

        if missing_files:
            return ValidationResult(
                'Required files',
                False,
                f"Missing: {', '.join(missing_files)}"
            )
        else:
            return ValidationResult('Required files', True)

    def check_directory_structure(self) -> ValidationResult:
        """Check that expected directories exist."""
        required_dirs = [
            'product',
            'sprints',
            'technical',
            'business'
        ]

        missing_dirs = [
            d for d in required_dirs
            if not (self.project_path / d).exists()
        ]

        if missing_dirs:
            return ValidationResult(
                'Directory structure',
                False,
                f"Missing: {', '.join(missing_dirs)}"
            )
        else:
            return ValidationResult('Directory structure', True)

    def check_claude_md_sections(self) -> ValidationResult:
        """Check that CLAUDE.md has required sections."""
        claude_md = self.project_path / 'CLAUDE.md'

        if not claude_md.exists():
            return ValidationResult('CLAUDE.md sections', False, 'File not found')

        try:
            content = claude_md.read_text(encoding='utf-8')

            # Core required sections (Multi-Tenant is optional depending on template)
            required_sections = [
                'Role Division',
                'Git Automation',
                'Additional Resources'
            ]

            missing_sections = [
                s for s in required_sections
                if s not in content
            ]

            if missing_sections:
                return ValidationResult(
                    'CLAUDE.md sections',
                    False,
                    f"Missing: {', '.join(missing_sections)}"
                )
            else:
                return ValidationResult('CLAUDE.md sections', True)

        except (UnicodeDecodeError, PermissionError, OSError) as e:
            return ValidationResult('CLAUDE.md sections', False, f'Error reading file: {e}')

    def check_workspace_file(self) -> ValidationResult:
        """Check for VS Code workspace file."""
        workspace_file = self.project_path / f'{self.project_path.name}.code-workspace'

        if workspace_file.exists():
            return ValidationResult('VS Code workspace', True)
        else:
            return ValidationResult('VS Code workspace', False, 'File not found')

    def validate_all(self, fail_fast: bool = False) -> Dict:
        """
        Run all validation checks.

        Args:
            fail_fast: Stop on first failure if True

        Returns:
            Dict with validation results
        """
        checks = [
            self.check_no_placeholders,
            self.check_git_initialized,
            self.check_github_repo,
            self.check_required_files,
            self.check_directory_structure,
            self.check_claude_md_sections,
            self.check_workspace_file
        ]

        self.results = []
        failed_checks = []

        for check in checks:
            result = check()
            self.results.append(result)

            if not result.passed:
                failed_checks.append(result)
                if fail_fast:
                    break

        return {
            'passed': len(failed_checks) == 0,
            'total': len(self.results),
            'failed': len(failed_checks),
            'results': self.results,
            'failed_checks': failed_checks
        }

    def print_report(self):
        """Print validation report."""
        print(f"\n=== Validation Report for {self.project_path.name} ===")
        print("=" * 60)

        passed_count = sum(1 for r in self.results if r.passed)
        total_count = len(self.results)

        for result in self.results:
            print(f"  {result}")

        print("=" * 60)
        print(f"  Result: {passed_count}/{total_count} checks passed")

        if passed_count == total_count:
            print("  [OK] All validation checks passed!")
        else:
            print(f"  [WARNING] {total_count - passed_count} checks failed")


def validate_project(project_path: Path, fail_fast: bool = False) -> bool:
    """
    Validate a project setup.

    Args:
        project_path: Path to the project
        fail_fast: Stop on first failure

    Returns:
        True if all validations passed
    """
    validator = ProjectValidator(project_path)
    results = validator.validate_all(fail_fast=fail_fast)
    validator.print_report()

    return results['passed']


if __name__ == '__main__':
    # Detect project path from script location
    script_dir = Path(__file__).parent  # scripts/
    project_path = script_dir.parent     # project root

    success = validate_project(project_path)

    if not success:
        print("\n[ERROR] Validation failed - please review and fix issues")
        exit(1)
    else:
        print("\n[SUCCESS] Project validation successful!")
