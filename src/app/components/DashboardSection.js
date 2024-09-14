import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { sidebarOptions } from "./SidebarOptions";
import WeatherWidget from "./WeatherWidget";

const Card = ({ title, description, icon }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } rounded-lg shadow-md p-4`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {React.cloneElement(icon, { className: "h-6 w-6 text-green-500" })}
      </div>
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        } mb-4`}
      >
        {description}
      </p>
      <button
        className={`text-sm text-green-600 ${
          isDarkMode ? "bg-green-900" : "bg-green-100"
        } px-3 py-1 rounded-md hover:bg-green-200 transition-colors`}
      >
        Ver detalles
      </button>
    </motion.div>
  );
};

const AnalyticsCard = ({ title, value, change, icon: Icon }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } rounded-lg shadow-md p-4`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {title}
        </span>
        <Icon className="h-5 w-5 text-green-500" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-green-600">{change}</p>
    </motion.div>
  );
};

export const DashboardSection = ({ setActiveSection, token }) => {
  const { isDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setRevenueData((prevData) => [
        ...prevData.slice(-9),
        {
          name: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: Math.floor(Math.random() * 1600),
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Saludables", value: 800 },
    { name: "En Riesgo", value: 150 },
    { name: "Insalubre", value: 50 },
  ];
  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >




          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">



            
            {sidebarOptions.slice(1).map((option, index) => (
              <Card
                key={index}
                title={option.name}
                description={`Resumen de ${option.name.toLowerCase()}`}
                icon={option.icon}
              />
            ))}
          </div>

          <WeatherWidget token={token} />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard
              title="Total de Costos"
              value="$2,750"
              change="+20.1% desde el mes pasado"
              icon={DollarSign}
            />
            <AnalyticsCard
              title="Nuevas Plantas"
              value="+780"
              change="+180.1% desde el mes pasado"
              icon={TrendingUp}
            />
            <AnalyticsCard
              title="Sanidad Vegetal"
              value="98%"
              change="+5% desde el mes pasado"
              icon={Activity}
            />
          </div>

         


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-md p-4`}
            >
              <h3 className="text-lg font-semibold mb-4">Plantas Saludables</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={isDarkMode ? "#9CA3AF" : "#6b7280"}
                    />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1F2937" : "white",
                        border: `1px solid ${
                          isDarkMode ? "#374151" : "#e5e7eb"
                        }`,
                        color: isDarkMode ? "white" : "black",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-md p-4`}
            >
              <h3 className="text-lg font-semibold mb-4">
                Distribucion de Plan de Salud
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1F2937" : "white",
                        border: `1px solid ${
                          isDarkMode ? "#374151" : "#e5e7eb"
                        }`,
                        color: isDarkMode ? "white" : "black",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>



          
        </motion.div>
      )}
    </AnimatePresence>
  );
};
