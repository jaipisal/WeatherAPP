/**
 * Utility functions for the Weather App
 */

/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string
 * @param format - Format type ('short' | 'long' | 'time')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, format: 'short' | 'long' | 'time' = 'short'): string => {
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    case 'long':
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'time':
      return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Gets the appropriate text color class for weather alerts based on severity
 * @param severity - Alert severity level
 * @returns Tailwind CSS color class string
 */
export const getAlertColor = (severity: string): string => {
  switch (severity) {
    case 'minor':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'moderate':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'severe':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'extreme':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

/**
 * Gets the appropriate color class for air quality based on AQI value
 * @param aqi - Air Quality Index value
 * @returns Object with color classes for different elements
 */
export const getAirQualityColor = (aqi: number) => {
  if (aqi <= 50) {
    return {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      indicator: 'bg-green-500'
    };
  } else if (aqi <= 100) {
    return {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      indicator: 'bg-yellow-500'
    };
  } else if (aqi <= 150) {
    return {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-200',
      indicator: 'bg-orange-500'
    };
  } else {
    return {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      indicator: 'bg-red-500'
    };
  }
};

/**
 * Converts wind direction in degrees to compass direction
 * @param degrees - Wind direction in degrees (0-360)
 * @returns Compass direction string
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
};

/**
 * Generates a smooth transition class name for animations
 * @param duration - Animation duration ('fast' | 'normal' | 'slow')
 * @returns Tailwind transition class string
 */
export const getTransitionClass = (duration: 'fast' | 'normal' | 'slow' = 'normal'): string => {
  const baseClass = 'transition-all ease-in-out';
  
  switch (duration) {
    case 'fast':
      return `${baseClass} duration-150`;
    case 'slow':
      return `${baseClass} duration-500`;
    default:
      return `${baseClass} duration-300`;
  }
};

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};