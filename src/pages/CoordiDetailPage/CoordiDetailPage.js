import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Nav/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CoordiDetailTop from '../../components/CoordiDetail/CoordiDetailTop';
import CoordiComment from '../../components/CoordiDetail/CoordiComments';
import Footer from '../../components/Footer/Footer';
import {
  CommentTag,
  CommentInfo,
  Pagination,
  CommentSubmitButton,
  CommentInput,
  CommentWriteContainer,
} from './CoordiDetailPageElements';

const CoordiDetail = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  // boardId 변수를 useParams()로 추출
  const { boardId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 3개의 댓글을 표시함
  const commentsPerPage = 3;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const token = accessToken ? accessToken.replace('Bearer ', '') : null;
        const response = await axios.get(
          `http://localhost:8080/community/coordi/detail/comments/${boardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Comments:', response.data);
        setComments(response.data);
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

  // 댓글 목록을 현재 페이지에 맞게 자름
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  const handleNewCommentSubmit = async e => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const token = accessToken ? accessToken.replace('Bearer ', '') : null;
      const response = await axios.post(
        `http://localhost:8080/community/coordi/detail/comments/create/${boardId}`,
        {
          commentContents: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newCommentData = response.data;
      console.log('새 댓글: ', response.data);
      setComments(prevComments => [...prevComments, newCommentData]);
      // 댓글 전송 한 후 댓글창 초기화
      setNewComment('');
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <>
      <Navbar />
      <CoordiDetailTop boardId={boardId} />
      <CommentTag>Comments</CommentTag>
      {currentComments && currentComments.length > 0 ? (
        <>
          {currentComments.map(comment => (
            <CoordiComment
              key={comment.commentId}
              comment={comment}
              onNewCommentSubmit={handleNewCommentSubmit}
            />
          ))}
        </>
      ) : (
        <CommentInfo>아직 작성된 댓글이 없습니다.</CommentInfo>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              background: currentPage === index + 1 ? '#eff5ff' : 'transparent',
              border: '1px solid #eff5ff',
              margin: '30px 5px 0 0',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <CommentWriteContainer>
        <form onSubmit={handleNewCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요"
            rows={4}
          />
          <CommentSubmitButton type="submit">작성하기</CommentSubmitButton>
        </form>
      </CommentWriteContainer>
    </>
  );
};

export default CoordiDetail;
