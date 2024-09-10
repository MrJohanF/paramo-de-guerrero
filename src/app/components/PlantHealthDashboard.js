'use client';

import React, { useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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
  PlusCircle,
} from "lucide-react";

const PlantHealthDashboard = () => {
  const [plantStatus, setPlantStatus] = useState("healthy");
  const [activeSection, setActiveSection] = useState("Plantas");

  const mainOptions = [
    { name: "Water", icon: <Droplet className="w-6 h-6" /> },
    { name: "Sunlight", icon: <Sun className="w-6 h-6" /> },
    { name: "Temperature", icon: <Thermometer className="w-6 h-6" /> },
    { name: "Pests", icon: <Bug className="w-6 h-6" /> },
  ];

  const sidebarOptions = [
    { name: "Plantas", icon: <Flower2 className="w-6 h-6" /> },
    { name: "Crecimiento", icon: <Leaf className="w-6 h-6" /> },
    { name: "Produccion", icon: <Apple className="w-6 h-6" /> },
    { name: "Anomalias", icon: <TriangleAlert className="w-6 h-6" /> },
    { name: "Sensores", icon: <PlusCircle className="w-6 h-6" /> },
  ];

  const renderForm = (fields) => (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field, index) => (
        <FormControl key={index} fullWidth variant="outlined" className="mb-4">
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
              InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
              variant="outlined"
              fullWidth
            />
          )}
        </FormControl>
      ))}
      <button
        type="submit"
        className="col-span-2 mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Guardar
      </button>
    </form>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Plantas":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Registro de Planta</h3>
            {renderForm([
              { name: "Código", type: "text" },
              { name: "Especie", type: "text" },
              { name: "Ubicación", type: "text" },
              { name: "Estado Actual", type: "text" },
              { name: "Fecha Estado Actual", type: "date" },
              { name: "Condiciones Iniciales", type: "text" },
              { name: "Fecha Creación", type: "date" },
              { name: "Tags", type: "text" },
            ])}
          </div>
        );
      case "Crecimiento":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Registro de Crecimiento</h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Altura", type: "number" },
              { name: "Diámetro", type: "number" },
              { name: "Número de Hojas", type: "number" },
              { name: "Fecha Medición", type: "date" },
            ])}
          </div>
        );
      case "Produccion":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Registro de Producción</h3>
            {renderForm([
              { name: "ID Planta", type: "number" },
              { name: "Cantidad", type: "number" },
              { name: "Fecha Cosecha", type: "date" },
              { name: "Calidad", type: "text" },
              { name: "Destino", type: "text" },
            ])}
          </div>
        );
      case "Anomalias":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Registro de Anomalías</h3>
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
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-600" >Registro de Sensores</h3>
            {renderForm([
              { name: "Nombre Sensor", type: "text" },
              { name: "Tipo", type: "text" },
              { name: "Ubicación", type: "text" },
              { name: "Fecha Instalación", type: "date" },
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
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 ">Plant Health Tracker</h2>
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
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{activeSection}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PlantHealthDashboard;