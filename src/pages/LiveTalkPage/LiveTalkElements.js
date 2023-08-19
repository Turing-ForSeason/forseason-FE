import styled from 'styled-components';

/* 공통 */
export const Body = styled.div`
  background-color: #f2f2f2;
`;

export const Wrap = styled.div`
  margin: 0 auto;
  width: 950px;
  height: 100%;

  @media (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`;

export const Title = styled.div`
  margin-top: 10px;
  h5 {
    color: grey;
    font-size: 16px;
  }
`;

/* TalkList */
export const LocationList = styled.div`
  background-color: #fff;
  border-radius: 10px;
  width: 50%;
  height: 100%;

  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
  }

  li {
    width: 110px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 17px;
    margin: 15px 0;
  }

  a {
    text-decoration: none;
    color: black !important;
  }

  a:hover {
    color: lightgrey !important;
  }
`;

/* TalkRoom */
export const MessageWrap = styled.div`
  width: 900px;
  height: 700px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 950px) {
    width: 100%;
    margin: 0;
  }
`;

export const InfoWrap = styled.div`
  background-color: #eef4fa;
`;

export const Info = styled.div`
  margin: 10px 20px 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    margin: 0;
    font-size: 16px;
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    padding: 0 4px;
  }
  a {
    text-decoration: none;
    color: black !important;
  }

  a:hover {
    color: lightgrey !important;
  }
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    padding: 0 5px;
  }
`;

export const ContentDate = styled.div`
  display: flex;
  justify-content: flex-end;
`;
