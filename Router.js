import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Pages/MainPage/MainPage';
import UserInfo from './Pages/UserInfoPage/UserInfoPage';
import Weather from './Pages/WeatherDetailPage/WeatherDetailPage';
import Community from './Pages/CommunityPage/CommunityPage';
import Coordi from './Pages/CoordiPage/CoordiPage';
import UploadCoordi from './Pages/UploadCoordiPage/UploadCoordiPage';
import CoordiDetail from './Pages/CoordiDetailPage/CoordiDetailPage';
import LiveTalk from './Pages/LiveTalkPage/LiveTalkPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<UserInfo />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/coordi" element={<Coordi />} />
        <Route path="/community/coordi/upload" element={<UploadCoordi />} />
        <Route
          path="/community/coordi/detail/:boardId"
          element={<CoordiDetail />}
        />
        <Route path="/community/livetalk" element={<LiveTalk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
