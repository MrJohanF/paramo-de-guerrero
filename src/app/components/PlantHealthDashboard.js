// PlantHealthDashboard.js

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeContext";
import { Sidebar } from "./Sidebar";
import { FormField } from "./FormField";
import { DashboardSection } from "./DashboardSection";
import PlantRegistrationSection from "./PlantRegistrationSection";
import GrowthRegistrationSection from "./GrowthRegistrationSection";
import ProductionRegistrationSection from "./ProductionRegistrationSection";
import AnomalyRegistrationSection from './AnomalyRegistrationSection';
import LoginComponent from "./LoginComponent";

const TablePaginationActions = dynamic(() => import("./Table"), { ssr: false });

const PlantHealthDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plantStatus, setPlantStatus] = useState("healthy");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection("Dashboard");
  };

  const renderForm = (fields) => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((field, index) => (
        <FormField key={index} field={field} index={index} />
      ))}
    </motion.form>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <DashboardSection setActiveSection={setActiveSection} />;
      case "Plantas":
        return <PlantRegistrationSection isDarkMode={isDarkMode} />;
      case "Crecimiento":
        return <GrowthRegistrationSection isDarkMode={isDarkMode} />;
      case "Produccion":
        return <ProductionRegistrationSection isDarkMode={isDarkMode} />;
      case "Anomalias":
        return <AnomalyRegistrationSection isDarkMode={isDarkMode} />;
      case "Sensores":
        return (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Registro de Sensores
            </h3>
            {renderForm([
              { name: "Nombre Sensor", type: "text" },
              {
                name: "Tipo",
                type: "select",
                options: ["Temperatura", "Humedad", "pH", "Luz"],
              },
              { name: "Ubicación", type: "text" },
              { name: "Fecha Instalación", type: "date" },
            ])}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`col-span-2 mt-6 py-3 px-6 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded-lg transition-colors duration-300 shadow-md`}
            >
              Guardar
            </motion.button>
          </div>
        );
      case "Estado de plantas":
        return (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Consultar Estado de Plantas
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Ubicación", type: "text" },
            ])}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              <TablePaginationActions />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`col-span-2 mt-6 py-3 px-6 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded-lg transition-colors duration-300 shadow-md`}
            >
              Buscar
            </motion.button>
          </div>
        );
      case "Reportes":
        return (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Reportes de Anomalías
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Descripción", type: "text" },
              { name: "Fecha Detección", type: "date" },
              { name: "Tratamiento Sugerido", type: "text" },
            ])}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`col-span-2 mt-6 py-3 px-6 ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white rounded-lg transition-colors duration-300 shadow-md`}
            >
              Generar Reporte
            </motion.button>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <div
      className={`flex flex-col md:flex-row h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`md:hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-4 flex justify-between items-center`}
      >
        <h2
          className={`text-xl font-bold ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          Rastreador de salud vegetal
        </h2>
        <motion.button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isSidebarOpen ? (
            <X
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            />
          )}
        </motion.button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {activeSection}
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
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
