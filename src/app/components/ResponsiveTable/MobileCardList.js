// File: components/ResponsiveTable/MobileCardList.js
import React from "react";
import { Box } from "@mui/material";
import MobileCard from "./MobileCard";

const MobileCardList = ({ rows, onSelectPlant, handleOpenQR }) => (
  <Box sx={{ p: 2 }}>
    {rows.map((row, index) => (
      <MobileCard key={index} row={row} onSelectPlant={onSelectPlant} handleOpenQR={handleOpenQR} />
    ))}
  </Box>
);

export default MobileCardList;