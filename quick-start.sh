#!/bin/bash

echo "🚀 Quick Start for FyxLife Weather Dashboard"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Start Redis with Docker
echo "🔴 Starting Redis with Docker..."
docker-compose up -d redis

if [ $? -ne 0 ]; then
    echo "⚠️  Failed to start Redis with Docker. Please ensure Docker is running."
    echo "   You can also start Redis manually or use a cloud Redis service."
    echo ""
    echo "   To start Redis manually:"
    echo "   - Install Redis locally: brew install redis (macOS) or apt-get install redis (Ubuntu)"
    echo "   - Start Redis: redis-server"
    echo ""
    echo "   Or use a cloud service like Redis Cloud or Upstash"
    echo ""
else
    echo "✅ Redis started successfully"
    echo ""
fi

# Create environment file
echo "⚙️  Setting up environment variables..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "📝 Created backend/.env file"
    echo "   Please edit backend/.env and add your OpenWeatherMap API key"
    echo "   Get your API key at: https://openweathermap.org/api"
    echo ""
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Edit backend/.env and add your OpenWeatherMap API key"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🔗 Useful URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Redis Commander: http://localhost:8081 (if using Docker)"
echo ""
echo "🎉 You're all set! Happy coding!"
