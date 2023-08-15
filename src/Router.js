import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/MainPage/MainPage';
import UserInfo from './pages/UserInfoPage/UserInfoPage';
import EditProfile from './pages/EditProfilePage/EditProfilePage';
import MyBoard from './pages/MyBoardPage/MyBoardPage';
import MyComment from './pages/MyCommentPage/MyCommentPage';
import Weather from './pages/WeatherDetailPage/WeatherDetailPage';
import Community from './pages/CommunityPage/CommunityPage';
import Coordi from './pages/CoordiPage/CoordiPage';
import UploadCoordi from './pages/UploadCoordiPage/UploadCoordiPage';
import CoordiDetail from './pages/CoordiDetailPage/CoordiDetailPage';
import TestLogin from './pages/TestPage/TestLogin';
import LiveTalkList from './pages/LiveTalkPage/LiveTalkList';
import LiveTalkRoom from './pages/LiveTalkPage/LiveTalkRoom';
import KakaoAuthHandle from './components/Modal/KakaoAuthHandle';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<UserInfo />} />
        <Route path="/mypage/editprofile" element={<EditProfile />} />
        <Route path="/mypage/myboard" element={<MyBoard />} />
        <Route path="/mypage/mycomment" element={<MyComment />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/coordi" element={<Coordi />} />
        <Route path="/community/coordi/upload" element={<UploadCoordi />} />
        <Route
          path="/community/coordi/detail/:boardId"
          element={<CoordiDetail />}
        />
        <Route path="/community/livetalk/talklist" element={<LiveTalkList />} />
        <Route
          path="/community/livetalk/talkroom/:location"
          element={<LiveTalkRoom />}
        />

        <Route
          path="/api/login/oauth2/code/kakao"
          element={<KakaoAuthHandle />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
