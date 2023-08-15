import React from 'react';
import Navbar from '../../components/Nav/Nav.js';
import Banner from '../WeatherDetailPage/Banner.js';
import Contents from './Contents.js';
import Footer from '../../components/Footer/Footer';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import KakaoAuthHandle from '../../components/Modal/KakaoAuthHandle.js';

function Main() {
  // JWT 토큰 초기화
  // localStorage.setItem('token', null);

  return (
    <div className="mainPage">
      <Navbar />
      <article className="banner">
        <Banner />
      </article>
      <Routes>
        <Route
          exact
          path="/api/login/oauth2/code/kakao"
          element={<KakaoAuthHandle />}
        />
      </Routes>

      <Contents />
      <Footer />
    </div>
  );
}

export default Main;
