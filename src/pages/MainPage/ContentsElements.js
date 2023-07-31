import { styled } from 'styled-components';

/* 레이아웃 */
export const ContentsContainer = styled.div`
  width: 950px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 1240px) {
    width: 100%;
  }
`;

/* 실시간 베스트 3 코디 */
export const ContentCoordiContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Content1 = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  padding: 50px 0;

  button {
    position: absolute;
    right: 30px;
    bottom: 0;
    border: 0;
    border-radius: 90px;
    padding: 2px 10px;
    color: black;
  }

  button:hover {
    cursor: pointer;
    color: gray;
  }

  h5 {
    color: gray;
  }
`;

/* 기온별 옷차림 */
export const Content2 = styled.div`
  width: 100%;
  height: 50%;
  padding: 50px 0;

  img {
    width: 350px;
    border-radius: 3%;
    padding: 15px 5px;
    box-shadow: 2px 3px 5px 0px lightgrey;
    margin-top: 10px;
  }

  h5 {
    color: gray;
  }

  @media (max-width: 1240px) {
    padding-left: 20px;
    img {
      width: 40%;
    }
  }
`;

export const ContentImg = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CoordinationContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 280px;
  margin-top: 10px;

  img {
    width: 100%;
    height: 400px;
    border-radius: 5%;
    box-shadow: 2px 3px 5px 0px lightgrey;
  }

  h4 {
    margin-left: 5px;
    margin-block-end: 0;
    margin-block-start: 0;
    font-size: 18px;
  }

  span {
    background-color: #fff;
    padding: 2px 8px;
    border-radius: 90px;
    margin: 0 10px 5px 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 1;
  transition: all 0.3s ease;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 10px 20px;
  font-size: 15px;
`;
