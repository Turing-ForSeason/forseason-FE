import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Comment,
  CommentUserImg,
  CommentUserImgContent,
  CommentUserInfo,
  CommentUserName,
  CommentContent,
  CommentBox,
} from './CoordiCommentElements';

const CoordiComment = ({ comment, onNewCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');
  const { boardId } = useParams();
  const handleCommentSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/community/coordi/detail/comments/${boardId}`,
        {
          commentContents: newComment,
        },
      );
      console.log('Comment Response Data:', response.data);
      onNewCommentSubmit(newComment);
      setNewComment('');
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };
  return (
    <CommentBox>
      <Comment>
        <CommentUserImg>
          <CommentUserImgContent src={comment.commentUserProfilePicture} />
        </CommentUserImg>
        <CommentUserInfo>
          <CommentUserName>{comment.commentUserNickname}</CommentUserName>
          <CommentContent>{comment.commentContents}</CommentContent>
        </CommentUserInfo>
      </Comment>
    </CommentBox>
  );
};

export default CoordiComment;
