// File: components/ResponsiveTable/styles.js
import { styled } from "@mui/material/styles";
import { Paper, TableCell, TableRow, Card, Button } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  color: isDarkMode ? "#e0e0e0" : "#000000",
}));

export const StyledTableCell = styled(TableCell)(({ theme, isDarkMode, isHeader }) => ({
  color: isHeader ? (isDarkMode ? "#4ade80" : "#1e7e34") : isDarkMode ? "#a0a0a0" : "#000000",
  borderBottom: `1px solid ${isDarkMode ? "#2d3035" : "#e0e0e0"}`,
  backgroundColor: isHeader ? (isDarkMode ? "#1e2124" : "#f5f5f5") : "transparent",
  fontWeight: isHeader ? "bold" : "normal",
}));

export const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: isDarkMode ? "#23272b" : "#f9f9f9",
  },
  "&:nth-of-type(even)": {
    backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  },
  "&:hover": {
    backgroundColor: isDarkMode ? "#2a2f33" : "#f0f0f0",
  },
}));

export const StyledCard = styled(Card)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  color: isDarkMode ? "#e0e0e0" : "#000000",
  marginBottom: "1rem",
}));

export const StyledButton = styled(Button)(({ theme, isDarkMode }) => ({
  backgroundColor: "#4ade80",
  color: "#000000",
  "&:hover": {
    backgroundColor: "#22c55e",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "40px",
  height: "40px",
  padding: 0,
  borderRadius: "8px",
}));
