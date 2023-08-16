import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoAuthHandle(props) {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    const kakaoLogin = async () => {
      axios
        .get(`http://localhost:8080/api/login/oauth2/code/kakao?code=${code}`)
        .then(res => {
          localStorage.setItem('token', res.data.result);
          window.location.href = '/';
        })
        .catch(error => {
          alert(error.response.data.message);
          window.location.href = '/';
        });
    };
    kakaoLogin();
  }, [props.history]);
  return (
    <>
      <div>로그인 중입니다. 잠시만 기다려주세요.</div>
    </>
  );
}
export default KakaoAuthHandle;
