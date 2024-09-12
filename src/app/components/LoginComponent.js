import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Leaf, Lock, User } from 'lucide-react';

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          await fetchUserInfo(data.token);
          await fetchUsers(data.token);
          onLogin(data.token); 
        } else {
          setError('Credenciales inválidas');
        }
      } catch (error) {
        setError('Error en el inicio de sesión');
      }
    } else {
      setError('Por favor, ingrese tanto el usuario como la contraseña');
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/auth/info-user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error('Error al obtener información del usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud de información del usuario', error);
    }
  };

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error al obtener la lista de usuarios');
      }
    } catch (error) {
      console.error('Error en la solicitud de lista de usuarios', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
      fetchUsers(token);
    }
  }, []);

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
        {userInfo ? (
          <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <h3 className="text-xl font-semibold mb-2">Información del usuario</h3>
            <p>ID: {userInfo.id}</p>
            <p>Usuario: {userInfo.usernamer}</p>
            <p>Rol: {userInfo.role}</p>
          </div>
        ) : (
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
        )}
        {users.length > 0 && (
          <div className={`mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <h3 className="text-xl font-semibold mb-2">Lista de usuarios</h3>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  {user.username} - {user.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginComponent;