import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { motion } from "framer-motion";

export const FormField = ({ field, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <FormControl fullWidth variant="outlined" className="mb-4">
      {field.type === "select" ? (
        <>
          <InputLabel>{field.name}</InputLabel>
          <Select label={field.name} defaultValue="">
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
        />
      )}
    </FormControl>
  </motion.div>
);