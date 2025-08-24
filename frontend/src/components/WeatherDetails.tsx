
import { CurrentWeather } from '../types/weather';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sunrise, 
  Sunset,
  Compass 
} from 'lucide-react';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const formatWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWindSpeedCategory = (speed: number) => {
    if (speed < 0.5) return 'Calm';
    if (speed < 1.5) return 'Light Air';
    if (speed < 3.3) return 'Light Breeze';
    if (speed < 5.5) return 'Gentle Breeze';
    if (speed < 8.0) return 'Moderate Breeze';
    if (speed < 10.8) return 'Fresh Breeze';
    if (speed < 13.9) return 'Strong Breeze';
    if (speed < 17.2) return 'Near Gale';
    if (speed < 20.8) return 'Gale';
    if (speed < 24.5) return 'Strong Gale';
    return 'Storm';
  };

  const getPressureCategory = (pressure: number) => {
    if (pressure < 1000) return 'Low';
    if (pressure < 1013) return 'Below Average';
    if (pressure < 1020) return 'Average';
    if (pressure < 1030) return 'Above Average';
    return 'High';
  };

  const getVisibilityCategory = (visibility: number) => {
    const km = visibility / 1000;
    if (km < 0.1) return 'Very Poor';
    if (km < 1) return 'Poor';
    if (km < 4) return 'Moderate';
    if (km < 10) return 'Good';
    if (km < 20) return 'Very Good';
    return 'Excellent';
  };

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Temperature Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="font-semibold text-gray-900">{Math.round(weather.temp)}°C</p>
            </div>
          </div>
          
          <div className="ml-11">
            <p className="text-xs text-gray-500">Feels like</p>
            <p className="text-sm text-gray-700">{Math.round(weather.feels_like)}°C</p>
          </div>
        </div>

        {/* Pressure Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="font-semibold text-gray-900">{weather.pressure} hPa</p>
            </div>
          </div>
          
          <div className="ml-11">
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm text-gray-700">{getPressureCategory(weather.pressure)}</p>
          </div>
        </div>

        {/* Wind Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Wind className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-semibold text-gray-900">{weather.wind_speed} m/s</p>
            </div>
          </div>
          
          <div className="ml-11">
            <p className="text-xs text-gray-500">Direction</p>
            <p className="text-sm text-gray-700">{formatWindDirection(weather.wind_deg)}</p>
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm text-gray-700">{getWindSpeedCategory(weather.wind_speed)}</p>
          </div>
        </div>

        {/* Humidity & Visibility */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-semibold text-gray-900">{weather.humidity}%</p>
            </div>
          </div>
          
          <div className="ml-11">
            <p className="text-xs text-gray-500">Visibility</p>
            <p className="text-sm text-gray-700">{(weather.visibility / 1000).toFixed(1)} km</p>
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm text-gray-700">{getVisibilityCategory(weather.visibility)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
