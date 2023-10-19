import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../scenes/dashboard';
import PastorYoutubeList from '../scenes/youtube';
import Youon from '../scenes/youtube/Youon';

const MRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/youtube-pastor" element={<PastorYoutubeList />} />
      <Route path="/you-on" element={<Youon />} />
    </Routes>
  );
};

export default MRoutes;
