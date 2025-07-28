import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { CurrentWeather, Location } from '../types';
import { useTheme } from '../context/ThemeContext';
import { convertTemperature } from '../services/weatherService';
import { getWindDirection } from '../utils';

interface WeatherCardProps {
  weather: CurrentWeather;
  location: Location;
}

/**
 * WeatherCard Component
 * Displays current weather conditions with temperature, description, and key metrics
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ weather, location }) => {
  const { state } = useTheme();

  // Convert temperatures based on user preference
  const temperature = convertTemperature(weather.temperature, 'celsius', state.temperatureUnit);
  const feelsLike = convertTemperature(weather.feelsLike, 'celsius', state.temperatureUnit);
  const tempUnit = state.temperatureUnit === 'celsius' ? '°C' : '°F';

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15">
      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-6xl font-light text-white">{temperature}</span>
            <span className="text-2xl text-white/80">{tempUnit}</span>
          </div>
          <p className="text-white/80 text-lg mb-1">{weather.description}</p>
          <p className="text-white/60 text-sm">
            Feels like {feelsLike}{tempUnit}
          </p>
        </div>
        
        {/* Weather Icon */}
        <div className="text-6xl animate-pulse">
          {weather.icon}
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-3 gap-6">
        {/* Humidity */}
        <div className="text-center">
          <div className="bg-white/10 rounded-2xl p-4 mb-2 transition-all duration-300 hover:scale-105">
            <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-2" />
            <div className="text-white font-semibold text-lg">{weather.humidity}%</div>
          </div>
          <span className="text-white/70 text-sm">Humidity</span>
        </div>

        {/* Wind Speed */}
        <div className="text-center">
          <div className="bg-white/10 rounded-2xl p-4 mb-2 transition-all duration-300 hover:scale-105">
            <Wind className="w-6 h-6 text-green-300 mx-auto mb-2" />
            <div className="text-white font-semibold text-lg">
              {weather.windSpeed} km/h
            </div>
          </div>
          <span className="text-white/70 text-sm">
            Wind {getWindDirection(weather.windDirection)}
          </span>
        </div>

        {/* Feels Like Temperature */}
        <div className="text-center">
          <div className="bg-white/10 rounded-2xl p-4 mb-2 transition-all duration-300 hover:scale-105">
            <Thermometer className="w-6 h-6 text-orange-300 mx-auto mb-2" />
            <div className="text-white font-semibold text-lg">
              {feelsLike}{tempUnit}
            </div>
          </div>
          <span className="text-white/70 text-sm">Feels Like</span>
        </div>
      </div>

      {/* Location Info */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-white/60 text-sm text-center">
          {location.name}, {location.region} • {location.country}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;