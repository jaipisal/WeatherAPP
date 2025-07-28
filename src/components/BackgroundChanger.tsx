import React, { useState } from 'react';
import { Palette, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BackgroundChangerProps {
  currentPage: 'login' | 'dashboard';
}

/**
 * BackgroundChanger Component
 * Dedicated component for changing backgrounds with live preview
 */
const BackgroundChanger: React.FC<BackgroundChangerProps> = ({ currentPage }) => {
  const { state, dispatch } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Background options with beautiful gradients
  const backgroundOptions = [
    { 
      name: 'Ocean Breeze', 
      class: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
      preview: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)'
    },
    { 
      name: 'Sunset Glow', 
      class: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600',
      preview: 'linear-gradient(135deg, #fb923c 0%, #ef4444 50%, #dc2626 100%)'
    },
    { 
      name: 'Forest Mist', 
      class: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
      preview: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 50%, #9333ea 100%)'
    },
    { 
      name: 'Aurora Night', 
      class: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      preview: 'linear-gradient(135deg, #c084fc 0%, #ec4899 50%, #ef4444 100%)'
    },
    { 
      name: 'Sky Dreams', 
      class: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700',
      preview: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)'
    },
    { 
      name: 'Golden Hour', 
      class: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600',
      preview: 'linear-gradient(135deg, #facc15 0%, #f97316 50%, #dc2626 100%)'
    },
    { 
      name: 'Midnight Blue', 
      class: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      preview: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)'
    },
    { 
      name: 'Rose Garden', 
      class: 'bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400',
      preview: 'linear-gradient(135deg, #f9a8d4 0%, #d8b4fe 50%, #818cf8 100%)'
    },
    { 
      name: 'Emerald Sea', 
      class: 'bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500',
      preview: 'linear-gradient(135deg, #34d399 0%, #22d3ee 50%, #3b82f6 100%)'
    },
    { 
      name: 'Cosmic Purple', 
      class: 'bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600',
      preview: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #2563eb 100%)'
    },
    { 
      name: 'Warm Sunset', 
      class: 'bg-gradient-to-br from-amber-300 via-orange-400 to-red-500',
      preview: 'linear-gradient(135deg, #fcd34d 0%, #fb923c 50%, #ef4444 100%)'
    },
    { 
      name: 'Cool Mint', 
      class: 'bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-400',
      preview: 'linear-gradient(135deg, #5eead4 0%, #67e8f9 50%, #60a5fa 100%)'
    },
  ];

  const handleBackgroundChange = (backgroundClass: string) => {
    if (currentPage === 'login') {
      dispatch({ type: 'SET_LOGIN_BACKGROUND', payload: backgroundClass });
    } else {
      dispatch({ type: 'SET_DASHBOARD_BACKGROUND', payload: backgroundClass });
    }
  };

  const currentBackground = currentPage === 'login' ? state.loginBackground : state.dashboardBackground;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-50 group shadow-2xl"
        aria-label="Change background"
      >
        <Palette className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <Palette className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">
              Change {currentPage === 'login' ? 'Login' : 'Dashboard'} Background
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Background Options */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {backgroundOptions.map((bg) => (
              <button
                key={bg.name}
                onClick={() => handleBackgroundChange(bg.class)}
                className={`relative group rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  currentBackground === bg.class
                    ? 'ring-4 ring-white/50 shadow-2xl'
                    : 'hover:ring-2 hover:ring-white/30'
                }`}
              >
                {/* Background Preview */}
                <div 
                  className="w-full h-32 relative"
                  style={{ background: bg.preview }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Selected Indicator */}
                  {currentBackground === bg.class && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  
                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-medium text-sm text-center">
                      {bg.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">
              Choose a background that matches your style
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl transition-colors duration-300"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundChanger;