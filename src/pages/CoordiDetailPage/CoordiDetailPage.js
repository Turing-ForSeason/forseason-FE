import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams 추가
import CoordiDetailTop from '../../components/CoordiDetail/CoordiDetailTop';
import CoordiComment from '../../components/CoordiDetail/CoordiComments';
import {
  CommentTag,
  CommentInfo,
  Pagination,
} from './CoordiDetailPageElements';

const CoordiDetail = () => {
  const [comments, setComments] = useState([]);
  const { boardId } = useParams(); // boardId 변수를 useParams()로 추출
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/community/coordi/detail/comments/${boardId}`,
        );
        setComments(response.data.comments);
      } catch (error) {
        console.log('[CoordiDetailPage.js] fetchComments() error...');
        console.log(error);
      }
    };

    fetchComments();
  }, [boardId, currentPage]); // boardId 추가
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const handleNewCommentSubmit = async newComment => {
    try {
      const response = await axios.post(
        `http://localhost:8080/community/coordi/detail/comments/${boardId}`,
        {
          commentContents: newComment,
        },
      );
      const newCommentData = response.data; // Get the newly created comment
      setComments(prevComments => [...prevComments, newCommentData]);
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };
  return (
    <>
      <Navbar />
      <CoordiDetailTop boardId={boardId} />
      <CommentTag>Comments</CommentTag>
      {comments && comments.length > 0 ? (
        <>
          {comments.map(comment => (
            <CoordiComment
              key={comment.commentId}
              comment={comment}
              onNewCommentSubmit={handleNewCommentSubmit}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(comments.length / commentsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <CommentInfo>아직 작성된 댓글이 없습니다.</CommentInfo>
      )}
    </>
  );
};

export default CoordiDetail;
