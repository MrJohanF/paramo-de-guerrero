import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme as useMuiTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export const FormField = ({ field, index }) => {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useTheme();

  const colors = {
    background: isDarkMode ? '#1e2a38' : '#f8f9fa',
    text: isDarkMode ? '#e0e0e0' : '#495057',
    border: isDarkMode ? '#2c3e50' : '#ced4da',
    borderHover: isDarkMode ? '#34495e' : '#adb5bd',
    label: isDarkMode ? '#81b29a' : '#6c757d',
    placeholder: isDarkMode ? '#4a5568' : '#adb5bd',
  };

  const getFieldStyles = () => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.background,
      "& fieldset": {
        borderColor: colors.border,
      },
      "&:hover fieldset": {
        borderColor: colors.borderHover,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.borderHover,
      },
    },
    "& .MuiInputLabel-root": {
      color: colors.label,
    },
    "& .MuiInputBase-input": {
      color: colors.text,
    },
    "& .MuiInputBase-input::placeholder": {
      color: colors.placeholder,
      opacity: 1,
    },
    "& .MuiSelect-icon": {
      color: colors.label,
    },
  });

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <FormControl fullWidth variant="outlined" className="mb-3">
        {field.type === "select" ? (
          <>
            <InputLabel>{field.name}</InputLabel>
            <Select label={field.name} defaultValue="" sx={getFieldStyles()}>
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
            InputLabelProps={
              field.type === "date" ? { shrink: true } : undefined
            }
            variant="outlined"
            fullWidth
            sx={getFieldStyles()}
          />
        )}
      </FormControl>
    </motion.div>
  );
};