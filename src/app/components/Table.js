import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
} from "@mui/material";

const columns = [
  { id: "codigo", label: "Codigo", minWidth: 100 },
  { id: "especie", label: "Especie", minWidth: 120 },
  { id: "ubicacion", label: "Ubicacion", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 150 },
  { id: "tags", label: "Tags", minWidth: 150 },
];

const ResponsiveTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants');
        const data = await response.json();
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const MobileCard = ({ row }) => (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="mb-2">
          {row.especie} (Código: {row.codigo})
        </Typography>
        <Typography variant="body2" className="mb-1">
          Ubicación: {row.ubicacion}
        </Typography>
        <Typography variant="body2" className="mb-1">
          Estado: {row.estado}
        </Typography>
        <Typography variant="body2">
          Tags: {row.tags}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper className="w-full overflow-hidden">
      {isMobile ? (
        <Box className="p-4">
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <MobileCard key={row.id} row={row} />
            ))}
        </Box>
      ) : (
        <TableContainer className="max-h-[440px]">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
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
      />
    </Paper>
  );
};

export default ResponsiveTable;