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
  styled,
} from "@mui/material";
import { useTheme } from "./ThemeContext";

const columns = [
  { id: "codigo", label: "Codigo", minWidth: 100 },
  { id: "especie", label: "Especie", minWidth: 120 },
  { id: "ubicacion", label: "Ubicacion", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 150 },
  { id: "tags", label: "Tags", minWidth: 150 },
];

const StyledPaper = styled(Paper)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? '#1e2124' : '#ffffff',
  color: isDarkMode ? '#ffffff' : '#000000',
}));

const StyledTableCell = styled(TableCell)(({ theme, isDarkMode, isHeader }) => ({
  color: isHeader 
    ? (isDarkMode ? '#4ade80' : '#1e7e34')
    : (isDarkMode ? '#ffffff' : '#000000'),
  borderBottom: `1px solid ${isDarkMode ? '#2d3035' : '#e0e0e0'}`,
  backgroundColor: isHeader 
    ? (isDarkMode ? '#1e2124' : '#f5f5f5')
    : 'transparent',
  fontWeight: isHeader ? 'bold' : 'normal',
}));

const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: isDarkMode ? '#24272b' : '#f9f9f9',
  },
  '&:nth-of-type(even)': {
    backgroundColor: isDarkMode ? '#1e2124' : '#ffffff',
  },
  '&:hover': {
    backgroundColor: isDarkMode ? '#2d3035' : '#f0f0f0',
  },
}));

const StyledCard = styled(Card)(({ theme, isDarkMode }) => ({
  backgroundColor: isDarkMode ? '#24272b' : '#ffffff',
  color: isDarkMode ? '#ffffff' : '#000000',
  marginBottom: '1rem',
}));

const ResponsiveTable = ({ token }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }
        const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const MobileCard = ({ row }) => (
    <StyledCard isDarkMode={isDarkMode}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, color: isDarkMode ? '#4ade80' : '#1e7e34' }}>
          {row.especie} (Código: {row.codigo})
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Ubicación: {row.ubicacion}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Estado: {row.estado}
        </Typography>
        <Typography variant="body2">
          Tags: {row.tags}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress color={isDarkMode ? "secondary" : "primary"} />
      </Box>
    );
  }

  return (
    <StyledPaper isDarkMode={isDarkMode} sx={{ width: '100%', overflow: 'hidden' }}>
      {isMobile ? (
        <Box sx={{ p: 2 }}>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <MobileCard key={row.id} row={row} />
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow hover tabIndex={-1} key={row.id} isDarkMode={isDarkMode}>
                    {columns.map((column) => {
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
          color: isDarkMode ? '#ffffff' : '#000000',
          '.MuiTablePagination-select': {
            color: isDarkMode ? '#ffffff' : '#000000',
          },
          '.MuiTablePagination-selectIcon': {
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        }}
      />
    </StyledPaper>
  );
};

export default ResponsiveTable;