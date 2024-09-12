import React, { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogOut, User } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { sidebarOptions } from "./SidebarOptions";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut",
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const Sidebar = ({
  isOpen,
  setIsOpen,
  activeSection,
  setActiveSection,
  onLogout,
  userInfo,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const memoizedSidebarOptions = useMemo(() => sidebarOptions, []);

  const handleSectionClick = useCallback((name) => {
    setActiveSection(name);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [setActiveSection, setIsOpen]);

  const sidebarContent = (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={sidebarVariants}
      className={`w-full md:w-64 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg overflow-y-auto fixed md:static top-0 left-0 h-full z-50`}
    >
      <div className="p-6">
        <motion.h2
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-green-400" : "text-green-600"
          } hidden md:block`}
        >
          Rastreador de salud vegetal
        </motion.h2>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className={`mb-6 p-4 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-green-100"
          }`}
        >
          <div className="flex items-center mb-2">
            <User
              className={`w-8 h-8 mr-2 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <span
              className={`font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {userInfo?.username || "Usuario"}
            </span>
          </div>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Rol: {userInfo?.role || "No especificado"}
          </p>
        </motion.div>

        <nav>
          <AnimatePresence>
            {memoizedSidebarOptions.map((option) => (
              <motion.a
                key={option.name}
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                href="#"
                className={`flex items-center p-3 mb-2 ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-green-100"
                } rounded-lg transition-colors duration-300 ${
                  activeSection === option.name
                    ? isDarkMode
                      ? "bg-gray-700 text-green-400"
                      : "bg-green-100 text-green-700"
                    : ""
                }`}
                onClick={() => handleSectionClick(option.name)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {React.cloneElement(option.icon, {
                  className: "w-6 h-6 mr-3",
                })}
                <span>{option.name}</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </nav>
        <motion.button
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          onClick={toggleTheme}
          className={`mt-6 p-3 w-full flex items-center justify-center ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400"
              : "bg-gray-200 text-gray-800"
          } rounded-lg transition-colors duration-300`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 mr-2" />
          ) : (
            <Moon className="w-6 h-6 mr-2" />
          )}
          {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
        </motion.button>
        <motion.button
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          onClick={onLogout}
          className={`mt-4 p-3 w-full flex items-center justify-center ${
            isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
          } rounded-lg transition-colors duration-300`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-6 h-6 mr-2" />
          Cerrar sesión
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {(isOpen || (typeof window !== "undefined" && window.innerWidth >= 768)) && sidebarContent}
    </AnimatePresence>
  );
};