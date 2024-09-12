import React, { useState } from "react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { Snackbar, Alert } from "@mui/material";

const ProductionRegistrationSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    id_planta: "",
    cantidad: "",
    fecha_cosecha: "",
    calidad: "",
    destino: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-hackaton-production-f38b.up.railway.app/v1/api/production/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            cantidad: Number(formData.cantidad),
            fecha_cosecha: new Date(formData.fecha_cosecha).toISOString(),
          }),
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Producción registrada exitosamente",
          severity: "success",
        });
        setFormData({
          id_planta: "",
          cantidad: "",
          fecha_cosecha: "",
          calidad: "",
          destino: "",
        });
      } else {
        throw new Error("Error al registrar la producción");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al registrar la producción",
        severity: "error",
      });
    }
  };

  const renderForm = (fields) => (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((field, index) => (
        <FormField
          key={index}
          field={{
            ...field,
            value: formData[field.name],
            onChange: handleChange,
          }}
          index={index}
        />
      ))}
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
        Registro de Producción
      </h3>
      {renderForm([
        { name: "id_planta", type: "number", label: "ID Planta" },
        { name: "cantidad", type: "number", label: "Cantidad (kg)" },
        { name: "fecha_cosecha", type: "date", label: "Fecha Cosecha" },
        {
          name: "calidad",
          type: "select",
          label: "Calidad",
          options: ["Excelente", "Buena", "Regular", "Mala"],
        },
        { name: "destino", type: "text", label: "Destino" },
      ])}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductionRegistrationSection;
