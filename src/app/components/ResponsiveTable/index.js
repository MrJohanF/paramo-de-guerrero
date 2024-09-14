// File: components/ResponsiveTable/index.js

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import {
  TablePagination,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledPaper } from "./styles";
import { fetchPlants, deletePlant } from "../../utils/api";
import DesktopTable from "./DesktopTable";
import MobileCardList from "./MobileCardList";
import PlantTrackerQRModal from "../PlantTrackerQRModal";

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
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [selectedPlantCode, setSelectedPlantCode] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      if (searchResult) {
        setRows(Array.isArray(searchResult) ? searchResult : [searchResult]);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPlants(token);
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError(error.message);
        setLoading(false);
      }
    };

    loadData();
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

  const handleOpenQR = (qrData, plantCode) => {
    if (qrData && qrData.startsWith('<img src="data:image/')) {
      const base64Data = qrData.split("base64,")[1].split('"')[0];
      setSelectedQR(`data:image/gif;base64,${base64Data}`);
      setSelectedPlantCode(plantCode);
      setQrModalOpen(true);
    } else {
      setSelectedQR(null);
      setQrModalOpen(true);
    }
  };

  const handleDeleteClick = (plant) => {
    setPlantToDelete(plant);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (plantToDelete) {
      try {
        await deletePlant(token, plantToDelete.codigo);
        setRows(rows.filter((row) => row.codigo !== plantToDelete.codigo));
      } catch (error) {
        console.error("Error deleting plant:", error);
      }
    }
    setIsDeleteModalOpen(false);
    setPlantToDelete(null);
  };

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
        <MobileCardList
          rows={displayRows}
          onSelectPlant={onSelectPlant}
          handleOpenQR={handleOpenQR}
          handleDeletePlant={handleDeleteClick}
        />
      ) : (
        <DesktopTable
          rows={displayRows}
          onSelectPlant={onSelectPlant}
          handleOpenQR={handleOpenQR}
          handleDeletePlant={handleDeleteClick}
        />
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
      <PlantTrackerQRModal
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        selectedQR={selectedQR}
        plantCode={selectedPlantCode}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDarkMode={isDarkMode}
        title="Confirmar eliminación de planta"
        message="¿Estás seguro de que quieres eliminar esta planta? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </StyledPaper>
  );
};

export default ResponsiveTable;
