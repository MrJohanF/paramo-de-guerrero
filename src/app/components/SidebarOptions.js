//SideBarOptions.js

import React from 'react';
import { Home, Flower2, Leaf, Apple, AlertTriangle, PlusCircle, Droplet, ChartLine } from 'lucide-react';

export const sidebarOptions = [
  { name: "Dashboard", icon: <Home className="w-6 h-6" /> },
  { name: "Plantas", icon: <Flower2 className="w-6 h-6" /> },
  { name: "Crecimiento", icon: <Leaf className="w-6 h-6" /> },
  { name: "Produccion", icon: <Apple className="w-6 h-6" /> },
  { name: "Anomalias", icon: <AlertTriangle className="w-6 h-6" /> },
  { name: "Sensores", icon: <PlusCircle className="w-6 h-6" /> },
  { name: "Estado de plantas", icon: <Droplet className="w-6 h-6" /> },
  { name: "Reportes", icon: <ChartLine className="w-6 h-6" /> },
];