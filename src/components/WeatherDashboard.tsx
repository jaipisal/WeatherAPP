import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, MapPin, Search, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WeatherData } from '../types';
import { fetchWeatherData } from '../services/weatherService';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import HourlyForecast from './HourlyForecast';
import WeatherAlerts from './WeatherAlerts';
import AirQuality from './AirQuality';
import RadarMap from './RadarMap';
import SettingsModal from './SettingsModal';
import LocationSearch from './LocationSearch';
import BackgroundChanger from './BackgroundChanger';

/**
 * WeatherDashboard Component
 * Main dashboard displaying comprehensive weather information
 * Includes current weather, forecasts, alerts, air quality, and radar
 */
const WeatherDashboard: React.FC = () => {
  const { state } = useTheme();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // Load weather data on component mount
  useEffect(() => {
    loadWeatherData();
  }, [state.user?.location]);

  // Load weather data function
  const loadWeatherData = async (showRefreshing = false) => {
    if (!state.user?.location) return;

    try {
      if (showRefreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      
      setError(null);
      const data = await fetchWeatherData(state.user.location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error('Weather data fetch error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    loadWeatherData(true);
  };

  // Handle location change
  const handleLocationChange = (newLocation: string) => {
    // Update user location in context
    if (state.user) {
      const { dispatch } = useTheme();
      dispatch({
        type: 'LOGIN',
        payload: {
          ...state.user,
          location: newLocation,
        },
      });
    }
    setShowLocationSearch(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-700 ${state.dashboardBackground}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${state.dashboardBackground}`}>
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <p className="text-white text-lg mb-4">{error}</p>
          <button
            onClick={() => loadWeatherData()}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className={`min-h-screen transition-all duration-700 ${state.dashboardBackground}`}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Location */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">WeatherPro</h1>
              <button
                onClick={() => setShowLocationSearch(!showLocationSearch)}
                className="flex items-center text-white/80 hover:text-white hover:bg-white/10 px-3 py-1 rounded-lg transition-all duration-200"
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{weatherData.location.name}, {weatherData.location.region}</span>
                <Search className="w-3 h-3 ml-2" />
              </button>
            </div>

            {/* User Info and Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-white/80 text-sm hidden sm:block">
                Welcome, {state.user?.name}
              </span>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Refresh weather data"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                aria-label="Open settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Location Search Overlay */}
      {showLocationSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4 z-50">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white text-lg font-semibold mb-4">Change Location</h3>
              <LocationSearch
                onLocationSelect={handleLocationChange}
                placeholder="Search for a new location..."
                initialValue=""
              />
              <button
                onClick={() => setShowLocationSearch(false)}
                className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Weather & Forecast */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Weather */}
            <WeatherCard weather={weatherData.current} location={weatherData.location} />
            
            {/* Weather Alerts */}
            {weatherData.alerts.length > 0 && (
              <WeatherAlerts alerts={weatherData.alerts} />
            )}
            
            {/* Hourly Forecast */}
            <HourlyForecast hourly={weatherData.hourly} />
            
            {/* 7-Day Forecast */}
            <ForecastCard forecast={weatherData.forecast} />
            
            {/* Radar Map */}
            <RadarMap location={weatherData.location} />
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            {/* Air Quality */}
            <AirQuality airQuality={weatherData.airQuality} />
            
            {/* Additional Weather Details */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Weather Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white/80">
                  <span>Pressure</span>
                  <span className="font-medium">{weatherData.current.pressure} hPa</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Visibility</span>
                  <span className="font-medium">{weatherData.current.visibility} km</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>UV Index</span>
                  <span className="font-medium">{weatherData.current.uvIndex}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Sunrise</span>
                  <span className="font-medium">{weatherData.current.sunrise}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Sunset</span>
                  <span className="font-medium">{weatherData.current.sunset}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentPage="dashboard"
      />

      {/* Background Changer */}
      <BackgroundChanger currentPage="dashboard" />
    </div>
  );
};

export default WeatherDashboard;