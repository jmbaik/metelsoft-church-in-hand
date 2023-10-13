import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../scenes/dashboard';

const MRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default MRoutes;
