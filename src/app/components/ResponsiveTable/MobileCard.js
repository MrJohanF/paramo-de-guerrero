// File: components/ResponsiveTable/MobileCard.js
import React from "react";
import { CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledCard, StyledButton } from "./styles";
import { Sparkles, QrCode } from "lucide-react";

const MobileCard = ({ row, onSelectPlant, handleOpenQR }) => {
  const { isDarkMode } = useTheme();

  return (
    <StyledCard isDarkMode={isDarkMode}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, color: isDarkMode ? "#4ade80" : "#1e7e34" }}>
          {row.especie} (Código: {row.codigo})
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Ubicación: {row.ubicacion}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Estado: {row.estado}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Tags: {row.tags}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <StyledButton onClick={() => onSelectPlant(row.codigo)} isDarkMode={isDarkMode}>
            <Sparkles size={20} />
          </StyledButton>
          <StyledButton onClick={() => handleOpenQR(row.qr, row.codigo)} isDarkMode={isDarkMode} size="small">
            <QrCode size={20} />
          </StyledButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MobileCard;