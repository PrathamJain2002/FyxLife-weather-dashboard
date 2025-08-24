export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
  addedAt: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_deg: number;
  visibility: number;
  dt: number;
}

export interface ForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

export interface CitySearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
