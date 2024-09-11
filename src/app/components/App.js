'use client';

import React from 'react';
import { ThemeProvider } from './ThemeContext';  // Add this line
import PlantHealthDashboard from './PlantHealthDashboard';

const App = () => (
  <ThemeProvider>
    <PlantHealthDashboard />
  </ThemeProvider>
);

export default App;