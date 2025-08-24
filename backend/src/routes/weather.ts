import { Router, Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import { validateCoordinates } from '../middleware/validation';

const router = Router();
const weatherService = new WeatherService();

// Get current weather for a location
router.get('/current', validateCoordinates, async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const weather = await weatherService.getCurrentWeather(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );
    
    res.json({
      success: true,
      data: weather
    });
  } catch (error) {
    console.error('Error in current weather route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current weather'
    });
  }
});

// Get 5-day forecast for a location
router.get('/forecast', validateCoordinates, async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const forecast = await weatherService.getForecast(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );
    
    res.json({
      success: true,
      data: forecast
    });
  } catch (error) {
    console.error('Error in forecast route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forecast'
    });
  }
});

// Get complete weather data (current + forecast)
router.get('/complete', validateCoordinates, async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const weatherData = await weatherService.getWeatherData(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );
    
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Error in complete weather route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data'
    });
  }
});

// Search for cities
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      });
    }

    if (q.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Query must be at least 2 characters long'
      });
    }

    const cities = await weatherService.searchCity(q);
    
    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error('Error in city search route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search for cities'
    });
  }
});

export { router as weatherRoutes };
