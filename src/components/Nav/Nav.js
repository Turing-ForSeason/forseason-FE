import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  Button,
} from './NavElements';
import SignUpModal from '../Modal/SignUpModal';
const CLIENT_ID = '262778662e9437ec42d6cc9d231e88bc';
const REDIRECT_URI = `http://${window.location.host}/logout/service`;
const LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}`;

const Navbar = () => {
  const [SignUpModalOn, setSignUpModalOn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 수행 후 로컬 스토리지의 토큰 제거 및 로그인 상태 설정
    window.location.href = LOGOUT_URL;
  };

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 토큰을 가져와 로그인 상태를 설정
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Nav>
      <NavLogo to="/" activestyle="true">
        FOR SEASON
      </NavLogo>
      <Bars />
      <NavMenu>
        <NavLink to="/weather" activestyle="true">
          날씨
        </NavLink>
        <NavLink to="/community/coordi" activestyle="true">
          코디 모아보기
        </NavLink>
        <NavLink to="/community" activestyle="true">
          커뮤니티
        </NavLink>
        <NavLink to="/community/coordi/upload" activestyle="true">
          코디 업로드
        </NavLink>
        <NavLink to="/community/livetalk/talklist" activestyle="true">
          Live Talk
        </NavLink>
        <NavLink to="/mypage" activestyle="true">
          마이페이지
        </NavLink>
      </NavMenu>
      <NavBtn>
        {isLoggedIn ? (
          <Button variant="secondary" onClick={() => handleLogout()}>
            로그아웃
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setSignUpModalOn(true)}>
            로그인
          </Button>
        )}

        <SignUpModal
          show={SignUpModalOn}
          onHide={() => setSignUpModalOn(false)}
        />
      </NavBtn>
    </Nav>
  );
};

export default Navbar;

export const ServiceLogout = () => {
  const token = localStorage.getItem('Authorization');
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/logout/service', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then()
      .catch(error => {
        alert(error.response.data.message);
      });

    localStorage.removeItem('Authorization');

    // 로그아웃 후 메인 페이지로 이동
    navigate('/');
  });

  return <div>로그아웃 중입니다. 잠시만 기다려주세요.</div>;
};
