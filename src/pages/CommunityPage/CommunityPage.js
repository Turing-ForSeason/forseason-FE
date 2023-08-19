import React from 'react';
import Navbar from '../../components/Nav/Nav.js';
import Footer from '../../components/Footer/Footer';
import LiveTalkList from '../LiveTalkPage/LiveTalkList';
import Coordi from './Coordi.js';
import { Body } from '../LiveTalkPage/LiveTalkElements.js';

function Community() {
  return (
    <div className="communityPage">
      <Navbar />
      <LiveTalkList />
      <Coordi />
      <Footer />
    </div>
  );
}

export default Community;
