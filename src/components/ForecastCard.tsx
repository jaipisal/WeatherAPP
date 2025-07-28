import React from 'react';
import { DailyForecast } from '../types';
import { useTheme } from '../context/ThemeContext';
import { convertTemperature } from '../services/weatherService';
import { formatDate } from '../utils';

interface ForecastCardProps {
  forecast: DailyForecast[];
}

/**
 * ForecastCard Component
 * Displays 7-day weather forecast with high/low temperatures and conditions
 */
const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const { state } = useTheme();
  const tempUnit = state.temperatureUnit === 'celsius' ? '°C' : '°F';

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">7-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => {
          const high = convertTemperature(day.high, 'celsius', state.temperatureUnit);
          const low = convertTemperature(day.low, 'celsius', state.temperatureUnit);
          const isToday = index === 0;
          
          return (
            <div
              key={day.date}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {/* Date */}
              <div className="flex-1">
                <span className="text-white font-medium">
                  {isToday ? 'Today' : formatDate(day.date)}
                </span>
                <p className="text-white/60 text-sm mt-1 capitalize">
                  {day.condition}
                </p>
              </div>

              {/* Weather Icon */}
              <div className="flex-shrink-0 mx-4">
                <span className="text-3xl">{day.icon}</span>
              </div>

              {/* Precipitation */}
              <div className="flex-shrink-0 text-center mx-4">
                <div className="text-blue-300 text-sm">
                  {day.precipitation.toFixed(0)}%
                </div>
                <div className="text-white/60 text-xs">Rain</div>
              </div>

              {/* Temperature Range */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                <span className="text-white font-semibold">
                  {high}{tempUnit}
                </span>
                <span className="text-white/60">
                  {low}{tempUnit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;