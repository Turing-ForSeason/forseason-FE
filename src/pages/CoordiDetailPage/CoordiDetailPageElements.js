import styled from 'styled-components';

export const CommentTag = styled.nav`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 5px;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const CommentInfo = styled.nav`
  font-size: 14px;
  margin-left: 5px;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const Pagination = styled.nav``;

export const CommentWriteContainer = styled.div`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

export const CommentInput = styled.textarea`
  width: 800px;
  height: 50px;
  padding: 10px;
  padding-left: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: -18px;
`;

export const CommentSubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #38a0ff;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;
