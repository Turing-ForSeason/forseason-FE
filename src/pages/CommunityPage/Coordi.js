import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ContentsContainer,
  Content1,
  CoordinationContainer,
  Info,
  User,
} from '../MainPage/ContentsElements';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Coordi() {
  const navigate = useNavigate();
  const navigateToCoordiDetail = () => {
    navigate('/community/coordi/detail/:boardId');
  };

  const [coordiList, setCoordiList] = useState([]);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get(
        'http://localhost:8080/board/boardlist?page=0&size=3&sort=boardLikeNum,DESC',
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      )
      .then(res => {
        const coordiData = res.data.result.content;
        setCoordiList(
          coordiData.map(coordiData => ({
            id: coordiData.boardId,
            img: coordiData.boardPicture,
            user: coordiData.boardUserNickname,
            like: coordiData.boardLikeNum,
            hashtag: coordiData.boardHashtags,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <ContentsContainer>
      {coordiList.length > 0 ? (
        coordiList.map((coordi, index) => (
          <Content1 key={index}>
            <h5>Contents</h5>
            <h4>포시즌</h4>
            <h4>실시간 코디 스타일</h4>
            <h5>포시즌 유저가 추천하는 코디 아이템을 확인해보세요.</h5>

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

            <button onClick={navigateToCoordiDetail}>코디 자세히 보기 →</button>
          </Content1>
        ))
      ) : (
        <p>게시글이 없습니다</p>
      )}
    </ContentsContainer>
  );
}

export default Coordi;
