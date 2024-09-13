import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { Sidebar } from "./Sidebar";
import { DashboardSection } from "./DashboardSection";
import PlantRegistrationSection from "./PlantRegistrationSection";
import GrowthRegistrationSection from "./GrowthRegistrationSection";
import ProductionRegistrationSection from "./ProductionRegistrationSection";
import AnomalyRegistrationSection from "./AnomalyRegistrationSection";
import SensorRegistrationSection from "./SensorRegistrationSection";
import PlantStatusSection from "./PlantStatusSection";
import LoginComponent from "./LoginComponent";
import LandingPage from './LandingPage';

const PlantHealthDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const { isDarkMode } = useTheme();


  useEffect(() => {
    setIsMounted(true);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchUserInfo(storedToken);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://backend-hackaton-production-f38b.up.railway.app/v1/api/auth/info-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error("Error al obtener información del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud de información del usuario", error);
    }
  };

  const handleLogin = (newToken, newUserInfo) => {
    setToken(newToken);
    setUserInfo(newUserInfo);
    localStorage.setItem("token", newToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setUserInfo(null);
    localStorage.removeItem("token");
    setActiveSection("Dashboard");
  };

  const renderContent = () => {
    const sections = {
      Dashboard: <DashboardSection setActiveSection={setActiveSection} token={token} />,
      Plantas: <PlantRegistrationSection isDarkMode={isDarkMode} token={token} />,
      Crecimiento: <GrowthRegistrationSection isDarkMode={isDarkMode} token={token} />,
      Produccion: <ProductionRegistrationSection isDarkMode={isDarkMode} token={token} />,
      Anomalias: <AnomalyRegistrationSection isDarkMode={isDarkMode} token={token} />,
      Sensores: <SensorRegistrationSection isDarkMode={isDarkMode} token={token} />,
      "Estado de plantas": <PlantStatusSection isDarkMode={isDarkMode} token={token} />,
      Reportes: <AnomalyRegistrationSection isDarkMode={isDarkMode} token={token} />,
    };

    return sections[activeSection] || null;
  };

  if (!isMounted) {
    return null;
  }

  if (showLandingPage) {
    return <LandingPage onGetStarted={() => setShowLandingPage(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} onBackToHome={() => setShowLandingPage(true)} />;
  }

  return (
    <div className={`flex flex-col md:flex-row h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`md:hidden ${isDarkMode ? "bg-gray-800" : "bg-white"} p-4 flex justify-between items-center`}>
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
          Rastreador de salud vegetal
        </h2>
        <motion.button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isSidebarOpen ? (
            <X className={`w-6 h-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
          )}
        </motion.button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        userInfo={userInfo}
      />

      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            {activeSection}
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PlantHealthDashboard;