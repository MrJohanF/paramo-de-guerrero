import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Leaf, Lock, User, ChevronLeft } from "lucide-react";
import PlantLoadingAnimation from "./PlantLoadingAnimation";
import useLogin from "./useLogin";

const LoginComponent = ({ onLogin, onBackToHome }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    userInfo,
    handleLogin,
  } = useLogin();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin();
    if (result) {
      onLogin(result.token, result.userInfo);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${
        isDarkMode ? "from-green-900 to-gray-900" : "from-green-100 to-blue-100"
      } px-4 py-6 sm:px-6 sm:py-8`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 sm:p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } w-full max-w-md relative`}
      >
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className={`absolute top-4 left-4 flex items-center ${
            isDarkMode
              ? "text-green-400 hover:text-green-300"
              : "text-green-600 hover:text-green-500"
          } transition-colors duration-300`}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Volver</span>
        </motion.a>

        <div className="flex items-center justify-center mb-4 mt-8">
          <Leaf
            className={`w-10 h-10 sm:w-12 sm:h-12 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          />
        </div>
        <h2
          className={`text-xl sm:text-2xl font-bold mb-6 text-center ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          Plant Tracker
        </h2>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <PlantLoadingAnimation />
            <p
              className={`mt-4 text-sm sm:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Verificando cuenta...
            </p>
          </div>
        ) : userInfo ? (
          <div
            className={`mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Información del usuario
            </h3>
            <p className="text-sm sm:text-base">ID: {userInfo.id}</p>
            <p className="text-sm sm:text-base">
              Usuario: {userInfo.usernamer}
            </p>
            <p className="text-sm sm:text-base">Rol: {userInfo.role}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="username"
                className={`block mb-2 text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full p-2 pl-10 rounded-md text-base ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                />
                <User
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={16}
                />
              </div>
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className={`block mb-2 text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 pl-10 rounded-md text-base ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                />
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={16}
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 mb-4 text-center text-sm sm:text-base">
                {error}
              </p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-2 px-4 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-base`}
            >
              Iniciar Sesión
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginComponent;