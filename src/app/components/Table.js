import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  styled,
  Button,
  Modal,
} from "@mui/material";
import { useTheme } from "./ThemeContext";
import { Sparkles, QrCode } from "lucide-react";

const columns = [
  { id: "codigo", label: "Codigo", minWidth: 100 },
  { id: "especie", label: "Especie", minWidth: 120 },
  { id: "ubicacion", label: "Ubicacion", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 150 },
  { id: "tags", label: "Tags", minWidth: 150 },
  { id: "actions", label: "Acciones", minWidth: 100 },
];

const StyledPaper = styled(Paper)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  color: isDarkMode ? "#e0e0e0" : "#000000",
}));

const StyledTableCell = styled(TableCell)(
  ({ theme, isDarkMode, isHeader }) => ({
    color: isHeader
      ? isDarkMode
        ? "#4ade80"
        : "#1e7e34"
      : isDarkMode
      ? "#a0a0a0"
      : "#000000",
    borderBottom: `1px solid ${isDarkMode ? "#2d3035" : "#e0e0e0"}`,
    backgroundColor: isHeader
      ? isDarkMode
        ? "#1e2124"
        : "#f5f5f5"
      : "transparent",
    fontWeight: isHeader ? "bold" : "normal",
  })
);

const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
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

const StyledCard = styled(Card)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  color: isDarkMode ? "#e0e0e0" : "#000000",
  marginBottom: "1rem",
}));

const StyledButton = styled(Button)(({ theme, isDarkMode }) => ({
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

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? "#1e2124" : "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  padding: theme.spacing(2, 4, 3),
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
}));

const ResponsiveTable = ({
  token,
  searchResult,
  isLoading,
  error,
  onSelectPlant,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [openQR, setOpenQR] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (searchResult) {
        setRows(Array.isArray(searchResult) ? searchResult : [searchResult]);
        setLoading(false);
        return;
      }

      try {
        if (!token) {
          throw new Error("No authentication token available");
        }
        const response = await fetch(
          "https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, searchResult]);

  useEffect(() => {
    setPage(0);
  }, [searchResult]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenQR = (qrData) => {
    // Asumiendo que qrData es una cadena base64 que incluye el prefijo de datos
    if (qrData && qrData.startsWith('<img src="data:image/')) {
      // Extraer la parte base64 de la cadena
      const base64Data = qrData.split("base64,")[1].split('"')[0];
      setSelectedQR(`data:image/gif;base64,${base64Data}`);
    } else {
      // Si no es una cadena base64 válida, mostrar un mensaje de error
      setSelectedQR(null);
    }
    setOpenQR(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
  };

  const downloadQR = () => {
    if (selectedQR) {
      const link = document.createElement("a");
      link.href = selectedQR;
      link.download = "QR_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const MobileCard = ({ row }) => (
    <StyledCard isDarkMode={isDarkMode}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 1, color: isDarkMode ? "#4ade80" : "#1e7e34" }}
        >
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
          <StyledButton
            onClick={() => onSelectPlant(row.codigo)}
            isDarkMode={isDarkMode}
          >
            <Sparkles size={20} />
          </StyledButton>
          <StyledButton
            onClick={() => handleOpenQR(row.qr)}
            isDarkMode={isDarkMode}
          >
            <QrCode size={20} />
          </StyledButton>
        </Box>
      </CardContent>
    </StyledCard>
  );

  if (loading || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress color={isDarkMode ? "secondary" : "primary"} />
      </Box>
    );
  }

  if (fetchError || error) {
    return (
      <Alert severity="error" className="my-4">
        <AlertTitle>Error</AlertTitle>
        {fetchError || error}
      </Alert>
    );
  }

  const displayRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <StyledPaper
      isDarkMode={isDarkMode}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {isMobile ? (
        <Box sx={{ p: 2 }}>
          {displayRows.map((row, index) => (
            <MobileCard key={index} row={row} />
          ))}
        </Box>
      ) : (
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
              {displayRows.map((row, index) => (
                <StyledTableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  isDarkMode={isDarkMode}
                  sx={
                    rows.length === 1
                      ? { backgroundColor: isDarkMode ? "#2a4a3e" : "#e6f4ea" }
                      : {}
                  }
                >
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          isDarkMode={isDarkMode}
                        >
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <StyledButton
                              onClick={() => onSelectPlant(row.codigo)}
                              isDarkMode={isDarkMode}
                              size="small"
                            >
                              <Sparkles size={20} />
                            </StyledButton>
                            <StyledButton
                              onClick={() => handleOpenQR(row.qr)}
                              isDarkMode={isDarkMode}
                              size="small"
                            >
                              <QrCode size={20} />
                            </StyledButton>
                          </Box>
                        </StyledTableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        isDarkMode={isDarkMode}
                      >
                        {value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: isDarkMode ? "#a0a0a0" : "#000000",
          ".MuiTablePagination-select": {
            color: isDarkMode ? "#a0a0a0" : "#000000",
          },
          ".MuiTablePagination-selectIcon": {
            color: isDarkMode ? "#a0a0a0" : "#000000",
          },
        }}
      />
      <StyledModal
        open={openQR}
        onClose={handleCloseQR}
        aria-labelledby="qr-modal-title"
        aria-describedby="qr-modal-description"
      >
        <ModalContent isDarkMode={isDarkMode}>
          <h2 id="qr-modal-title">Código QR</h2>
          {selectedQR ? (
            <img
              src={selectedQR}
              alt="QR Code"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p>No se pudo cargar el código QR.</p>
          )}
          {selectedQR && (
            <Button
              onClick={downloadQR}
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Descargar QR
            </Button>
          )}
        </ModalContent>
      </StyledModal>
    </StyledPaper>
  );
};

export default ResponsiveTable;
