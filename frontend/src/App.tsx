import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { WeatherDashboard } from './components/WeatherDashboard'
import { CitySearch } from './components/CitySearch'
import { SavedCities } from './components/SavedCities'
import { WeatherService } from './services/weatherService'
import { City } from './types/weather'
import { Search, MapPin, Settings } from 'lucide-react'

const weatherService = new WeatherService()

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const queryClient = useQueryClient()

  // Fetch saved cities
  const { data: savedCities = [], refetch: refetchCities, isLoading: citiesLoading } = useQuery({
    queryKey: ['savedCities'],
    queryFn: weatherService.getSavedCities,
    refetchOnWindowFocus: false,
  })

  // Auto-select first saved city when component mounts
  useEffect(() => {
    if (savedCities.length > 0 && !selectedCity) {
      setSelectedCity(savedCities[0])
    }
  }, [savedCities, selectedCity])

  console.log('🔄 App: Saved cities data:', savedCities);
  console.log('🔄 App: Cities loading:', citiesLoading);

  const handleCitySelect = (city: City) => {
    console.log('🚀 App: City selected:', city);
    setSelectedCity(city)
    setShowSearch(false)
    console.log('🚀 App: Search modal closed, city set');
  }

  const handleCityAdd = async (city: Omit<City, 'id' | 'addedAt'>) => {
    console.log('🚀 App: Adding city:', city);
    try {
      const addedCity = await weatherService.addCity(city)
      console.log('🚀 App: City added successfully:', addedCity);
      console.log('🚀 App: Invalidating saved cities cache...');
      
      // Invalidate and refetch the saved cities query
      await queryClient.invalidateQueries({ queryKey: ['savedCities'] })
      console.log('🚀 App: Cache invalidated, cities should update');
      
      // Automatically select the newly added city
      setSelectedCity(addedCity)
      console.log('🚀 App: Newly added city selected:', addedCity);
      
      setShowSearch(false)
      console.log('🚀 App: Search modal closed');
    } catch (error) {
      console.error('Failed to add city:', error)
    }
  }

  const handleCityRemove = async (cityId: string) => {
    try {
      await weatherService.removeCity(cityId)
      console.log('🗑️ App: City removed, invalidating cache...');
      
      // Invalidate and refetch the saved cities query
      await queryClient.invalidateQueries({ queryKey: ['savedCities'] })
      console.log('🗑️ App: Cache invalidated after city removal');
      
      if (selectedCity?.id === cityId) {
        setSelectedCity(null)
      }
    } catch (error) {
      console.error('Failed to remove city:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">
                FyxLife Weather
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Header buttons removed */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Saved Cities */}
          <div className="lg:col-span-1">
                         <SavedCities
               cities={savedCities}
               selectedCity={selectedCity}
               onCitySelect={setSelectedCity}
               onCityRemove={handleCityRemove}
               onAddCity={() => setShowSearch(true)}
             />
          </div>

          {/* Main Content - Weather Dashboard */}
          <div className="lg:col-span-3">
            {selectedCity ? (
              <WeatherDashboard city={selectedCity} />
            ) : savedCities.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  No Cities Saved
                </h2>
                <p className="text-gray-500 mb-6">
                  Add your first city to start tracking the weather
                </p>
                <button
                  onClick={() => setShowSearch(true)}
                  className="btn-primary"
                >
                  Add Your First City
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  Select a City
                </h2>
                <p className="text-gray-500 mb-6">
                  Choose a city from your saved list to see the weather
                </p>
                <button
                  onClick={() => setShowSearch(true)}
                  className="btn-primary"
                >
                  Add More Cities
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* City Search Modal */}
      {showSearch && (
        <CitySearch
          onCitySelect={handleCitySelect}
          onCityAdd={handleCityAdd}
          onClose={() => setShowSearch(false)}
          existingCities={savedCities}
        />
      )}
    </div>
  )
}

export default App
