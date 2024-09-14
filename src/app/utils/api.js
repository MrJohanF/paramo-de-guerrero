// File: utils/api.js
export const fetchPlants = async (token) => {
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
    return data;
  };