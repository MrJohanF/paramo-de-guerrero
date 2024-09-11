import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { sidebarOptions } from './SidebarOptions';

export const DashboardSection = ({ setActiveSection }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {sidebarOptions.slice(1).map((option, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className={`${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
          } p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {option.name}
            </h3>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {React.cloneElement(option.icon, {
                className: `w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`,
              })}
            </motion.div>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Resumen de {option.name.toLowerCase()}
          </p>
          <motion.button
            onClick={() => setActiveSection(option.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 py-2 px-4 ${
              isDarkMode
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            } rounded-md transition-colors duration-300`}
          >
            Ver detalles
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
};