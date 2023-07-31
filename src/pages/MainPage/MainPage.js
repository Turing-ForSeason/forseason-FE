import React from 'react';
import Navbar from '../../components/Nav/Nav.js';
import Banner from '../WeatherDetailPage/Banner.js';
import Contents from './Contents.js';
import Footer from '../../components/Footer/Footer';

function Main() {
  return (
    <div className="mainPage">
      <Navbar />
      <article className="banner">
        <Banner />
      </article>
      <Contents />
      <Footer />
    </div>
  );
}

export default Main;
