import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/Context/AuthProvider'; // 첫 번째 import 문만 유지
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {
  Coordi,
  CoordiTop,
  CoordiTop1,
  CoordiTop2,
  CoordiTop3,
  CoordiLocation,
  CoordiDetailBox,
  CoordiDetailImg,
  CoordiDetailImgContent,
  CoordiDetailInfo,
  CoordiDetailTag,
  CoordiDetailTitle,
  CoordiDetailContents,
  CoordiDetailHashtag,
  CoordiDetailUser,
  CoordiDetailUserImg,
  CoordiDetailUserImgContent,
  CoordiDetailUserInfo,
  CoordiDetailUserName,
  CoordiDetailUserDate,
  CoordiDetailUserIcon,
  CoordiDetailUserIconNum,
  CoordiDetailIconInfo,
  CoordiDetailHashtagContainer,
} from './CoordiDetailElements';
import { AiFillHeart } from 'react-icons/ai';
import { BiCommentDetail, BiCurrentLocation } from 'react-icons/bi';

function CoordiDetailTop({ boardId }) {
  const [board, setBoard] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const getCoordiDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/community/coordi/detail/board/${boardId}`,
        );
        // 응답 데이터 확인용 로그
        console.log(response.data);
        setBoard(response.data);
        setLikeCount(response.data.board.boardLikeNum);
        setIsLoading(false);
      } catch (error) {
        console.log('[CoordiDetail.js] getCoordiDetail() error...');
        console.log(error);
        setIsLoading(false);
      }
    };

    getCoordiDetail();
  }, [boardId]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLikeClick = async () => {
    if (!auth || !auth.token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };
      const requestBody = {};
      await axios.post(
        `http://localhost:8080/community/coordi/detail/board/${boardId}/like`,
        requestBody,
        { headers },
      );
      setLikeCount(prevCount => prevCount + 1);
      // 좋아요 클릭 후 board 객체의 내용 업데이트
      setBoard(prevBoard => ({
        ...prevBoard,
        boardLikeNum: prevBoard.boardLikeNum + 1,
      }));
    } catch (error) {
      console.log('[CoordiDetail.js] handleLikeClick() error...');
      console.log(error);
    }
  };
  return (
    <Coordi>
      <CoordiTop>
        <CoordiTop1>Contents</CoordiTop1>
        <CoordiTop2>포시즌 실시간 코디 STYLE</CoordiTop2>
        <CoordiTop3>
          포시즌 유저가 추천하는 코디 아이템을 확인해보세요.
        </CoordiTop3>
      </CoordiTop>
      {!isLoading && (
        <CoordiLocation>
          <BiCurrentLocation style={{ marginRight: '4px' }} />
          {board.boardLocation}
        </CoordiLocation>
      )}
      <CoordiDetailBox>
        <CoordiDetailImg>
          <CoordiDetailImgContent src={board.boardPicture} />
        </CoordiDetailImg>
        <CoordiDetailInfo>
          <CoordiDetailTag>UserContents</CoordiDetailTag>
          <CoordiDetailTitle>{board.boardTitle}</CoordiDetailTitle>
          <CoordiDetailContents>{board.boardContent}</CoordiDetailContents>
          <CoordiDetailHashtagContainer>
            {board.boardHashtags &&
              board.boardHashtags
                .split(',')
                .map((hashtag, index) => (
                  <CoordiDetailHashtag key={index}>
                    # {hashtag.trim()}
                  </CoordiDetailHashtag>
                ))}
          </CoordiDetailHashtagContainer>
          <CoordiDetailUser>
            <CoordiDetailUserImg>
              <CoordiDetailUserImgContent
                src={board.boardUserProfilePicture || '#f2f2f2'}
              />
            </CoordiDetailUserImg>
            <CoordiDetailUserInfo>
              <CoordiDetailUserName>
                {board.boardUserNickname}
              </CoordiDetailUserName>
              <CoordiDetailUserDate>
                {'작성일'}
                {board.boardDate &&
                  format(parseISO(board.boardDate), 'yyyy년 MM월 dd일 HH:mm')}
              </CoordiDetailUserDate>
            </CoordiDetailUserInfo>
            <CoordiDetailIconInfo>
              <CoordiDetailUserIcon onClick={handleLikeClick}>
                <AiFillHeart />
              </CoordiDetailUserIcon>
              <CoordiDetailUserIconNum>
                {board.boardLikeNum}
              </CoordiDetailUserIconNum>
              <CoordiDetailUserIcon>
                <BiCommentDetail />
              </CoordiDetailUserIcon>
              <CoordiDetailUserIconNum>
                {board.boardCommentNum}
              </CoordiDetailUserIconNum>
            </CoordiDetailIconInfo>
          </CoordiDetailUser>
        </CoordiDetailInfo>
      </CoordiDetailBox>
    </Coordi>
  );
}

export default CoordiDetailTop;
