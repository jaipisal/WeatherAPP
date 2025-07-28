import React, { useState } from 'react';
import { Map, Layers, Zap, Cloud, CloudRain } from 'lucide-react';
import { Location } from '../types';

interface RadarMapProps {
  location: Location;
}

/**
 * RadarMap Component
 * Displays a simulated weather radar map with layer controls
 * In a real application, this would integrate with a mapping service like Google Maps or Mapbox
 */
const RadarMap: React.FC<RadarMapProps> = ({ location }) => {
  const [activeLayer, setActiveLayer] = useState<'precipitation' | 'clouds' | 'temperature'>('precipitation');

  // Map layers configuration
  const mapLayers = [
    {
      id: 'precipitation',
      name: 'Precipitation',
      icon: <CloudRain className="w-4 h-4" />,
      description: 'Current and forecasted rainfall',
    },
    {
      id: 'clouds',
      name: 'Cloud Cover',
      icon: <Cloud className="w-4 h-4" />,
      description: 'Satellite cloud imagery',
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: <Zap className="w-4 h-4" />,
      description: 'Temperature distribution',
    },
  ];

  // Simulated radar data visualization
  const generateRadarDots = () => {
    const dots = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const intensity = Math.random();
      const size = Math.random() * 6 + 2;
      
      let color = 'rgba(59, 130, 246, 0.3)'; // Blue for precipitation
      if (activeLayer === 'clouds') {
        color = `rgba(255, 255, 255, ${0.2 + intensity * 0.6})`;
      } else if (activeLayer === 'temperature') {
        color = intensity > 0.7 ? 'rgba(239, 68, 68, 0.6)' : 
               intensity > 0.4 ? 'rgba(251, 146, 60, 0.6)' : 
               'rgba(59, 130, 246, 0.6)';
      }
      
      dots.push(
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      );
    }
    return dots;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Map className="w-5 h-5 mr-2 text-blue-400" />
        Weather Radar
      </h3>

      {/* Layer Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mapLayers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              activeLayer === layer.id
                ? 'bg-blue-500/30 text-white border border-blue-400/50'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/20'
            }`}
          >
            {layer.icon}
            <span>{layer.name}</span>
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative">
        {/* Map Background */}
        <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative border border-white/20">
          {/* Grid Overlay */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20">
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Center Marker (User Location) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-ping"></div>
            <div className="absolute top-0 left-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Radar Data Points */}
          {generateRadarDots()}

          {/* Radar Sweep Animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-48 border border-green-400/30 rounded-full animate-spin" style={{ animationDuration: '4s' }}>
              <div className="absolute top-0 left-1/2 w-0.5 h-24 bg-gradient-to-b from-green-400 to-transparent transform -translate-x-0.5"></div>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="flex items-center justify-between mt-4 text-sm text-white/70">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
            {activeLayer === 'precipitation' && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Precipitation</span>
              </div>
            )}
          </div>
          <span className="text-xs">
            {location.name} • Lat: {location.lat.toFixed(2)} • Lon: {location.lon.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Layer Description */}
      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <p className="text-white/70 text-sm">
          <Layers className="w-4 h-4 inline mr-1" />
          <strong>{mapLayers.find(l => l.id === activeLayer)?.name}:</strong>{' '}
          {mapLayers.find(l => l.id === activeLayer)?.description}
        </p>
      </div>
    </div>
  );
};

export default RadarMap;