import React from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavElements';

const Navbar = () => {
  return (
    <Nav>
      <NavLogo to="/" activeStyle>
        FOR SEASON
      </NavLogo>
      <Bars />
      <NavMenu>
        <NavLink to="/weather" activeStyle>
          날씨
        </NavLink>
        <NavLink to="/community/coordi" activeStyle>
          코디 모아보기
        </NavLink>
        <NavLink to="/community/coordi/detail/:boardId" activeStyle>
          코디 자세히 보기
        </NavLink>
        <NavLink to="/community/coordi/upload" activeStyle>
          코디 업로드
        </NavLink>
        <NavLink to="/community/livetalk" activeStyle>
          Live Talk
        </NavLink>
        <NavLink to="/mypage" activeStyle>
          마이페이지
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/" activeStyle>
          로그인
        </NavBtnLink>
        <NavBtnLink to="/" activeStyle>
          마이페이지
        </NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
