import axios from 'axios';
import { City, WeatherData, CitySearchResult, ApiResponse } from '../types/weather';

const API_BASE_URL = '/api';

export class WeatherService {

  private async makeRequest<T>(endpoint: string, options?: any): Promise<T> {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, options);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Network error occurred');
    }
  }

  private async makePostRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Network error occurred');
    }
  }

  private async makeDeleteRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Network error occurred');
    }
  }

  // Weather data methods
  getCurrentWeather = async (lat: number, lon: number): Promise<any> => {
    const response = await this.makeRequest<ApiResponse<any>>(`/weather/current?lat=${lat}&lon=${lon}`);
    return response.data;
  }

  getForecast = async (lat: number, lon: number): Promise<any[]> => {
    const response = await this.makeRequest<ApiResponse<any[]>>(`/weather/forecast?lat=${lat}&lon=${lon}`);
    return response.data;
  }

  getCompleteWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await this.makeRequest<ApiResponse<WeatherData>>(`/weather/complete?lat=${lat}&lon=${lon}`);
    return response.data;
  }

  // City search methods
  searchCities = async (query: string): Promise<CitySearchResult[]> => {
    const response = await this.makeRequest<ApiResponse<CitySearchResult[]>>(`/weather/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // Saved cities methods
  getSavedCities = async (): Promise<City[]> => {
    const response = await this.makeRequest<ApiResponse<City[]>>('/cities');
    return response.data;
  }

  addCity = async (cityData: Omit<City, 'id' | 'addedAt'>): Promise<City> => {
    const response = await this.makePostRequest<ApiResponse<City>>('/cities', cityData);
    return response.data;
  }

  removeCity = async (cityId: string): Promise<void> => {
    await this.makeDeleteRequest<ApiResponse<void>>(`/cities/${cityId}`);
  }

  getCityById = async (cityId: string): Promise<City> => {
    const response = await this.makeRequest<ApiResponse<City>>(`/cities/${cityId}`);
    return response.data;
  }
}
