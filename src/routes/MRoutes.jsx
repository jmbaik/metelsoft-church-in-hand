import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../scenes/dashboard';
import PastorYoutubeList from '../scenes/youtube';
import Youon from '../scenes/youtube/Youon';
import CommonCode from '../scenes/admin/CommonCode';
import YoutubeMain from '../scenes/youtube/YoutubeMain';

const MRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/youtube-pastor" element={<PastorYoutubeList />} />
      <Route path="/you-on" element={<Youon />} />
      <Route path="/youtube-main" element={<YoutubeMain />} />
      <Route path="/common-code" element={<CommonCode />} />
    </Routes>
  );
};

export default MRoutes;
