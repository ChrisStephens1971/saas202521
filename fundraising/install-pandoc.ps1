# Download and install Pandoc
$url = "https://github.com/jgm/pandoc/releases/download/3.1.11.1/pandoc-3.1.11.1-windows-x86_64.msi"
$output = "$env:TEMP\pandoc-installer.msi"

Write-Host "Downloading Pandoc installer..."
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "Installing Pandoc..."
Start-Process msiexec.exe -ArgumentList "/i", $output, "/quiet", "/norestart" -Wait

Write-Host "Cleaning up..."
Remove-Item $output

Write-Host "Pandoc installation complete!"
Write-Host "Please restart your terminal or run: refreshenv"
