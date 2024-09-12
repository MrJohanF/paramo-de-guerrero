import React from 'react';
import { motion } from 'framer-motion';
import { FormField } from './FormField';
import dynamic from 'next/dynamic';

const TablePaginationActions = dynamic(() => import("./Table"), { ssr: false });

const PlantStatusSection = ({ isDarkMode, token }) => {
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
        <TablePaginationActions token={token} />
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
};

export default PlantStatusSection;