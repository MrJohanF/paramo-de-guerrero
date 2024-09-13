import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FormField } from './FormField';
import { Snackbar, Alert, Box } from "@mui/material";

const GrowthRegistrationSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    id_planta: "",
    altura: "",
    diametro: "",
    num_hojas: "",
    fecha_medicion: "",
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
    console.log("Formulario enviado", formData);
    try {
      const response = await fetch(
        "https://backend-hackaton-production-f38b.up.railway.app/v1/api/evolution/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Respuesta exitosa");
        setSnackbar({
          open: true,
          message: "Registro de crecimiento guardado exitosamente",
          severity: "success",
        });
        setFormData({
          id_planta: "",
          altura: "",
          diametro: "",
          num_hojas: "",
          fecha_medicion: "",
        });
      } else {
        console.error("Error en la respuesta", await response.text());
        throw new Error("Error al guardar el registro de crecimiento");
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setSnackbar({
        open: true,
        message: "Error al guardar el registro de crecimiento",
        severity: "error",
      });
    }
  };

  const formFields = [
    { name: "id_planta", type: "number", label: "ID Planta" },
    { name: "altura", type: "number", label: "Altura (cm)" },
    { name: "diametro", type: "number", label: "Diámetro (cm)" },
    { name: "num_hojas", type: "number", label: "Número de Hojas" },
    { name: "fecha_medicion", type: "date", label: "Fecha Medición" },
  ];

  return (
    <Box className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 sm:p-6 rounded-lg shadow-md`}>
      <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Registro de Crecimiento
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
          sx={{ width: '100%' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GrowthRegistrationSection;