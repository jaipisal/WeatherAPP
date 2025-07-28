import React from 'react';
import { X, Sun, Moon, Palette, Image } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: 'login' | 'dashboard';
}

/**
 * SettingsModal Component
 * Provides settings interface for theme, temperature units, and background customization
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentPage }) => {
  const { state, dispatch } = useTheme();

  if (!isOpen) return null;

  // Background options
  const backgroundOptions = {
    gradients: [
      { name: 'Ocean', class: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500' },
      { name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600' },
      { name: 'Forest', class: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600' },
      { name: 'Aurora', class: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500' },
      { name: 'Sky', class: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700' },
      { name: 'Earth', class: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600' },
    ],
  };

  const handleBackgroundChange = (backgroundClass: string) => {
    if (currentPage === 'login') {
      dispatch({ type: 'SET_LOGIN_BACKGROUND', payload: backgroundClass });
    } else {
      dispatch({ type: 'SET_DASHBOARD_BACKGROUND', payload: backgroundClass });
    }
  };

  const currentBackground = currentPage === 'login' ? state.loginBackground : state.dashboardBackground;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Appearance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Sun className="w-6 h-6 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-900 dark:text-white">Light</span>
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Moon className="w-6 h-6 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-900 dark:text-white">Dark</span>
              </button>
            </div>
          </div>

          {/* Temperature Unit */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Temperature Unit</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: 'celsius' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.temperatureUnit === 'celsius'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-sm text-gray-900 dark:text-white">Celsius (°C)</span>
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: 'fahrenheit' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.temperatureUnit === 'fahrenheit'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-sm text-gray-900 dark:text-white">Fahrenheit (°F)</span>
              </button>
            </div>
          </div>

          {/* Background Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              {currentPage === 'login' ? 'Login' : 'Dashboard'} Background
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {backgroundOptions.gradients.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => handleBackgroundChange(bg.class)}
                  className={`relative p-4 rounded-lg border-2 transition-all overflow-hidden ${
                    currentBackground === bg.class
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className={`absolute inset-0 ${bg.class} opacity-80`}></div>
                  <div className="relative z-10">
                    <span className="text-sm font-medium text-white drop-shadow-lg">{bg.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Info (if logged in) */}
          {state.user && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div><span className="font-medium">Name:</span> {state.user.name}</div>
                <div><span className="font-medium">Location:</span> {state.user.location}</div>
                {state.user.email && (
                  <div><span className="font-medium">Email:</span> {state.user.email}</div>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: 'LOGOUT' })}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;