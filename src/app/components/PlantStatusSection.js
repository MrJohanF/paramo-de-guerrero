import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormField } from './FormField';
import dynamic from 'next/dynamic';
import { Alert, AlertTitle } from '@mui/material';

const TablePaginationActions = dynamic(() => import("./Table"), { ssr: false });

const PlantStatusSection = ({ isDarkMode, token }) => {
  const [plantId, setPlantId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (plantId === '') {
      setSearchResult(null);
      setError(null);
    }
  }, [plantId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    if (plantId === '') {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants/${plantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontró ninguna planta con el ID proporcionado.');
        }
        throw new Error('Error al obtener los datos de la planta. Por favor, intente de nuevo.');
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
      className="flex items-end space-x-4 mb-6"
    >
      <div className="flex-grow">
        <FormField 
          field={{ name: "ID Planta", type: "number", label: "ID Planta" }}
          index={0}
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-2 ${
          isDarkMode
            ? "bg-green-600 hover:bg-green-700"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-lg transition-colors duration-300 shadow-md h-[56px]`}
        disabled={isLoading}
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </motion.button>
    </motion.form>
  );

  const renderStatus = () => {
    if (error) {
      return (
        <Alert severity="error" className="my-4">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
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
      {renderStatus()}
      <div className="mt-6">
        <TablePaginationActions 
          token={token} 
          searchResult={searchResult}
          isLoading={isLoading}
          error={error}
          plantId={plantId}
        />
      </div>
    </div>
  );
};

export default PlantStatusSection;