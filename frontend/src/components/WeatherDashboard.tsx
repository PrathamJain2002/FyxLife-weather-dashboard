
import { useQuery } from '@tanstack/react-query';
import { City } from '../types/weather';
import { WeatherService } from '../services/weatherService';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { ForecastCard } from './ForecastCard';
import { WeatherDetails } from './WeatherDetails';
import { Loader2, AlertCircle } from 'lucide-react';

const weatherService = new WeatherService();

interface WeatherDashboardProps {
  city: City;
}

export const WeatherDashboard = ({ city }: WeatherDashboardProps) => {
  const { data: weatherData, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', city.lat, city.lon],
    queryFn: () => weatherService.getCompleteWeatherData(city.lat, city.lon),
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading weather data for {city.name}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Failed to Load Weather
        </h2>
        <p className="text-gray-600 mb-6">
          {error instanceof Error ? error.message : 'An error occurred while fetching weather data'}
        </p>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* City Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {city.name}
        </h1>
        <p className="text-gray-600">
          {city.state && `${city.state}, `}{city.country}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Last updated: {new Date(weatherData.current.dt * 1000).toLocaleTimeString()}
        </p>
      </div>

      {/* Current Weather */}
      <CurrentWeatherCard weather={weatherData.current} />

      {/* Weather Details */}
      <WeatherDetails weather={weatherData.current} />

      {/* 5-Day Forecast */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <ForecastCard key={index} forecast={day} />
          ))}
        </div>
      </div>
    </div>
  );
};
