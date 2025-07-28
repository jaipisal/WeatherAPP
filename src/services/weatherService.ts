import { WeatherData, DailyForecast, HourlyForecast, WeatherAlert, AirQuality } from '../types';

/**
 * OpenWeatherMap API Integration
 * Provides real weather data from OpenWeatherMap API with global coverage
 */

// API Configuration - Using environment variables for security
const API_CONFIG = {
  key: import.meta.env.VITE_OPENWEATHER_API_KEY,
  baseUrl: import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  geoUrl: import.meta.env.VITE_OPENWEATHER_GEO_URL || 'https://api.openweathermap.org/geo/1.0',
};

// Weather condition mapping for consistent icons
const weatherIconMap: { [key: string]: string } = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
};

/**
 * Geocoding service to get coordinates from location name
 * Supports worldwide locations including districts and states
 */
export const geocodeLocation = async (locationName: string) => {
  try {
    // Enhanced search with better parameters for Indian locations
    const response = await fetch(
      `${API_CONFIG.geoUrl}/direct?q=${encodeURIComponent(locationName)}&limit=10&appid=${API_CONFIG.key}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }
    
    const locations = await response.json();
    
    if (locations.length === 0) {
      throw new Error('Location not found');
    }
    
    // Return the first (most relevant) result with enhanced location info
    const location = locations[0];
    
    // Enhanced display name for Indian locations
    let displayName = location.name;
    if (location.state) {
      displayName += `, ${location.state}`;
    }
    displayName += `, ${location.country}`;
    
    return {
      name: location.name,
      country: location.country,
      state: location.state || '',
      lat: location.lat,
      lon: location.lon,
      displayName
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to find location. Please check the spelling and try again.');
  }
};

/**
 * Fetch current weather data from OpenWeatherMap
 */
const fetchCurrentWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.key}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch 5-day forecast data from OpenWeatherMap
 */
const fetchForecastData = async (lat: number, lon: number) => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${API_CONFIG.key}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch air quality data from OpenWeatherMap
 */
const fetchAirQualityData = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_CONFIG.key}`
    );
    
    if (!response.ok) {
      throw new Error(`Air quality API error: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.warn('Air quality data unavailable:', error);
    return null;
  }
};

/**
 * Process daily forecast from 5-day forecast data
 */
const processDailyForecast = (forecastData: any): DailyForecast[] => {
  const dailyMap = new Map();
  
  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date: new Date(item.dt * 1000).toISOString(),
        high: item.main.temp_max,
        low: item.main.temp_min,
        condition: item.weather[0].main.toLowerCase(),
        icon: weatherIconMap[item.weather[0].icon] || '☀️',
        precipitation: (item.pop || 0) * 100,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed * 3.6, // Convert m/s to km/h
        temps: [item.main.temp]
      });
    } else {
      const day = dailyMap.get(date);
      day.high = Math.max(day.high, item.main.temp_max);
      day.low = Math.min(day.low, item.main.temp_min);
      day.temps.push(item.main.temp);
      day.precipitation = Math.max(day.precipitation, (item.pop || 0) * 100);
    }
  });
  
  return Array.from(dailyMap.values()).slice(0, 7).map(day => ({
    ...day,
    high: Math.round(day.high),
    low: Math.round(day.low)
  }));
};

/**
 * Process hourly forecast from 5-day forecast data
 */
const processHourlyForecast = (forecastData: any): HourlyForecast[] => {
  return forecastData.list.slice(0, 24).map((item: any) => ({
    time: new Date(item.dt * 1000).toISOString(),
    temperature: Math.round(item.main.temp),
    condition: item.weather[0].main.toLowerCase(),
    icon: weatherIconMap[item.weather[0].icon] || '☀️',
    precipitation: (item.pop || 0) * 100,
    windSpeed: item.wind.speed * 3.6, // Convert m/s to km/h
  }));
};

/**
 * Process air quality data
 */
const processAirQuality = (airQualityData: any): AirQuality => {
  if (!airQualityData || !airQualityData.list || airQualityData.list.length === 0) {
    // Return default values if air quality data is unavailable
    return {
      aqi: 50,
      level: 'Good',
      pm25: 10,
      pm10: 20,
      o3: 60,
      no2: 20,
      so2: 5,
      co: 0.5,
    };
  }
  
  const data = airQualityData.list[0];
  const aqi = data.main.aqi * 50; // Convert 1-5 scale to 0-250
  
  let level = 'Good';
  if (aqi > 200) level = 'Very Unhealthy';
  else if (aqi > 150) level = 'Unhealthy';
  else if (aqi > 100) level = 'Unhealthy for Sensitive Groups';
  else if (aqi > 50) level = 'Moderate';
  
  return {
    aqi: Math.round(aqi),
    level,
    pm25: data.components.pm2_5 || 0,
    pm10: data.components.pm10 || 0,
    o3: data.components.o3 || 0,
    no2: data.components.no2 || 0,
    so2: data.components.so2 || 0,
    co: data.components.co || 0,
  };
};

/**
 * Generate weather alerts based on current conditions
 */
const generateWeatherAlerts = (currentWeather: any, forecastData: any): WeatherAlert[] => {
  const alerts: WeatherAlert[] = [];
  
  // High wind alert
  if (currentWeather.wind.speed > 10) { // > 36 km/h
    alerts.push({
      id: 'wind-alert',
      title: 'High Wind Warning',
      description: `Strong winds detected with speeds up to ${Math.round(currentWeather.wind.speed * 3.6)} km/h. Secure loose objects and exercise caution outdoors.`,
      severity: currentWeather.wind.speed > 15 ? 'severe' : 'moderate',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // Temperature extreme alerts
  if (currentWeather.main.temp > 35) {
    alerts.push({
      id: 'heat-alert',
      title: 'Extreme Heat Warning',
      description: 'Very high temperatures detected. Stay hydrated, avoid prolonged sun exposure, and seek air-conditioned spaces.',
      severity: 'severe',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    });
  } else if (currentWeather.main.temp < -10) {
    alerts.push({
      id: 'cold-alert',
      title: 'Extreme Cold Warning',
      description: 'Very low temperatures detected. Dress warmly, limit outdoor exposure, and watch for signs of frostbite.',
      severity: 'severe',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // Precipitation alerts
  const hasHeavyRain = forecastData.list.slice(0, 8).some((item: any) => 
    item.weather[0].main === 'Rain' && (item.pop || 0) > 0.7
  );
  
  if (hasHeavyRain) {
    alerts.push({
      id: 'rain-alert',
      title: 'Heavy Rain Expected',
      description: 'Significant rainfall expected in the coming hours. Plan accordingly and avoid flood-prone areas.',
      severity: 'moderate',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return alerts;
};

/**
 * Main function to fetch comprehensive weather data
 * @param location - Location name (supports worldwide locations)
 * @returns Promise<WeatherData> - Complete weather data object
 */
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // First, geocode the location to get coordinates
    const geoData = await geocodeLocation(location);
    
    // Fetch all weather data in parallel for better performance
    const [currentWeather, forecastData, airQualityData] = await Promise.all([
      fetchCurrentWeather(geoData.lat, geoData.lon),
      fetchForecastData(geoData.lat, geoData.lon),
      fetchAirQualityData(geoData.lat, geoData.lon),
    ]);
    
    // Process the data
    const dailyForecast = processDailyForecast(forecastData);
    const hourlyForecast = processHourlyForecast(forecastData);
    const airQuality = processAirQuality(airQualityData);
    const alerts = generateWeatherAlerts(currentWeather, forecastData);
    
    // Format sunrise and sunset times
    const sunrise = new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const sunset = new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    // Construct the complete weather data object
    const weatherData: WeatherData = {
      current: {
        temperature: Math.round(currentWeather.main.temp),
        feelsLike: Math.round(currentWeather.main.feels_like),
        condition: currentWeather.weather[0].main.toLowerCase(),
        description: currentWeather.weather[0].description,
        icon: weatherIconMap[currentWeather.weather[0].icon] || '☀️',
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
        windDirection: currentWeather.wind.deg || 0,
        pressure: currentWeather.main.pressure,
        visibility: Math.round((currentWeather.visibility || 10000) / 1000), // Convert m to km
        uvIndex: 0, // UV index not available in current weather endpoint
        sunrise,
        sunset,
      },
      forecast: dailyForecast,
      hourly: hourlyForecast,
      alerts,
      airQuality,
      location: {
        name: geoData.name,
        country: geoData.country,
        region: geoData.state,
        lat: geoData.lat,
        lon: geoData.lon,
      },
    };
    
    return weatherData;
    
  } catch (error) {
    console.error('Weather service error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to fetch weather data. Please check your internet connection and try again.'
    );
  }
};

/**
 * Converts temperature between Celsius and Fahrenheit
 * @param temp - Temperature value
 * @param from - Current unit ('celsius' | 'fahrenheit')
 * @param to - Target unit ('celsius' | 'fahrenheit')
 * @returns Converted temperature
 */
export const convertTemperature = (
  temp: number,
  from: 'celsius' | 'fahrenheit',
  to: 'celsius' | 'fahrenheit'
): number => {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32);
  } else {
    return Math.round(((temp - 32) * 5) / 9);
  }
};

/**
 * Search for locations worldwide (for autocomplete functionality)
 * @param query - Search query
 * @returns Promise<Array> - Array of location suggestions
 */
export const searchLocations = async (query: string) => {
  if (query.length < 3) return [];
  
  try {
    // Enhanced search with more results for better Indian location coverage
    const response = await fetch(
      `${API_CONFIG.geoUrl}/direct?q=${encodeURIComponent(query)}&limit=10&appid=${API_CONFIG.key}`
    );
    
    if (!response.ok) return [];
    
    const locations = await response.json();
    
    return locations.map((location: any) => {
      // Enhanced display for Indian districts and states
      let displayName = location.name;
      if (location.state) {
        displayName += `, ${location.state}`;
      }
      displayName += `, ${location.country}`;
      
      return {
        name: location.name,
        country: location.country,
        state: location.state || '',
        displayName,
        lat: location.lat,
        lon: location.lon,
      };
    });
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};