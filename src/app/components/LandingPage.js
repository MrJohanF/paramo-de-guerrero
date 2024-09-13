import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Leaf, ArrowRight, Sun, Cloud, Droplet } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    { icon: Sun, title: 'Light Monitoring', description: 'Track sunlight exposure for optimal growth' },
    { icon: Droplet, title: 'Water Management', description: 'Smart watering schedules based on plant needs' },
    { icon: Cloud, title: 'Environment Control', description: 'Monitor and adjust humidity and temperature' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="p-6 absolute w-full z-10">
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

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {isMounted && (
            <>
              <motion.div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url('/api/placeholder/1920/1080')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  y: y1
                }}
              />
              <motion.div 
                className={`absolute inset-0 z-1 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-50`}
                style={{ y: y2 }}
              />
            </>
          )}
          <div className="relative z-2 text-center px-4">
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
        </section>

        <section id="features" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <feature.icon className={`w-12 h-12 mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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