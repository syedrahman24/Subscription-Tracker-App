import React from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative p-3 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      aria-label="Toggle dark mode"
    >
      <div className="relative">
        {darkMode ? (
          <Sun className="text-yellow-500 transform transition-transform duration-300 hover:rotate-90" size={22} />
        ) : (
          <Moon className="text-gray-600 transform transition-transform duration-300 hover:rotate-12" size={22} />
        )}
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 hover:from-blue-400/10 hover:to-purple-400/10 transition-all duration-300"></div>
    </button>
  );
};

export default DarkModeToggle; 