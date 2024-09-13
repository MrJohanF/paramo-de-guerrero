import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Leaf, ArrowRight } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className="text-xl font-bold">Plant Tracker</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-green-500 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-green-500 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Grow Smarter with Plant Tracker
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Monitor, analyze, and optimize your plant health with our advanced tracking system.
          </motion.p>
          <motion.button
            onClick={onGetStarted}
            className={`px-6 py-3 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full text-lg font-semibold transition-colors duration-300 flex items-center justify-center mx-auto`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </main>

      <footer className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Plant Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;