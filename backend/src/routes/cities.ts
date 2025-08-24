import { Router, Request, Response } from 'express';
import { getRedisClient } from '../config/redis';

const router = Router();

interface SavedCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
  addedAt: string;
}

// Get all saved cities (simulated user session)
router.get('/', async (req: Request, res: Response) => {
  try {
    const redis = getRedisClient();
    const cities = await redis.get('saved_cities');
    
    if (!cities) {
      return res.json({
        success: true,
        data: []
      });
    }

    const savedCities: SavedCity[] = JSON.parse(cities);
    
    res.json({
      success: true,
      data: savedCities
    });
  } catch (error) {
    console.error('Error getting saved cities:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get saved cities'
    });
  }
});

// Add a new city
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, country, lat, lon, state } = req.body;
    
    if (!name || !country || lat === undefined || lon === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Name, country, latitude, and longitude are required'
      });
    }

    const redis = getRedisClient();
    const existingCities = await redis.get('saved_cities');
    const cities: SavedCity[] = existingCities ? JSON.parse(existingCities) : [];
    
    // Check if city already exists
    const cityExists = cities.some(city => 
      city.lat === lat && city.lon === lon
    );
    
    if (cityExists) {
      return res.status(409).json({
        success: false,
        error: 'City already exists in your list'
      });
    }

    const newCity: SavedCity = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      country,
      lat,
      lon,
      state,
      addedAt: new Date().toISOString()
    };

    cities.push(newCity);
    
    // Store in Redis (simulating user session)
    await redis.set('saved_cities', JSON.stringify(cities));
    
    res.status(201).json({
      success: true,
      data: newCity
    });
  } catch (error) {
    console.error('Error adding city:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add city'
    });
  }
});

// Remove a city
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const redis = getRedisClient();
    const existingCities = await redis.get('saved_cities');
    
    if (!existingCities) {
      return res.status(404).json({
        success: false,
        error: 'No saved cities found'
      });
    }

    const cities: SavedCity[] = JSON.parse(existingCities);
    const cityIndex = cities.findIndex(city => city.id === id);
    
    if (cityIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'City not found'
      });
    }

    const removedCity = cities.splice(cityIndex, 1)[0];
    
    // Update Redis
    await redis.set('saved_cities', JSON.stringify(cities));
    
    res.json({
      success: true,
      data: removedCity,
      message: 'City removed successfully'
    });
  } catch (error) {
    console.error('Error removing city:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove city'
    });
  }
});

// Get city by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const redis = getRedisClient();
    const cities = await redis.get('saved_cities');
    
    if (!cities) {
      return res.status(404).json({
        success: false,
        error: 'No saved cities found'
      });
    }

    const savedCities: SavedCity[] = JSON.parse(cities);
    const city = savedCities.find(city => city.id === id);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        error: 'City not found'
      });
    }

    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error('Error getting city:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get city'
    });
  }
});

export { router as cityRoutes };
