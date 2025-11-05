@echo off
echo ===================================
echo Markdown to DOCX Converter (Pandoc)
echo ===================================
echo.

REM Set Pandoc path
set PANDOC="%LOCALAPPDATA%\Pandoc\pandoc.exe"

REM Check if Pandoc is installed
%PANDOC% --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Pandoc is not installed
    echo Please run: install-pandoc.ps1
    pause
    exit /b 1
)

echo Converting markdown files to .docx...
echo.

REM Convert all .md files in current directory
for %%f in (*.md) do (
    echo Converting: %%f -^> %%~nf.docx
    %PANDOC% "%%f" -o "%%~nf.docx" 2>nul
    if errorlevel 1 (
        echo   WARNING: Conversion failed for %%f
    ) else (
        echo   SUCCESS: Created %%~nf.docx
    )
    echo.
)

echo ===================================
echo Conversion complete!
echo ===================================
pause
