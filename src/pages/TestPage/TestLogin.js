import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TestLogin() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPw, setInputPw] = useState('');
    const navigate = useNavigate();

    localStorage.setItem('userUUID', null);
    localStorage.setItem('userId',null);

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onClickLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', {
            email: inputEmail,
            password: inputPw
        })
        .then((response) => {
            if(response.data.auth === 'REJECT'){
                alert('로그인 실패!');
            }
            else if(response.data.auth === 'CONFIRM'){
                localStorage.setItem('userId',response.data.userId.toString());
                navigate("/community/livetalk/talklist");
            }
            else{
                alert('잘못된 응답');
            }
        })
        .catch();
    };

    return (
        <form>
            <input type='email' placeholder='Enter email' value={inputEmail} onChange={handleInputEmail}/>
            <input type='password' placeholder='Enter password' value={inputPw} onChange={handleInputPw}/>
            <button type='submit' onClick={onClickLogin}>로그인</button>
        </form>
    );
}
export default TestLogin;