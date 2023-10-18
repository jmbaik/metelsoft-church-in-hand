import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../scenes/dashboard';
import PastorYoutubeList from '../scenes/youtube';

const MRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/youtube-pastor" element={<PastorYoutubeList />} />
    </Routes>
  );
};

export default MRoutes;
