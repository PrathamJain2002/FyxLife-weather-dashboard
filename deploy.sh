#!/bin/bash

echo "🚀 Deploying FyxLife Weather Dashboard..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "🔧 Building backend..."
cd backend
npm run build
cd ..

echo "✅ Build complete!"
echo ""
echo "📋 Deployment Instructions:"
echo "1. Frontend: Deploy frontend/dist/ to Vercel"
echo "2. Backend: Deploy backend/dist/ to Railway/Render"
echo "3. Set environment variables in production"
echo "4. Ensure Redis is running in production"
echo ""
echo "🌐 Frontend will be available at: https://your-domain.vercel.app"
echo "🔌 Backend will be available at: https://your-backend.railway.app"
echo ""
echo "🎉 Deployment script completed!"
