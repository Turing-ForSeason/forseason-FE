import React from 'react';
import { Modal } from 'react-bootstrap';
import { styled } from 'styled-components';
import google from './google.jpg';
import kakaotalk from './kakaotalk.png';
import naver from './naver.png';
import './SignUpModal.css';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const CLIENT_ID = '262778662e9437ec42d6cc9d231e88bc';
const REDIRECT_URI = `http://${window.location.host}/api/login/oauth2/code/kakao`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SignUpModal = ({ show, onHide }) => {
  let navigate = useNavigate();
  const onClickBackHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginNav>
          <h1>FOR SEASON</h1>
          <Intro>
            <p>스타일로 연결되는 너와 나, 우리</p>
            <p>날씨 예보부터 코디 공유까지.</p>
          </Intro>
        </LoginNav>
      </Modal.Body>
      <Modal.Footer>
        <p>
          3초안에 시작하기{' '}
          <FontAwesomeIcon icon={faRocket} style={{ color: '#38a0ff' }} />
        </p>
        <Btn>
          <LoginBtn>
            <img src={google} alt="Google" />
          </LoginBtn>
          <LoginBtn onClick={kakaoLogin}>
            <img src={kakaotalk} alt="kakaotalk" />
          </LoginBtn>
          <LoginBtn>
            <img src={naver} alt="naver" />
          </LoginBtn>
        </Btn>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;

const LoginNav = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    color: #38a0ff;
    font-family: 'Koulen', sans-serif;
    text-align: center;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  p {
    text-align: center;
    color: grey;
    margin: 0;
  }
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoginBtn = styled.button`
  width: 45px;
  height: 45px;
  margin-right: 20px;
  border: 0;
  background-color: #fff;
  img {
    width: 45px;
    height: 45px;
  }
`;
