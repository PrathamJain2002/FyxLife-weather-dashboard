# 🚀 FyxLife Weather Dashboard - Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - [github.com](https://github.com)
2. **OpenWeatherMap API Key** - [openweathermap.org/api](https://openweathermap.org/api)
3. **Vercel Account** - [vercel.com](https://vercel.com) (Free)
4. **Railway Account** - [railway.app](https://railway.app) (Free tier)

## 🔑 Step 1: Get Your API Keys

### OpenWeatherMap API Key
1. Go to [openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. **Save this key** - you'll need it for the backend

## 📁 Step 2: Prepare Your Repository

### Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Weather Dashboard"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository

### 3.2 Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install`

### 3.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. **Copy your Vercel URL** (e.g., `https://your-project.vercel.app`)

## 🔌 Step 4: Deploy Backend to Railway

### 4.1 Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### 4.2 Configure Build Settings
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 4.3 Set Environment Variables
Click "Variables" tab and add:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
OPENWEATHER_API_KEY=your_actual_api_key_here
JWT_SECRET=your_random_secret_string_here
```

### 4.4 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. **Copy your Railway URL** (e.g., `https://your-project.railway.app`)

## 🔄 Step 5: Update Frontend Configuration

### 5.1 Update API Base URL
Edit `frontend/src/services/weatherService.ts`:
```typescript
const API_BASE_URL = 'https://your-backend-domain.railway.app/api';
```

### 5.2 Redeploy Frontend
1. Make the changes
2. Commit and push to GitHub
3. Vercel will automatically redeploy

## 🧪 Step 6: Test Your Deployment

### Test Frontend
- Visit your Vercel URL
- Try searching for a city
- Check if weather data loads

### Test Backend
- Visit `https://your-backend-domain.railway.app/health`
- Should return: `{"status":"OK","timestamp":"..."}`

## 🐛 Troubleshooting

### Common Issues

#### Frontend Build Fails
- Check if all dependencies are in `package.json`
- Ensure `vite.config.ts` is properly configured
- Check build logs in Vercel dashboard

#### Backend Build Fails
- Ensure TypeScript compiles: `npm run build`
- Check if all dependencies are installed
- Verify environment variables are set

#### CORS Errors
- Update `FRONTEND_URL` in Railway environment variables
- Ensure the URL matches exactly (including `https://`)

#### API Key Issues
- Verify OpenWeatherMap API key is correct
- Check if API key has proper permissions
- Test API key directly: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY`

## 📊 Monitoring

### Vercel (Frontend)
- View analytics in Vercel dashboard
- Monitor build performance
- Check for errors

### Railway (Backend)
- Monitor logs in Railway dashboard
- Check resource usage
- View deployment status

## 🔒 Security Notes

1. **Never commit API keys** to GitHub
2. **Use environment variables** for sensitive data
3. **Enable CORS** only for your frontend domain
4. **Rate limiting** is already configured
5. **Helmet.js** provides security headers

## 💰 Cost Breakdown

- **Vercel**: Free tier (unlimited deployments)
- **Railway**: Free tier (500 hours/month)
- **OpenWeatherMap**: Free tier (1000 calls/day)
- **Total**: $0/month

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain to Vercel
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **Monitoring**: Set up error tracking (Sentry)
4. **CI/CD**: Automate deployments with GitHub Actions

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **OpenWeatherMap Docs**: [openweathermap.org/api](https://openweathermap.org/api)

---

**🎉 Congratulations! Your weather dashboard is now live on the internet!**
