
import { City } from '../types/weather';
import { MapPin, X, Plus } from 'lucide-react';

interface SavedCitiesProps {
  cities: City[];
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
  onCityRemove: (cityId: string) => void;
}

export const SavedCities = ({
  cities,
  selectedCity,
  onCitySelect,
  onCityRemove,
}: SavedCitiesProps) => {
  if (cities.length === 0) {
    return (
      <div className="weather-card text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Cities Saved
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Add cities to start tracking weather
        </p>
        <button className="btn-primary w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add City
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Saved Cities</h2>
        <span className="text-sm text-gray-500">{cities.length}</span>
      </div>

      <div className="space-y-3">
        {cities.map((city) => (
          <div
            key={city.id}
            className={`weather-card cursor-pointer transition-all duration-200 ${
              selectedCity?.id === city.id
                ? 'ring-2 ring-primary-500 bg-primary-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onCitySelect(city)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {city.state && `${city.state}, `}{city.country}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  Added {new Date(city.addedAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCityRemove(city.id);
                }}
                className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                title="Remove city"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

             <div className="pt-4 border-t border-gray-200">
         <button className="btn-primary w-full">
           Add Another City
         </button>
       </div>
    </div>
  );
};
