import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { Snackbar, Alert, Box } from "@mui/material";

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
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
            "Authorization": `Bearer ${token}`
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

  const formFields = [
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
  ];

  return (
    <Box className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 sm:p-6 rounded-lg shadow-md`}>
      <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Registro de Producción
      </h3>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {formFields.map((field, index) => (
          <FormField
            key={field.name}
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
          className={`col-span-1 sm:col-span-2 mt-4 sm:mt-6 py-2 sm:py-3 px-4 sm:px-6 ${
            isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white rounded-lg transition-colors duration-300 shadow-md text-sm sm:text-base`}
        >
          Guardar
        </motion.button>
      </motion.form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductionRegistrationSection;