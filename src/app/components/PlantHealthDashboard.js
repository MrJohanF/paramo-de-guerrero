"use client";

import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2,
  Leaf,
  Droplet,
  ChartLine,
  Thermometer,
  Bug,
  Apple,
  AlertTriangle,
  PlusCircle,
  Home,
} from "lucide-react";

const PlantHealthDashboard = () => {
  const [plantStatus, setPlantStatus] = useState("healthy");
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sidebarOptions = [
    { name: "Dashboard", icon: <Home className="w-6 h-6" /> },
    { name: "Plantas", icon: <Flower2 className="w-6 h-6" /> },
    { name: "Crecimiento", icon: <Leaf className="w-6 h-6" /> },
    { name: "Produccion", icon: <Apple className="w-6 h-6" /> },
    { name: "Anomalias", icon: <AlertTriangle className="w-6 h-6" /> },
    { name: "Sensores", icon: <PlusCircle className="w-6 h-6" /> },
    { name: "Estado de plantas", icon: <Droplet className="w-6 h-6" /> },
    { name: "Reportes", icon: <ChartLine className="w-6 h-6" /> },
  ];

  const renderForm = (fields) => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((field, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FormControl fullWidth variant="outlined" className="mb-4">
            {field.type === "select" ? (
              <>
                <InputLabel>{field.name}</InputLabel>
                <Select label={field.name} defaultValue="">
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <TextField
                label={field.name}
                type={field.type}
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : undefined
                }
                variant="outlined"
                fullWidth
              />
            )}
          </FormControl>
        </motion.div>
      ))}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="col-span-2 mt-6 py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md"
      >
        Guardar
      </motion.button>
    </motion.form>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{option.name}</h3>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.cloneElement(option.icon, {
                      className: "w-8 h-8 text-green-500",
                    })}
                  </motion.div>
                </div>
                <p className="text-gray-600">
                  Resumen de {option.name.toLowerCase()}
                </p>
                <motion.button
                  onClick={() => setActiveSection(option.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 py-2 px-4 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-300"
                >
                  Ver detalles
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        );

      case "Plantas":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">Registro de Planta</h3>
            {renderForm([
              { name: "Código", type: "text" },
              { name: "Especie", type: "text" },
              { name: "Ubicación", type: "text" },
              {
                name: "Estado Actual",
                type: "select",
                options: [
                  "Saludable",
                  "En crecimiento",
                  "En producción",
                  "Con anomalías",
                ],
              },
              { name: "Fecha Estado Actual", type: "date" },
              { name: "Condiciones Iniciales", type: "text" },
              { name: "Fecha Creación", type: "date" },
              { name: "Tags", type: "text" },
            ])}
          </div>
        );
      case "Crecimiento":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">
              Registro de Crecimiento
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Altura (cm)", type: "number" },
              { name: "Diámetro (cm)", type: "number" },
              { name: "Número de Hojas", type: "number" },
              { name: "Fecha Medición", type: "date" },
            ])}
          </div>
        );
      case "Produccion":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">
              Registro de Producción
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Cantidad (kg)", type: "number" },
              { name: "Fecha Cosecha", type: "date" },
              {
                name: "Calidad",
                type: "select",
                options: ["Excelente", "Buena", "Regular", "Mala"],
              },
              { name: "Destino", type: "text" },
            ])}
          </div>
        );
      case "Anomalias":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">
              Registro de Anomalías
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Descripción", type: "text" },
              { name: "Fecha Detección", type: "date" },
              { name: "Tratamiento Sugerido", type: "text" },
            ])}
          </div>
        );
      case "Sensores":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">
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
          </div>
        );
      case "Estado de plantas":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-400">
              Consultar Estado de Plantas
            </h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Descripción", type: "text" },
              { name: "Fecha Detección", type: "date" },
              { name: "Tratamiento Sugerido", type: "text" },
            ])}
          </div>
        );
        case "Reportes":
          return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-400">
                Reportes de Anomalías
              </h3>
              {renderForm([
                { name: "ID Planta", type: "number" },
                { name: "Descripción", type: "text" },
                { name: "Fecha Detección", type: "date" },
                { name: "Tratamiento Sugerido", type: "text" },
              ])}
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-600">
            Rastreador de salud vegetal
          </h2>
          <nav>
            {sidebarOptions.map((option, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center p-3 mb-2 text-gray-700 hover:bg-green-100 rounded-lg transition-colors duration-300 ${
                  activeSection === option.name
                    ? "bg-green-100 text-green-700"
                    : ""
                }`}
                onClick={() => setActiveSection(option.name)}
              >
                {React.cloneElement(option.icon, { className: "w-6 h-6 mr-3" })}
                <span>{option.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {activeSection}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PlantHealthDashboard;
