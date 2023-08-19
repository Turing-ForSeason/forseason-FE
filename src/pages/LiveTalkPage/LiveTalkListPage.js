import React from 'react';
import Navbar from '../../components/Nav/Nav.js';
import Footer from '../../components/Footer/Footer';
import LiveTalkList from './LiveTalkList';
import { Body } from './LiveTalkElements.js';

function LiveTalkListPage() {
  return (
    <div>
      <Navbar />
      <Body>
        <LiveTalkList />
        <Footer />
      </Body>
    </div>
  );
}

export default LiveTalkListPage;
