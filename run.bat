@echo off
echo =========================================================================
echo GeoClassifier - Image Processing and Classification Project Startup
echo =========================================================================
cd /d "%~dp0"
:: 1. Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in system PATH.
    echo Please install Python 3.8+ and try again.
    pause
    exit /b 1
)
:: 2. Setup Virtual Environment
if not exist ".venv" (
    echo Creating Python virtual environment (.venv)...
    python -m venv .venv
)
echo Activating virtual environment...
call .venv\Scripts\activate.bat
:: 3. Install Requirements
echo Installing dependencies from requirements.txt...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Dependency installation failed.
    pause
    exit /b 1
)
:: 4. Generate Spectral Data
echo Generating simulated satellite data (IRS-LISS-3)...
python generate_mock_data.py
if %errorlevel% neq 0 (
    echo [ERROR] Satellite data simulation failed.
    pause
    exit /b 1
)
:: 5. Launch Application
echo Starting Flask web server...
start "" "http://127.0.0.1:5000"
python app.py
pause