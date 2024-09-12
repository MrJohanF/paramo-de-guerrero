import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FormField } from './FormField';
import { Snackbar, Alert } from "@mui/material";

const SensorRegistrationSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    ubicacion: "",
    fecha_instalacion: "",
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
        "https://backend-hackaton-production-f38b.up.railway.app/v1/api/sensor/create",
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
        setSnackbar({
          open: true,
          message: "Sensor registrado exitosamente",
          severity: "success",
        });
        setFormData({
          nombre: "",
          tipo: "",
          ubicacion: "",
          fecha_instalacion: "",
        });
      } else {
        throw new Error("Error al registrar el sensor");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al registrar el sensor",
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
          isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white rounded-lg transition-colors duration-300 shadow-md`}
      >
        Guardar
      </motion.button>
    </motion.form>
  );

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Registro de Sensor
      </h3>
      {renderForm([
        { name: "nombre", type: "text", label: "Nombre Sensor" },
        {
          name: "tipo",
          type: "select",
          label: "Tipo",
          options: ["Temperatura", "Humedad", "pH", "Luz"],
        },
        { name: "ubicacion", type: "text", label: "Ubicación" },
        { name: "fecha_instalacion", type: "date", label: "Fecha Instalación" },
      ])}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SensorRegistrationSection;