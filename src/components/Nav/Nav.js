import { React, useState } from 'react';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Button,
} from './NavElements';
import SignUpModal from '../Modal/SignUpModal';

const Navbar = () => {
  const [SignUpModalOn, setSignUpModalOn] = useState(false);

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
        <NavLink to="/community/livetalk/talklist" activeStyle>
          Live Talk
        </NavLink>
        <NavLink to="/mypage" activeStyle>
          마이페이지
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink>
          <Button variant="secondary" onClick={() => setSignUpModalOn(true)}>
            로그인
          </Button>
        </NavBtnLink>
        <SignUpModal
          show={SignUpModalOn}
          onHide={() => setSignUpModalOn(false)}
        />
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
