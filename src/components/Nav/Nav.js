import { React, useState, useEffect } from 'react';
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

const Navbar = () => {
  const [SignUpModalOn, setSignUpModalOn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 수행 후 로컬 스토리지의 토큰 제거 및 로그인 상태 설정
    localStorage.removeItem('Authorization');
    setIsLoggedIn(false);

    // 로그아웃 후 메인 페이지로 이동
    navigate('/');
  };

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 토큰을 가져와 로그인 상태를 설정
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsLoggedIn(true);
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
