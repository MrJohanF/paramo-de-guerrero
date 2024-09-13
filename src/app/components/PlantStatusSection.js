import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import Table from "./Table";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useTheme } from "./ThemeContext";
import FormattedRecommendations from "./FormattedRecommendations";

const PlantStatusSection = ({ token }) => {
  const [plantId, setPlantId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);
  const { isDarkMode } = useTheme();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!plantId.trim()) {
      setSearchResult(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants/${plantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plant data");
      }
      const data = await response.json();
      setSearchResult([data]);
    } catch (err) {
      setError(err.message);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPlantId(value);
    if (!value.trim()) {
      setSearchResult(null);
    }
  };

  const handleSelectPlant = (plantId) => {
    setSelectedPlantId(plantId);
  };

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!selectedPlantId) return;

      setIsRecommendationLoading(true);
      setRecommendationError(null);

      try {
        console.log(`Fetching recommendation for plant ID: ${selectedPlantId}`);
        //  const response = await fetch(`https://backend-hackaton-production-f38b.up.railway.app/v1/api/assistance/ia/${selectedPlantId}`,
        const response = await fetch(
          `https://backend-hackaton-production-f38b.up.railway.app/v1/api/assistance/ia/12`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received recommendation data:", data);
        setRecommendation(data);
      } catch (err) {
        console.error("Error fetching recommendation:", err);
        setRecommendationError(`Error fetching recommendation: ${err.message}`);
      } finally {
        setIsRecommendationLoading(false);
      }
    };

    fetchRecommendation();
  }, [selectedPlantId, token]);

  const renderForm = () => (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <FormField
        field={{ name: "ID Planta", type: "number", label: "ID Planta" }}
        index={0}
        value={plantId}
        onChange={handleInputChange}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`col-span-2 mt-6 py-3 px-6 ${
          isDarkMode
            ? "bg-green-600 hover:bg-green-700"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-lg transition-colors duration-300 shadow-md`}
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </motion.button>
    </motion.form>
  );

  return (
    <Box>
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-md mb-6`}
      >
        <h3
          className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Consultar estado de plantas
        </h3>
        {renderForm()}
        <Box mt={6}>
          <Table
            token={token}
            searchResult={searchResult}
            isLoading={isLoading}
            error={error}
            onSelectPlant={handleSelectPlant}
            isDarkMode={isDarkMode}
          />
        </Box>
      </div>

      {selectedPlantId && (
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-md mt-6`}
        >
          {isRecommendationLoading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress />
            </Box>
          ) : recommendationError ? (
            <Typography color="error" mt={6}>
              {recommendationError}
            </Typography>
          ) : (
            <FormattedRecommendations recommendation={recommendation} />
          )}
        </div>
      )}
    </Box>
  );
};

export default PlantStatusSection;
