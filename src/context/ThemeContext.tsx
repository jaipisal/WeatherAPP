import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppSettings } from '../types';

interface ThemeState extends AppSettings {
  isLoggedIn: boolean;
  user: { name: string; email: string; location: string } | null;
}

type ThemeAction =
  | { type: 'SET_TEMPERATURE_UNIT'; payload: 'celsius' | 'fahrenheit' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_BACKGROUND_TYPE'; payload: 'gradient' | 'image' }
  | { type: 'SET_LOGIN_BACKGROUND'; payload: string }
  | { type: 'SET_DASHBOARD_BACKGROUND'; payload: string }
  | { type: 'LOGIN'; payload: { name: string; email: string; location: string } }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_SETTINGS'; payload: Partial<ThemeState> };

const initialState: ThemeState = {
  temperatureUnit: 'celsius',
  theme: 'light',
  backgroundType: 'gradient',
  loginBackground: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
  dashboardBackground: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700',
  isLoggedIn: false,
  user: null,
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_TEMPERATURE_UNIT':
      return { ...state, temperatureUnit: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_BACKGROUND_TYPE':
      return { ...state, backgroundType: action.payload };
    case 'SET_LOGIN_BACKGROUND':
      return { ...state, loginBackground: action.payload };
    case 'SET_DASHBOARD_BACKGROUND':
      return { ...state, dashboardBackground: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null };
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('weatherAppSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: parsed });
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(state));
  }, [state]);

  // Apply theme class to document body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};