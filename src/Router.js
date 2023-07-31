import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/MainPage/MainPage';
import UserInfo from './pages/UserInfoPage/UserInfoPage';
import Weather from './pages/WeatherDetailPage/WeatherDetailPage';
import Community from './pages/CommunityPage/CommunityPage';
import Coordi from './pages/CoordiPage/CoordiPage';
import UploadCoordi from './pages/UploadCoordiPage/UploadCoordiPage';
import CoordiDetail from './pages/CoordiDetailPage/CoordiDetailPage';
import LiveTalk from './pages/LiveTalkPage/LiveTalkPage';

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