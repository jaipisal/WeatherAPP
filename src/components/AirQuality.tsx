import React from 'react';
import { Leaf, AlertCircle } from 'lucide-react';
import { AirQuality as AirQualityType } from '../types';
import { getAirQualityColor } from '../utils';

interface AirQualityProps {
  airQuality: AirQualityType;
}

/**
 * AirQuality Component
 * Displays air quality index and detailed pollutant information
 */
const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
  const colorClasses = getAirQualityColor(airQuality.aqi);

  // Pollutant data for display
  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm25, unit: 'μg/m³', description: 'Fine particles' },
    { name: 'PM10', value: airQuality.pm10, unit: 'μg/m³', description: 'Coarse particles' },
    { name: 'O₃', value: airQuality.o3, unit: 'μg/m³', description: 'Ozone' },
    { name: 'NO₂', value: airQuality.no2, unit: 'μg/m³', description: 'Nitrogen dioxide' },
    { name: 'SO₂', value: airQuality.so2, unit: 'μg/m³', description: 'Sulfur dioxide' },
    { name: 'CO', value: airQuality.co, unit: 'mg/m³', description: 'Carbon monoxide' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-green-400" />
        Air Quality
      </h3>

      {/* AQI Display */}
      <div className={`rounded-xl p-4 mb-6 border ${colorClasses.bg} ${colorClasses.border}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${colorClasses.text}`}>
            Air Quality Index
          </span>
          <div className={`w-3 h-3 rounded-full ${colorClasses.indicator} animate-pulse`}></div>
        </div>
        
        <div className="flex items-baseline space-x-2 mb-1">
          <span className={`text-3xl font-bold ${colorClasses.text}`}>
            {airQuality.aqi}
          </span>
          <span className={`text-sm ${colorClasses.text} opacity-75`}>
            AQI
          </span>
        </div>
        
        <p className={`text-sm ${colorClasses.text} opacity-75`}>
          {airQuality.level}
        </p>
      </div>

      {/* Pollutant Details */}
      <div className="space-y-3">
        <h4 className="text-white/80 font-medium text-sm mb-3">Pollutant Levels</h4>
        
        {pollutants.map((pollutant) => (
          <div
            key={pollutant.name}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div>
              <span className="text-white font-medium text-sm">
                {pollutant.name}
              </span>
              <p className="text-white/60 text-xs">
                {pollutant.description}
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-white font-semibold">
                {pollutant.value.toFixed(1)}
              </span>
              <span className="text-white/60 text-xs ml-1">
                {pollutant.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Health Recommendation */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-blue-300 font-medium text-sm mb-1">
              Health Recommendation
            </h5>
            <p className="text-blue-200/80 text-xs leading-relaxed">
              {airQuality.aqi <= 50
                ? 'Air quality is good. Enjoy outdoor activities!'
                : airQuality.aqi <= 100
                ? 'Air quality is moderate. Sensitive individuals should consider limiting outdoor activities.'
                : 'Air quality is unhealthy. Consider limiting outdoor activities and wearing a mask.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;