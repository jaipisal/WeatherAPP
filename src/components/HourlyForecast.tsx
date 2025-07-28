import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { convertTemperature } from '../services/weatherService';
import { formatDate } from '../utils';

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

/**
 * HourlyForecast Component
 * Displays hourly weather forecast for the next 24 hours
 */
const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const { state } = useTheme();
  const tempUnit = state.temperatureUnit === 'celsius' ? '°C' : '°F';

  // Show next 12 hours for better mobile experience
  const displayHours = hourly.slice(0, 12);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">Hourly Forecast</h3>
      
      {/* Horizontal scrollable container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {displayHours.map((hour, index) => {
            const temperature = convertTemperature(hour.temperature, 'celsius', state.temperatureUnit);
            const isNow = index === 0;
            
            return (
              <div
                key={hour.time}
                className="flex-shrink-0 text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 min-w-[100px]"
              >
                {/* Time */}
                <div className="text-white/80 text-sm mb-2 font-medium">
                  {isNow ? 'Now' : formatDate(hour.time, 'time')}
                </div>
                
                {/* Weather Icon */}
                <div className="text-2xl mb-3">
                  {hour.icon}
                </div>
                
                {/* Temperature */}
                <div className="text-white font-semibold text-lg mb-2">
                  {temperature}{tempUnit}
                </div>
                
                {/* Precipitation */}
                <div className="text-blue-300 text-xs mb-1">
                  {hour.precipitation.toFixed(0)}%
                </div>
                
                {/* Wind Speed */}
                <div className="text-white/60 text-xs">
                  {hour.windSpeed.toFixed(0)} km/h
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;