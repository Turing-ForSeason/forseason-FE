import styled from 'styled-components';

export const Comment = styled.nav`
  background: #ffffff;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const CommentUserImg = styled.nav`
  width: 60px;
  height: 60px;
  margin: 10px;
  margin-left: 5px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: 0.5px solid #d9d9d9;
  overflow: hidden;
`;

export const CommentUserImgContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CommentUserInfo = styled.nav`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export const CommentUserName = styled.nav`
  height: 20px;
  width: 100px;
  margin-left: 5px;
  margin-top: 2px;
  font-size: 16px;
`;

export const CommentContent = styled.nav`
  height: 20px;
  width: 100%;
  margin-left: 5px;
  margin-top: 14px;
  font-size: 14px;
  background: #f3f3f3;
  width: 100%;
  align-item: left;
  border-radius: 20px;
  padding: 9px 9px 9px 19px;
`;

export const CommentBox = styled.div`
  /* Add your styling for the comment input box here */
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

export const CommentSubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
