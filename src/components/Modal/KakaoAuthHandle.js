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

        const token = res.data.result;
        console.log(res);

        localStorage.setItem('Authorization', token);
        localStorage.setItem('token_body', JSON.stringify(res.data));

        window.location.href = '/';
      } catch (error) {
        console.error('카카오 로그인 중 오류 발생:', error);
      }
    };

    kakaoLogin();
  }, [props.history, navigate]);

  return <div>로그인 중입니다. 잠시만 기다려주세요.</div>;
};

export default KakaoAuthHandle;
