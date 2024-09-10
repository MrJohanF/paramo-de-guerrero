"use client";

import React, { useState } from "react";
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

  const mainOptions = [
    { name: "Water", icon: <Droplet className="w-6 h-6" /> },
    { name: "Sunlight", icon: <Sun className="w-6 h-6" /> },
    { name: "Temperature", icon: <Thermometer className="w-6 h-6" /> },
    { name: "Pests", icon: <Bug className="w-6 h-6" /> },
  ];

  const sidebarOptions = [
    { name: "Nueva Planta", icon: <CirclePlus className="w-6 h-6 " /> },
    { name: "Crecimiento", icon: <Leaf className="w-6 h-6 " /> },
    { name: "Produccion", icon: <Apple className="w-6 h-6" /> },
    { name: "Anomalias", icon: <TriangleAlert className="w-6 h-6" /> },
  ];

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
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
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
                  plantStatus === "healthy"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              />
            </div>
          </div>

          {/* Data Entry Form */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Enter Plant Data</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="plantName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Plant Name
                  </label>
                  <input
                    type="text"
                    id="plantName"
                    name="plantName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="plantType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Plant Type
                  </label>
                  <select
                    id="plantType"
                    name="plantType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option>Select type</option>
                    <option>Flowering</option>
                    <option>Foliage</option>
                    <option>Succulent</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Plant Data
                </button>
              </div>
            </form>
          </div>

          <div className="relative">
            <div className="w-64 h-64 mx-auto mb-8">
              {/* Main Options */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4">
                  {mainOptions.map((option, index) => (
                    <button
                      key={index}
                      className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      {option.icon}
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
