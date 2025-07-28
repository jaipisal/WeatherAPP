import React from 'react';
import { AlertTriangle, Info, AlertCircle, Zap } from 'lucide-react';
import { WeatherAlert } from '../types';
import { getAlertColor, formatDate } from '../utils';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

/**
 * WeatherAlerts Component
 * Displays weather alerts and warnings with appropriate severity indicators
 */
const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  // Get appropriate icon based on severity
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return <Zap className="w-5 h-5" />;
      case 'severe':
        return <AlertTriangle className="w-5 h-5" />;
      case 'moderate':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
        Weather Alerts ({alerts.length})
      </h3>
      
      <div className="space-y-4">
        {alerts.map((alert) => {
          const colorClasses = getAlertColor(alert.severity);
          
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${colorClasses}`}
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getAlertIcon(alert.severity)}
                  <h4 className="font-semibold text-sm uppercase tracking-wide">
                    {alert.title}
                  </h4>
                </div>
                <span className="text-xs opacity-75 capitalize">
                  {alert.severity}
                </span>
              </div>
              
              {/* Alert Description */}
              <p className="text-sm mb-3 leading-relaxed">
                {alert.description}
              </p>
              
              {/* Alert Timing */}
              <div className="flex items-center justify-between text-xs opacity-75">
                <span>
                  Starts: {formatDate(alert.startTime, 'long')}
                </span>
                <span>
                  Ends: {formatDate(alert.endTime, 'long')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherAlerts;