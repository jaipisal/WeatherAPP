import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LoginPage from './components/LoginPage';
import LocationSelection from './components/LocationSelection';
import WeatherDashboard from './components/WeatherDashboard';

/**
 * Main App Component
 * Handles routing between login page and weather dashboard
 * Manages application state through ThemeProvider
 */
const AppContent: React.FC = () => {
  const { state } = useTheme();

  // Show location selection if user is logged in but hasn't selected location
  if (state.isLoggedIn && state.user && !state.user.location) {
    return <LocationSelection />;
  }

  return (
    <div className="min-h-screen">
      {state.isLoggedIn ? <WeatherDashboard /> : <LoginPage />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;