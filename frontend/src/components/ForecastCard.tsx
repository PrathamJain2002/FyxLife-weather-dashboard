
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
}

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°`;
  };

  return (
    <div className="weather-card text-center">
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-900">
          {formatDate(forecast.date)}
        </p>
      </div>

      <div className="mb-3">
        <img
          src={getWeatherIcon(forecast.icon)}
          alt={forecast.description}
          className="w-12 h-12 mx-auto"
        />
      </div>

      <div className="mb-2">
        <p className="text-xs text-gray-600 capitalize">
          {forecast.description}
        </p>
      </div>

      <div className="flex justify-center space-x-2 text-sm">
        <span className="text-gray-900 font-semibold">
          {formatTemperature(forecast.temp_max)}
        </span>
        <span className="text-gray-500">
          {formatTemperature(forecast.temp_min)}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>💧 {forecast.humidity}%</span>
          <span>💨 {forecast.wind_speed} m/s</span>
        </div>
      </div>
    </div>
  );
};
