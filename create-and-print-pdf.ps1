# Create PDF and Print to Default Printer
# Uses Chrome/Edge to print HTML to PDF

$htmlPath = "C:\devop\saas202521\PROJECT-SUMMARY.html"
$pdfPath = "C:\devop\saas202521\PROJECT-SUMMARY.pdf"

# Method 1: Try using Chrome/Edge for HTML to PDF conversion
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

$browserPath = $null
if (Test-Path $chromePath) {
    $browserPath = $chromePath
} elseif (Test-Path $edgePath) {
    $browserPath = $edgePath
}

if ($browserPath) {
    Write-Host "Converting HTML to PDF using browser..."
    & $browserPath --headless --disable-gpu --print-to-pdf="$pdfPath" "$htmlPath" 2>$null
    Start-Sleep -Seconds 3

    if (Test-Path $pdfPath) {
        Write-Host "PDF created successfully: $pdfPath"

        # Print the PDF to default printer
        Write-Host "Printing to default printer..."
        Start-Process -FilePath $pdfPath -Verb Print -Wait

        Write-Host "✅ Print job sent to default printer"
        Write-Host "PDF Location: $pdfPath"
    } else {
        Write-Host "❌ Failed to create PDF"
    }
} else {
    Write-Host "❌ Chrome or Edge not found. Opening HTML in default browser instead..."
    Start-Process $htmlPath
}
