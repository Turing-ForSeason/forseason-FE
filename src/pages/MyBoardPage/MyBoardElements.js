import { styled } from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`;

export const MyBoardContainer = styled.div`
  width: 80%;
  display: flex;
  border-left: 1px solid black;
`;

export const Board = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-left: 1px solid lightgrey;
  padding-left: 20px;
  position: relative;
`;

export const Search = styled.div`
  width: 300px;
  margin: 0 auto;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  button {
    border: 0;
    background-color: #fff;
  }

  input {
    width: 300px;
    height: 30px;
    outline: none;
    border: 0;
  }
`;

export const List1 = styled.div`
  display: flex;
  border: 1px solid lightgrey;
  font-size: 18px;
`;

export const Title = styled.div`
  flex-grow: 5;
  text-align: center;
`;

export const Item = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const Input = styled.div`
  display: flex;
  input {
    width: 13px;
    margin: 0;
  }
  button {
    margin-left: 10px;
    border: 0;
    border-radius: 90px;
    background-color: '#e2e2e2';
  }
`;
export const List2 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
