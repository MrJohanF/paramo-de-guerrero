// File: components/ResponsiveTable/DesktopTable.js

import React from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledTableCell, StyledTableRow, StyledButton } from "./styles";
import { columns } from "./constants";
import { Sparkles, QrCode, Trash2 } from "lucide-react";

const DesktopTable = ({ rows, onSelectPlant, handleOpenQR, handleDeletePlant }) => {
  const { isDarkMode } = useTheme();

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                isDarkMode={isDarkMode}
                isHeader
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow
              hover
              tabIndex={-1}
              key={index}
              isDarkMode={isDarkMode}
              sx={rows.length === 1 ? { backgroundColor: isDarkMode ? "#2a4a3e" : "#e6f4ea" } : {}}
            >
              {columns.map((column) => {
                if (column.id === "actions") {
                  return (
                    <StyledTableCell key={column.id} align={column.align} isDarkMode={isDarkMode}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <StyledButton onClick={() => onSelectPlant(row.codigo)} isDarkMode={isDarkMode} size="small">
                          <Sparkles size={20} />
                        </StyledButton>
                        <StyledButton onClick={() => handleOpenQR(row.qr, row.codigo)} isDarkMode={isDarkMode} size="small">
                          <QrCode size={20} />
                        </StyledButton>
                        <StyledButton onClick={() => handleDeletePlant(row.id)} isDarkMode={isDarkMode} size="small" color="error">
                          <Trash2 size={20} />
                        </StyledButton>
                      </Box>
                    </StyledTableCell>
                  );
                }
                const value = row[column.id];
                return (
                  <StyledTableCell key={column.id} align={column.align} isDarkMode={isDarkMode}>
                    {value}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DesktopTable;