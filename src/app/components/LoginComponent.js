import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Leaf, Lock, User } from 'lucide-react';

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      setError('Por favor, ingrese tanto el usuario como la contraseña');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-green-900 to-gray-900' : 'from-green-100 to-blue-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full`}
      >
        <div className="flex items-center justify-center mb-6">
          <Leaf className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
        </div>
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
          Plant Tracker
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="username" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Usuario</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-2 pl-10 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
              />
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
            </div>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contraseña</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 pl-10 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
              />
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 px-4 ${
              isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            Iniciar Sesión
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginComponent;