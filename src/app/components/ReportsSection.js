import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, Droplet, Thermometer, Wind, Leaf, TrendingUp, AlertTriangle, Activity, Download } from 'lucide-react';

const PlantTrackerDashboard = ({ isDarkMode, token }) => {
  const [plants, setPlants] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const [productions, setProductions] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [sensors, setSensors] = useState([]);

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const fetchOptions = {
          headers: headers,
        };

        const plantsResponse = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/plants', fetchOptions);
        const evolutionsResponse = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/evolution', fetchOptions);
        const productionsResponse = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/production', fetchOptions);
        const anomaliesResponse = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/anomalies', fetchOptions);
        const sensorsResponse = await fetch('https://backend-hackaton-production-f38b.up.railway.app/v1/api/sensor', fetchOptions);

        if (!plantsResponse.ok || !evolutionsResponse.ok || !productionsResponse.ok || !anomaliesResponse.ok || !sensorsResponse.ok) {
          throw new Error('One or more API requests failed');
        }

        setPlants(await plantsResponse.json());
        setEvolutions(await evolutionsResponse.json());
        setProductions(await productionsResponse.json());
        setAnomalies(await anomaliesResponse.json());
        setSensors(await sensorsResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
        // You might want to add some error handling UI here
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const plantHealthData = [
    { name: 'Saludables', value: plants.filter(p => p.estado === 'Saludable').length },
    { name: 'Necesitan Atención', value: plants.filter(p => p.estado !== 'Saludable' && p.estado !== 'Crítico').length },
    { name: 'Críticas', value: plants.filter(p => p.estado === 'Crítico').length },
  ];

  const DashboardCard = ({ title, value, icon: Icon, change }) => (
    <div className={`${cardBgColor} rounded-lg shadow-md p-4`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
        <Icon className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      {change && (
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change} desde el mes pasado
        </p>
      )}
    </div>
  );

  const handleExportReports = () => {
    console.log('Exportando informes...');
    // Implement report export logic here
  };

  const getLatestEvolution = () => {
    if (evolutions.length === 0) return null;
    return evolutions.reduce((latest, current) => 
      new Date(current.fecha_medicion) > new Date(latest.fecha_medicion) ? current : latest
    );
  };

  const latestEvolution = getLatestEvolution();

  return (
    <div className={`${bgColor} min-h-screen p-6`}>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${textColor} mb-2`}>Tablero de Control de Plant Tracker</h1>
          <p className={`${textColor} opacity-75`}>Monitorea y rastrea la salud y el crecimiento de tus plantas</p>
        </div>
        <button
          onClick={handleExportReports}
          className={`flex items-center px-4 py-2 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition duration-300`}
        >
          <Download className="w-5 h-5 mr-2" />
          Exportar Informes
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total de Plantas" value={plants.length} icon={Leaf} />
        <DashboardCard title="Crecimiento Promedio" value={latestEvolution ? `${latestEvolution.altura} cm` : 'N/A'} icon={TrendingUp} />
        <DashboardCard title="Problemas de Salud" value={anomalies.length} icon={AlertTriangle} />
        <DashboardCard title="Sensores Activos" value={sensors.length} icon={Droplet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className={`${cardBgColor} rounded-lg shadow-md p-4`}>
          <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Distribución de Salud de las Plantas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plantHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`${cardBgColor} rounded-lg shadow-md p-4`}>
          <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Condiciones Ambientales</h3>
          <div className="grid grid-cols-2 gap-4">
            {sensors.slice(0, 4).map((sensor, index) => (
              <DashboardCard key={index} title={sensor.tipo} value={sensor.nombre} icon={
                sensor.tipo === 'Temperatura' ? Thermometer :
                sensor.tipo === 'Humedad' ? Droplet :
                sensor.tipo === 'Luz' ? Sun : Wind
              } />
            ))}
          </div>
        </div>
      </div>

      <div className={`${cardBgColor} rounded-lg shadow-md p-4 mb-8`}>
        <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Actividades Recientes</h3>
        <ul className={`${textColor} space-y-2`}>
          {productions.slice(0, 3).map((production, index) => (
            <li key={index} className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Cosechadas {production.cantidad} plantas de calidad {production.calidad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantTrackerDashboard;