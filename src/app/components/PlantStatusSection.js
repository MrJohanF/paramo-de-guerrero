import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormField } from './FormField';
import Table from './Table'; // Update this line to match your actual file name

const PlantStatusSection = ({ isDarkMode, token }) => {
  const [plantId, setPlantId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!plantId.trim()) {
      setSearchResult(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants/${plantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch plant data');
      }
      const data = await response.json();
      setSearchResult([data]); // Wrap the single result in an array
    } catch (err) {
      setError(err.message);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPlantId(value);
    if (!value.trim()) {
      setSearchResult(null);
    }
  };

  const renderForm = () => (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <FormField 
        field={{ name: "ID Planta", type: "number", label: "ID Planta" }}
        index={0}
        value={plantId}
        onChange={handleInputChange}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`col-span-2 mt-6 py-3 px-6 ${
          isDarkMode
            ? "bg-green-600 hover:bg-green-700"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-lg transition-colors duration-300 shadow-md`}
        disabled={isLoading}
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </motion.button>
    </motion.form>
  );

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
      {renderForm()}
      <div className="mt-6">
        <Table 
          token={token}
          searchResult={searchResult}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default PlantStatusSection;