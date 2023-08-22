import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoAuthHandle = props => {
  const navigate = useNavigate(); // 프로그램적으로 라우트를 변경하기 위해 useNavigate 사용

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/login/oauth2/code/kakao?code=${code}`,
        );
        const authToken = res.data.result;
        console.log(res);

        localStorage.setItem('Authorization', authToken);
        localStorage.setItem('token_body', JSON.stringify(res.data));

        // 응답 데이터 확인
        const tokenBody = JSON.parse(localStorage.getItem('token_body'));

        if (
          tokenBody &&
          tokenBody.status === 404 &&
          tokenBody.message === '해당하는 정보의 사용자를 찾을 수 없습니다.' &&
          tokenBody.code === 2003
        ) {
          // 추가 정보 입력 페이지로 리다이렉트
          navigate('/additionalInfo'); // '/additional-info'가 추가 정보 페이지의 라우트라고 가정
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('카카오 로그인 중 오류 발생:', error);
      }
    };

    kakaoLogin();
  }, [navigate]);

  return <div>로그인 중입니다. 잠시만 기다려주세요.</div>;
};

export default KakaoAuthHandle;
