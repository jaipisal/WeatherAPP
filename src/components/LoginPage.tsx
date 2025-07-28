import React, { useState } from 'react';
import { Settings, ArrowRight, Cloud, Sun, Moon, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SettingsModal from './SettingsModal';
import BackgroundChanger from './BackgroundChanger';

/**
 * LoginPage Component
 * Stunning welcome screen with animated background elements
 * Handles initial user authentication before location selection
 */
const LoginPage: React.FC = () => {
  const { state, dispatch } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate login process with beautiful animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    dispatch({
      type: 'LOGIN',
      payload: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        location: '', // Will be set in location selection
      },
    });
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${state.loginBackground}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Weather Icons */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Cloud className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Sun className="w-10 h-10 text-white/15" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Moon className="w-6 h-6 text-white/25" />
        </div>
        <div className="absolute top-60 left-1/3 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Star className="w-4 h-4 text-white/20" />
        </div>
        <div className="absolute bottom-60 right-1/4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
          <Cloud className="w-12 h-12 text-white/10" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-20 group"
        aria-label="Open settings"
      >
        <Settings className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Welcome Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 animate-pulse">
                <Cloud className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                WeatherPro
              </h1>
              <p className="text-white/80 text-xl leading-relaxed">
                Your personal weather companion for anywhere in the world
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-white/90 text-sm font-medium">
                  What should we call you?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white/90 text-sm font-medium">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Enter your email"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 text-lg group flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Welcome aboard...
                  </div>
                ) : (
                  <>
                    Continue to Weather
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Features Preview */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl">🌍</div>
                  <p className="text-white/70 text-sm">Global Weather</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">📊</div>
                  <p className="text-white/70 text-sm">Detailed Forecasts</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">🎨</div>
                  <p className="text-white/70 text-sm">Custom Themes</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">⚡</div>
                  <p className="text-white/70 text-sm">Real-time Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentPage="login"
      />

      {/* Background Changer */}
      <BackgroundChanger currentPage="login" />
    </div>
  );
};

export default LoginPage;