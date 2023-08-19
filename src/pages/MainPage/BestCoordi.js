import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ContentsContainer,
  Content1,
  CoordinationContainer,
  Info,
  User,
} from './ContentsElements';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BestCoordi() {
  const navigate = useNavigate();
  const navigateToCommunity = () => {
    navigate('/community');
  };

  const [coordi, setCoordi] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(
        'http://localhost:8080/board/boardlist?page=0&size=4&sort=boardLikeNum,DESC',
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then(res => {
        const coordi = res.data;
        setCoordi({
          id: coordi.result.getContent[0].boardId,
          img: coordi.result.getContent[0].boardPicture,
          user: coordi.result.getContent[0].boardUserNickname,
          like: coordi.result.getContent[0].boardLikeNum,
          hashtag: coordi.result.getContent[0].boardHashtags,
        });
      });
  }, []);

  return (
    <ContentsContainer>
      <Content1>
        <h5>Contents</h5>
        <h4>포시즌</h4>
        <h4>실시간 BEST 3 코디</h4>
        <h5>포시즌 유저가 추천하는 오늘의 코디를 확인해보세요.</h5>

        <CoordinationContainer>
          <img src={coordi.img} alt="코디사진" />
          <Info>
            <User>
              <FontAwesomeIcon icon={faUser} />
              <h4>{coordi.user}</h4>
              <h4>님</h4>
            </User>
            <User>
              <FontAwesomeIcon icon={faHeart} />
              <h4>{coordi.like}</h4>
            </User>
            <User>
              <span>{coordi.hashtag}</span>
            </User>
          </Info>
        </CoordinationContainer>

        <button onClick={navigateToCommunity}>커뮤니티 더보기 →</button>
      </Content1>
    </ContentsContainer>
  );
}

export default BestCoordi;
