import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { City, CitySearchResult } from '../types/weather';
import { WeatherService } from '../services/weatherService';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

const weatherService = new WeatherService();

interface CitySearchProps {
  onCitySelect: (city: City) => void;
  onCityAdd: (city: City) => void;
  onClose: () => void;
  existingCities: City[];
}

export const CitySearch = ({
  onCitySelect,
  onCityAdd,
  onClose,
  existingCities,
}: CitySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch cities based on search query
  const { data: searchResults = [], isLoading, error } = useQuery({
    queryKey: ['citySearch', debouncedQuery],
    queryFn: () => weatherService.searchCities(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCitySelect = (searchResult: CitySearchResult) => {
    console.log('🔍 CitySearch: City selected:', searchResult);
    console.log('🔍 CitySearch: Existing cities:', existingCities);
    
    // Check if city already exists
    const cityExists = existingCities.some(
      city => city.lat === searchResult.lat && city.lon === searchResult.lon
    );

    if (cityExists) {
      console.log('🔍 CitySearch: City already exists, selecting existing city');
      // Find existing city and select it
      const existingCity = existingCities.find(
        city => city.lat === searchResult.lat && city.lon === searchResult.lon
      );
      if (existingCity) {
        console.log('🔍 CitySearch: Calling onCitySelect with existing city:', existingCity);
        onCitySelect(existingCity);
      }
    } else {
      console.log('🔍 CitySearch: Adding new city:', searchResult);
      // Add new city
      const newCity: Omit<City, 'id' | 'addedAt'> = {
        name: searchResult.name,
        country: searchResult.country,
        lat: searchResult.lat,
        lon: searchResult.lon,
        state: searchResult.state,
      };
      console.log('🔍 CitySearch: Calling onCityAdd with new city:', newCity);
      onCityAdd(newCity);
    }
  };

  const filteredResults = searchResults.filter(result => {
    // Filter out cities that already exist
    return !existingCities.some(
      city => city.lat === result.lat && city.lon === result.lon
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New City</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Search Results */}
          <div className="mt-4">
            {searchQuery.length < 2 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Type at least 2 characters to search
              </p>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 text-primary-600 animate-spin mr-2" />
                <span className="text-sm text-gray-600">Searching...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-4">
                <p className="text-sm text-red-600">
                  {error instanceof Error ? error.message : 'Search failed'}
                </p>
              </div>
            )}

            {!isLoading && !error && debouncedQuery.length >= 2 && (
              <div className="space-y-2">
                {filteredResults.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No cities found
                  </p>
                ) : (
                  filteredResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleCitySelect(result)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {result.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {result.state && `${result.state}, `}{result.country}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
