#!/bin/bash

echo "🚀 FyxLife Weather Dashboard - Free Hosting Deployment"
echo "======================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
    echo ""
fi

# Check current git status
echo "📊 Current Git Status:"
git status --short
echo ""

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 No remote origin found. Please set up your GitHub repository first:"
    echo "   1. Create a new repository on GitHub"
    echo "   2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo ""
    echo "   Then run this script again."
    exit 1
fi

echo "🔗 Remote origin found:"
git remote get-url origin
echo ""

# Check if all changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Your commit message'"
    echo ""
    echo "   Then run this script again."
    exit 1
fi

echo "✅ All changes are committed"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main
if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 🌐 Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Build Command: npm run build"
echo "   - Output Directory: frontend/dist"
echo "   - Install Command: cd frontend && npm install"
echo ""
echo "2. 🔌 Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Import your GitHub repository"
echo "   - Root Directory: backend"
echo "   - Build Command: npm run build"
echo "   - Start Command: npm start"
echo ""
echo "3. 🔑 Set Environment Variables in Railway:"
echo "   - NODE_ENV=production"
echo "   - PORT=5000"
echo "   - FRONTEND_URL=https://your-frontend-domain.vercel.app"
echo "   - OPENWEATHER_API_KEY=your_api_key_here"
echo "   - JWT_SECRET=your_random_secret_here"
echo ""
echo "4. 🔄 Update Frontend API URL and redeploy"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "�� Happy deploying!"
