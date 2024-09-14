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

export const deletePlant = async (token, plantId) => {
  if (!token) {
    throw new Error("No authentication token available");
  }
  try {
    const response = await fetch(
      `https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants/delete/${plantId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete plant. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};