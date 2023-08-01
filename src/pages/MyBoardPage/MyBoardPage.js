import React from 'react';
import Navbar from '../../components/Nav/Nav';
import MypageNav from '../../components/UserInfo/MyPageNav';
import {
  MyBoardContainer,
  Wrap,
  Board,
  List1,
  List2,
  Title,
  Item,
  Input,
  Search,
} from './MyBoardElements';
import styles from '../../components/UserInfo/MyPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MyBoard = () => {
  return (
    <div>
      <Wrap>
        <Navbar />
        <MyBoardContainer>
          <MypageNav />
          <Board>
            <div className={styles.blankItem} />
            <h3>작성한 게시글</h3>
            <Search>
              <input placeholder="제목 검색" />
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </Search>
            <List1>
              <Title>제목</Title>
              <Item>작성일</Item>
              <Item>조회수</Item>
              <Item>좋아요</Item>
            </List1>
            <List1>여기는 게시판 리스트</List1>
            <List1>여기는 게시판 리스트</List1>
            <List1>여기는 게시판 리스트</List1>
            <List2>
              <Input>
                <input type="checkbox" /> 전체 선택
              </Input>
              <Input>
                <button>삭제</button>
                <button>글쓰기</button>
              </Input>
            </List2>
          </Board>
        </MyBoardContainer>
      </Wrap>
    </div>
  );
};

export default MyBoard;
