import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherWidget = ({ token }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!token) {
        setError('No authentication token available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/weather', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(`Error fetching weather data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [token]);

  const getWeatherIcon = (skycodeday) => {
    const code = parseInt(skycodeday);
    if (code >= 0 && code <= 12) return <Sun className="h-8 w-8 text-yellow-400" />;
    if (code >= 13 && code <= 18) return <CloudSnow className="h-8 w-8 text-blue-200" />;
    if (code >= 19 && code <= 30) return <CloudRain className="h-8 w-8 text-blue-400" />;
    if (code >= 31 && code <= 34) return <Sun className="h-8 w-8 text-yellow-400" />;
    if (code >= 35 && code <= 43) return <CloudRain className="h-8 w-8 text-blue-500" />;
    return <Cloud className="h-8 w-8 text-gray-400" />;
  };

  if (loading) return <div className={`text-center p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cargando datos del clima...</div>;
  if (error) return (
    <div className={`text-center text-red-500 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <p>{error}</p>
      <p className="text-sm mt-2">Por favor, intenta recargar la página o inicia sesión nuevamente si el problema persiste.</p>
    </div>
  );
  if (!weatherData.length) return <div className={`text-center p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No hay datos del clima disponibles.</div>;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md p-4`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Thermometer className="mr-2 h-5 w-5 text-green-500" />
        Pronóstico del Tiempo - Bogota D.C
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {weatherData.slice(0, 5).map((day, index) => (
          <div key={index} className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'} p-3 rounded-lg transition-colors duration-200 ease-in-out`}>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium mb-2">{day.shortday}</span>
              {getWeatherIcon(day.skycodeday)}
              <div className="mt-2 text-center">
                <span className="text-lg font-bold">{day.high}°</span>
                <span className="text-sm mx-1">/</span>
                <span className="text-sm">{day.low}°</span>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <Droplets className="h-4 w-4 mr-1 text-blue-400" />
                <span>{day.precip || '0'}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;