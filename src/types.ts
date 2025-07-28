// Weather App Type Definitions
export interface WeatherData {
  current: CurrentWeather;
  forecast: DailyForecast[];
  hourly: HourlyForecast[];
  alerts: WeatherAlert[];
  airQuality: AirQuality;
  location: Location;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
}

export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  startTime: string;
  endTime: string;
}

export interface AirQuality {
  aqi: number;
  level: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export interface AppSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark';
  backgroundType: 'gradient' | 'image';
  loginBackground: string;
  dashboardBackground: string;
}

export interface User {
  name: string;
  email: string;
  location: string;
}