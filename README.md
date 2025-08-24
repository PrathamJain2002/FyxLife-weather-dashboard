# FyxLife Weather Dashboard

A modern, responsive weather dashboard application that allows users to track weather conditions for multiple cities with real-time data, 5-day forecasts, and intelligent caching.

## 🌟 Features

### Core Functionality
- **Multi-City Weather Tracking**: Add, remove, and manage multiple cities
- **Real-Time Weather Data**: Current conditions with detailed metrics
- **5-Day Forecast**: Extended weather predictions with daily summaries
- **Smart Caching**: Redis-based caching to minimize API calls
- **City Search**: Intelligent city search with geocoding
- **Responsive Design**: Mobile-first design that works on all devices

### Weather Information Display
- Current temperature and "feels like" temperature
- Weather conditions with descriptive icons
- Humidity, pressure, and wind information
- Visibility and atmospheric pressure
- Detailed 5-day forecast with min/max temperatures

### User Experience Features
- Clean, modern interface with smooth animations
- Intuitive city management
- Real-time data updates
- Error handling with user-friendly messages
- Keyboard shortcuts (ESC to close modals)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server
- **React Query (TanStack Query)** - Efficient data fetching and caching
- **Lucide React** - Beautiful, consistent icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type safety across the full stack
- **Redis** - High-performance in-memory data store for caching

### Weather Data
- **OpenWeatherMap API** - Comprehensive weather data provider
- **Geocoding API** - City search and location services

### Development & Deployment
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Concurrently** - Run multiple commands simultaneously

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Redis server (local or cloud)
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fyxlife-weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Configure environment variables**
   ```bash
   # Required variables in backend/.env
   OPENWEATHER_API_KEY=your_api_key_here
   REDIS_URL=redis://localhost:6379
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start Redis server**
   ```bash
   # Local Redis
   redis-server
   
   # Or use Docker
   docker run -d -p 6379:6379 redis:alpine
   ```

6. **Start the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or start separately
   npm run dev:backend  # Backend on port 5000
   npm run dev:frontend # Frontend on port 3000
   ```

### API Endpoints

#### Weather Data
- `GET /api/weather/current?lat={lat}&lon={lon}` - Current weather
- `GET /api/weather/forecast?lat={lat}&lon={lon}` - 5-day forecast
- `GET /api/weather/complete?lat={lat}&lon={lon}` - Complete weather data
- `GET /api/weather/search?q={query}` - City search

#### City Management
- `GET /api/cities` - Get all saved cities
- `POST /api/cities` - Add a new city
- `DELETE /api/cities/:id` - Remove a city
- `GET /api/cities/:id` - Get city by ID

## 📱 Usage

1. **Add Cities**: Click "Add City" button and search for cities
2. **View Weather**: Select a city from the sidebar to view current conditions
3. **Forecast**: Scroll down to see the 5-day weather forecast
4. **Manage Cities**: Remove cities using the X button on each city card
5. **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🔧 Configuration

### Redis Configuration
- Default: `redis://localhost:6379`
- Cloud options: Redis Cloud, Upstash, Railway
- Environment variable: `REDIS_URL`

### Weather API
- Provider: OpenWeatherMap
- Free tier: 1,000 calls/day
- Environment variable: `OPENWEATHER_API_KEY`

### Caching Strategy
- Current weather: 10 minutes TTL
- Forecast data: 1 hour TTL
- City search: 5 minutes TTL

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy dist/ folder to your preferred platform
```

### Environment Variables for Production
```bash
NODE_ENV=production
REDIS_URL=your_redis_cloud_url
OPENWEATHER_API_KEY=your_api_key
FRONTEND_URL=https://your-domain.vercel.app
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 📊 Performance Features

- **Intelligent Caching**: Redis-based caching reduces API calls
- **Debounced Search**: 300ms debounce on city search
- **Optimistic Updates**: Immediate UI feedback for user actions
- **Lazy Loading**: Weather data loaded only when needed
- **Compression**: Gzip compression for API responses

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Coordinate validation and sanitization
- **Helmet.js**: Security headers and protection
- **Error Handling**: Secure error messages without data leakage

## 🎨 Design System

### Color Palette
- Primary: Blue gradient (#3B82F6 to #2563EB)
- Secondary: Gray scale (#F9FAFB to #111827)
- Accent: Weather-specific colors (sunny, cloudy, rainy, snowy)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Responsive sizing with Tailwind's scale

### Components
- Weather cards with hover effects
- Responsive grid layouts
- Smooth transitions and animations
- Glass morphism effects

## 🔮 Future Improvements

### Planned Features
- **User Authentication**: JWT-based user accounts
- **Weather Alerts**: Severe weather notifications
- **Historical Data**: Weather trends and statistics
- **Weather Maps**: Interactive weather visualization
- **Mobile App**: React Native version
- **Offline Support**: Service worker for offline access

### Technical Enhancements
- **Database Integration**: PostgreSQL for persistent storage
- **Real-time Updates**: WebSocket connections
- **Advanced Caching**: Multi-level caching strategy
- **Performance Monitoring**: Application performance metrics
- **Testing Coverage**: Comprehensive unit and integration tests

## 🐛 Known Limitations

- **API Rate Limits**: OpenWeatherMap free tier restrictions
- **Geolocation**: No automatic location detection
- **Offline Mode**: Requires internet connection
- **Data Persistence**: Cities stored in Redis (session-based)
- **Browser Support**: Modern browsers only (ES2020+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for comprehensive weather data
- **Tailwind CSS** for the amazing utility-first framework
- **React Team** for the incredible React ecosystem
- **Vercel** for seamless frontend deployment