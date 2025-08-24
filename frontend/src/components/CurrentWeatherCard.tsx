
import { CurrentWeather } from '../types/weather';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export const CurrentWeatherCard = ({ weather }: CurrentWeatherCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    // Map OpenWeatherMap icon codes to appropriate icons or use the icon code directly
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };

  const formatWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="weather-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Main weather info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
            <img
              src={getWeatherIcon(weather.icon)}
              alt={weather.description}
              className="w-20 h-20"
            />
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                {formatTemperature(weather.temp)}
              </h2>
              <p className="text-lg text-gray-600 capitalize">
                {weather.description}
              </p>
              <p className="text-sm text-gray-500">
                Feels like {formatTemperature(weather.feels_like)}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Weather details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="font-semibold text-gray-900">{weather.pressure} hPa</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-semibold text-gray-900">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wind className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-semibold text-gray-900">
                {weather.wind_speed} m/s {formatWindDirection(weather.wind_deg)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="font-semibold text-gray-900">
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
