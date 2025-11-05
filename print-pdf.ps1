# Print PDF to Default Printer
$pdfPath = "C:\devop\saas202521\PROJECT-SUMMARY.pdf"

Write-Host "PDF Location: $pdfPath" -ForegroundColor Cyan

# Check if PDF exists
if (-not (Test-Path $pdfPath)) {
    Write-Host "❌ PDF not found at: $pdfPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ PDF found" -ForegroundColor Green

# Get default printer
$defaultPrinter = Get-CimInstance -ClassName Win32_Printer | Where-Object {$_.Default -eq $true}
if ($defaultPrinter) {
    Write-Host "📄 Default Printer: $($defaultPrinter.Name)" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  No default printer configured" -ForegroundColor Yellow
}

# Method 1: Try SumatraPDF (best for command-line printing)
$sumatraPDF = "C:\Program Files\SumatraPDF\SumatraPDF.exe"
if (Test-Path $sumatraPDF) {
    Write-Host "🖨️  Printing with SumatraPDF..." -ForegroundColor Cyan
    Start-Process -FilePath $sumatraPDF -ArgumentList "-print-to-default", "`"$pdfPath`"" -Wait
    Write-Host "✅ Print job sent successfully!" -ForegroundColor Green
    exit 0
}

# Method 2: Try Adobe Acrobat
$adobeAcrobat = @(
    "C:\Program Files\Adobe\Acrobat DC\Acrobat\Acrobat.exe",
    "C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe",
    "C:\Program Files\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe"
)

foreach ($adobePath in $adobeAcrobat) {
    if (Test-Path $adobePath) {
        Write-Host "🖨️  Printing with Adobe Reader..." -ForegroundColor Cyan
        Start-Process -FilePath $adobePath -ArgumentList "/t `"$pdfPath`""
        Write-Host "✅ Print job sent! Adobe will open briefly then close." -ForegroundColor Green
        exit 0
    }
}

# Method 3: Use default PDF handler via PowerShell
Write-Host "🖨️  Attempting to print via Windows shell..." -ForegroundColor Cyan
try {
    $shell = New-Object -ComObject Shell.Application
    $file = $shell.Namespace((Split-Path $pdfPath)).ParseName((Split-Path $pdfPath -Leaf))
    $file.InvokeVerb("print")
    Write-Host "✅ Print dialog opened. Please confirm printing in the dialog." -ForegroundColor Green
    exit 0
} catch {
    Write-Host "❌ Failed to print via shell: $($_.Exception.Message)" -ForegroundColor Red
}

# Fallback: Just open the PDF
Write-Host "⚠️  Could not auto-print. Opening PDF for manual printing..." -ForegroundColor Yellow
Write-Host "👉 Please use Ctrl+P to print manually" -ForegroundColor Yellow
Start-Process $pdfPath
