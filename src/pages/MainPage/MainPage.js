import React from 'react';
import Navbar from '../../components/Nav/Nav.js';
import Banner from '../WeatherDetailPage/Banner.js';
import Contents from './Contents.js';
import Footer from '../../components/Footer/Footer';
import BestCoordi from './BestCoordi.js';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import KakaoAuthHandle from '../../components/Modal/KakaoAuthHandle.js';
import { useNavigate } from 'react-router-dom';

function Main() {
  return (
    <div className="mainPage">
      <Navbar />
      <article className="banner">
        <Banner />
      </article>
      <BestCoordi />
      <Contents />
      <Footer />
    </div>
  );
}

export default Main;
