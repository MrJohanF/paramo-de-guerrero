"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";
import {
  CirclePlus,
  Flower2,
  Leaf,
  Droplet,
  Sun,
  Thermometer,
  Bug,
  Apple,
  TriangleAlert,
} from "lucide-react";

const PlantHealthDashboard = () => {
  const [plantStatus, setPlantStatus] = useState("healthy");
  const [activeSection, setActiveSection] = useState("Nueva Planta");

  const mainOptions = [
    { name: "Water", icon: <Droplet className="w-6 h-6" /> },
    { name: "Sunlight", icon: <Sun className="w-6 h-6" /> },
    { name: "Temperature", icon: <Thermometer className="w-6 h-6" /> },
    { name: "Pests", icon: <Bug className="w-6 h-6" /> },
  ];

  const sidebarOptions = [
    { name: "Nueva Planta", icon: <CirclePlus className="w-6 h-6" /> },
    { name: "Crecimiento", icon: <Leaf className="w-6 h-6" /> },
    { name: "Produccion", icon: <Apple className="w-6 h-6" /> },
    { name: "Anomalias", icon: <TriangleAlert className="w-6 h-6" /> },
  ];

  const inputForm = [
    { name: "Codigo", type: "text" },
    { name: "Especie", type: "text" },
    { name: "Ubicacion", type: "text" },
    { name: "Estado Actual", type: "text" },
    { name: "Fecha Estado Actual", type: "date" },
    { name: "Condiciones actuales", type: "text" },
    { name: "Tags", type: "text" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Nueva Planta":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Enter Plant Data</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {inputForm.map((input, index) => (
                  <TextField
                    key={index}
                    label={input.name}
                    type={input.type}
                    InputLabelProps={input.type === "date" ? { shrink: true } : undefined}
                    variant="standard"
                    fullWidth
                  />
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Planta
                </button>
              </div>
            </form>
          </div>
        );
      case "Crecimiento":
        return <div className="mt-8">Contenido de Crecimiento</div>;
      case "Produccion":
        return <div className="mt-8">Contenido de Producción</div>;
      case "Anomalias":
        return <div className="mt-8">Contenido de Anomalías</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Plant Health Tracker</h2>
          <nav>
            {sidebarOptions.map((option, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded ${
                  activeSection === option.name ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveSection(option.name)}
              >
                {option.icon}
                <span className="ml-2">{option.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Plant Image */}
            <div className="w-64 h-64 mx-auto mb-8">
              <Flower2
                className={`w-full h-full ${
                  plantStatus === "healthy" ? "text-green-500" : "text-yellow-500"
                }`}
              />
            </div>
          </div>

          {renderContent()}

          <div className="relative mt-8">
            <div className="w-64 h-64 mx-auto mb-8">
              {/* Main Options */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4">
                  {mainOptions.map((option, index) => (
                    <button
                      key={index}
                      className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      {React.cloneElement(option.icon, { className: "w-6 h-6 text-white" })}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantHealthDashboard;