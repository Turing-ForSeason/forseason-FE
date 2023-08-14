import styled from 'styled-components';

/* 공통 */
export const Wrap = styled.div`
  margin: 0 auto;
  width: 950px;
  height: 100%;
`;

export const Title = styled.div`
  margin: 30px 0;
  h5 {
    color: grey;
    font-size: 16px;
  }
`;

/* TalkList */
export const LocationList = styled.div`
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 100%;

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
  }

  li {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 21px;
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
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    padding: 0 5px;
  }
`;
