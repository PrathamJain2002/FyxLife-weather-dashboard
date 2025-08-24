@echo off
echo 🚀 Quick Start for FyxLife Weather Dashboard
echo ==============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install:all

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

REM Start Redis with Docker
echo 🔴 Starting Redis with Docker...
docker-compose up -d redis

if %errorlevel% neq 0 (
    echo ⚠️  Failed to start Redis with Docker. Please ensure Docker is running.
    echo    You can also start Redis manually or use a cloud Redis service.
    echo.
    echo    To start Redis manually:
    echo    - Install Redis locally from https://redis.io/download
    echo    - Start Redis: redis-server
    echo.
    echo    Or use a cloud service like Redis Cloud or Upstash
    echo.
) else (
    echo ✅ Redis started successfully
    echo.
)

REM Create environment file
echo ⚙️  Setting up environment variables...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env" >nul
    echo 📝 Created backend\.env file
    echo    Please edit backend\.env and add your OpenWeatherMap API key
    echo    Get your API key at: https://openweathermap.org/api
    echo.
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎯 Next Steps:
echo 1. Edit backend\.env and add your OpenWeatherMap API key
echo 2. Run 'npm run dev' to start both frontend and backend
echo 3. Open http://localhost:3000 in your browser
echo.
echo 🔗 Useful URLs:
echo    Frontend: http://localhost:3000
echo    Backend: http://localhost:5000
echo    Redis Commander: http://localhost:8081 (if using Docker)
echo.
echo 🎉 You're all set! Happy coding!
pause
