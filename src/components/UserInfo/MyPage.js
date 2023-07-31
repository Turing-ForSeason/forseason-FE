// src/components/UserInfo/MyPage.js

import React from 'react';
import styles from './MyPage.module.css';
import Navbar from '../Nav/Nav';
import MyPageNav from './MyPageNav';
import MyPageContent from './MyPageContent';

const MyPage = () => {
  return (
    <div className={styles.myPage}>
      <Navbar />
      <div className={styles.myPageWrap}>
        <MyPageNav />
        <MyPageContent />
      </div>
    </div>
  );
};

export default MyPage;
