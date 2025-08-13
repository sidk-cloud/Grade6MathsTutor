@echo off
echo Grade 6 Mathematics Tutor - Setup Script
echo ==========================================
echo.

echo Starting PowerShell setup script...
powershell -ExecutionPolicy Bypass -File "%~dp0start.ps1"

if %errorlevel% neq 0 (
    echo.
    echo PowerShell script encountered an error. Trying manual setup...
    echo.
    
    echo Checking Node.js installation...
    "C:\Program Files\nodejs\node.exe" --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: Node.js not found at standard location!
        echo Please install Node.js from https://nodejs.org/
        pause
        exit /b 1
    )
    
    echo Node.js found! Installing dependencies...
    "C:\Program Files\nodejs\npm.cmd" install
    
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    
    echo Starting development server...
    "C:\Program Files\nodejs\npm.cmd" run dev
)
