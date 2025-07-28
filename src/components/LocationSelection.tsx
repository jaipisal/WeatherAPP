import React, { useState } from 'react';
import { MapPin, ArrowRight, Settings, Globe, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LocationSearch from './LocationSearch';
import SettingsModal from './SettingsModal';
import BackgroundChanger from './BackgroundChanger';

/**
 * LocationSelection Component
 * Beautiful location selection screen after login
 * Allows users to choose their location before accessing weather data
 */
const LocationSelection: React.FC = () => {
  const { state, dispatch } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle location selection from search
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  // Handle continue to weather dashboard
  const handleContinue = async () => {
    if (!selectedLocation.trim()) return;

    setIsLoading(true);
    
    // Simulate location processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user with selected location
    if (state.user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          ...state.user,
          location: selectedLocation.trim(),
        },
      });
    }
  };

  // Popular locations for quick selection
  const popularLocations = [
    'Mumbai, Maharashtra, IN',
    'Delhi, Delhi, IN',
    'Bangalore, Karnataka, IN',
    'Chennai, Tamil Nadu, IN',
    'Kolkata, West Bengal, IN',
    'Hyderabad, Telangana, IN',
    'Pune, Maharashtra, IN',
    'Ahmedabad, Gujarat, IN',
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${state.dashboardBackground}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Location Pins */}
        <div className="absolute top-20 left-16 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <MapPin className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute top-32 right-24 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Globe className="w-8 h-8 text-white/15" />
        </div>
        <div className="absolute bottom-32 left-24 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Search className="w-5 h-5 text-white/25" />
        </div>
        <div className="absolute top-1/2 right-16 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <MapPin className="w-4 h-4 text-white/30" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-white/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">WeatherPro</h1>
            <p className="text-white/70 text-sm">Welcome, {state.user?.name}!</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 group"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <div className="w-full max-w-2xl">
          {/* Location Selection Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Choose Your Location</h2>
              <p className="text-white/80 text-lg">
                Select your city to get personalized weather updates
              </p>
            </div>

            {/* Location Search */}
            <div className="mb-8">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                placeholder="Search for your city, district, or region..."
                initialValue={selectedLocation}
                className="mb-4"
              />
              
              {selectedLocation && (
                <div className="flex items-center justify-center p-3 bg-green-500/20 border border-green-400/30 rounded-xl">
                  <MapPin className="w-4 h-4 text-green-300 mr-2" />
                  <span className="text-green-200 text-sm">Selected: {selectedLocation}</span>
                </div>
              )}
            </div>

            {/* Popular Locations */}
            <div className="mb-8">
              <h3 className="text-white/90 font-medium mb-4 text-center">Or choose from popular locations:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {popularLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`p-3 rounded-xl text-sm transition-all duration-300 ${
                      selectedLocation === location
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {location.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={isLoading || !selectedLocation.trim()}
              className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 text-lg group flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Loading Weather...
                </div>
              ) : (
                <>
                  Get My Weather
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Info */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                We'll remember your location for future visits
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default LocationSelection;