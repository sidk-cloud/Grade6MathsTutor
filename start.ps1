# Grade 6 Mathematics Tutor - Setup Script
Write-Host "Grade 6 Mathematics Tutor - Setup Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking if Node.js is installed..." -ForegroundColor Yellow

# Add Node.js to PATH for this session
$env:PATH += ";C:\Program Files\nodejs;C:\Program Files (x86)\nodejs"

try {
    $nodeVersion = & node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Node.js found! Version: $nodeVersion" -ForegroundColor Green
    }
    else {
        throw "Node command failed"
    }
}
catch {
    Write-Host "Trying alternative Node.js locations..." -ForegroundColor Yellow
    
    $nodePaths = @(
        "C:\Program Files\nodejs\node.exe",
        "C:\Program Files (x86)\nodejs\node.exe"
    )
    
    $nodeFound = $false
    foreach ($nodePath in $nodePaths) {
        if (Test-Path $nodePath) {
            try {
                $nodeVersion = & $nodePath --version 2>&1
                Write-Host "Node.js found at: $nodePath" -ForegroundColor Green
                Write-Host "Version: $nodeVersion" -ForegroundColor Green
                
                # Update PATH for this session
                $nodeDir = Split-Path $nodePath -Parent
                $env:PATH = "$nodeDir;$env:PATH"
                
                $nodeFound = $true
                break
            }
            catch {
                continue
            }
        }
    }
    
    if (-not $nodeFound) {
        Write-Host "ERROR: Node.js is not found or not working!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please ensure Node.js is properly installed from https://nodejs.org/" -ForegroundColor Yellow
        Write-Host "Download the LTS version for Windows." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You may need to restart your computer after installation." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
try {
    & npm install
    if ($LASTEXITCODE -ne 0) {
        throw "npm install failed"
    }
}
catch {
    Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
    Write-Host "Please check your internet connection and try again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Setup complete! Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "The application will open in your browser at http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server when you're done." -ForegroundColor Yellow
Write-Host ""

try {
    & npm run dev
}
catch {
    Write-Host "ERROR: Failed to start development server!" -ForegroundColor Red
    Write-Host "You can try running 'npm run dev' manually." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
