import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormField } from './FormField';
import dynamic from 'next/dynamic';

const TablePaginationActions = dynamic(() => import("./Table"), { ssr: false });

const PlantStatusSection = ({ isDarkMode, token }) => {
  const [plantId, setPlantId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResult(null);

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
      setSearchResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
        onChange={(e) => setPlantId(e.target.value)}
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

  const renderSearchResult = () => {
    if (isLoading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }

    if (searchResult) {
      return (
        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-xl font-semibold mb-2">Resultado de la búsqueda:</h4>
          <p>Código: {searchResult.codigo}</p>
          <p>Especie: {searchResult.especie}</p>
          <p>Ubicación: {searchResult.ubicacion}</p>
          <p>Estado: {searchResult.estado}</p>
          <p>Tags: {searchResult.tags}</p>
        </div>
      );
    }

    return null;
  };

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
      {renderSearchResult()}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        <TablePaginationActions token={token} />
      </div>
    </div>
  );
};

export default PlantStatusSection;