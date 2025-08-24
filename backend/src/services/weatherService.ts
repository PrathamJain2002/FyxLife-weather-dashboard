import axios from 'axios';
import { getRedisClient } from '../config/redis';

interface WeatherData {
  current: any;
  forecast: any[];
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

interface CacheOptions {
  ttl: number;
  key: string;
}

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    
    if (!this.apiKey) {
      throw new Error('OPENWEATHER_API_KEY environment variable is required');
    }
  }

  private async getFromCache<T>(key: string): Promise<T | null> {
    try {
      const redis = getRedisClient();
      const cached = await redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  private async setCache<T>(key: string, data: T, ttl: number): Promise<void> {
    try {
      const redis = getRedisClient();
      await redis.setEx(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  private generateCacheKey(type: string, lat: number, lon: number): string {
    return `weather:${type}:${lat.toFixed(2)}:${lon.toFixed(2)}`;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<any> {
    const cacheKey = this.generateCacheKey('current', lat, lon);
    
    // Try to get from cache first
    const cached = await this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const weatherData = {
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        wind_speed: response.data.wind.speed,
        wind_deg: response.data.wind.deg,
        visibility: response.data.visibility,
        dt: response.data.dt
      };

      // Cache for 10 minutes
      await this.setCache(cacheKey, weatherData, 600);
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather data');
    }
  }

  async getForecast(lat: number, lon: number): Promise<any[]> {
    const cacheKey = this.generateCacheKey('forecast', lat, lon);
    
    // Try to get from cache first
    const cached = await this.getFromCache<any[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      // Group forecast by day and get daily data
      const dailyForecast = this.processForecastData(response.data.list);
      
      // Cache for 1 hour
      await this.setCache(cacheKey, dailyForecast, 3600);
      
      return dailyForecast;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  private processForecastData(forecastList: any[]): any[] {
    const dailyData = new Map();
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split('T')[0];
      
      if (!dailyData.has(dayKey)) {
        dailyData.set(dayKey, {
          date: dayKey,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed
        });
      } else {
        // Update min/max temperatures
        const existing = dailyData.get(dayKey);
        existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
        existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
      }
    });

    return Array.from(dailyData.values()).slice(0, 5); // Return 5 days
  }

  async searchCity(query: string): Promise<any[]> {
    try {
      const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query,
          limit: 5,
          appid: this.apiKey
        }
      });

      return response.data.map((city: any) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        state: city.state
      }));
    } catch (error) {
      console.error('Error searching city:', error);
      throw new Error('Failed to search for city');
    }
  }

  async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const [current, forecast] = await Promise.all([
      this.getCurrentWeather(lat, lon),
      this.getForecast(lat, lon)
    ]);

    // Get location info from current weather
    const location = {
      name: 'Unknown',
      country: 'Unknown',
      lat,
      lon
    };

    return {
      current,
      forecast,
      location
    };
  }
}
