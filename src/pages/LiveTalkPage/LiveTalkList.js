import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LocationList, Title, Wrap, Half } from './LiveTalkElements';
import './LiveTalk.css';
import TalkPreview from '../CommunityPage/TalkPreview';

function LiveTalkList() {
  const token = localStorage.getItem('Authorization');

  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/talk/rooms', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        console.log(response.data.code);
        setRoomList(response.data.result);
      })
      .catch(error => {
        alert(error.response.data.message);
        window.location.href = '/';
      });
  }, []);

  const onClickEnter = roomLocation => {
    axios
      .get('http://localhost:8080/talk/room', {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          location: roomLocation,
        },
      })
      .then(response => {
        localStorage.setItem('userUUID', response.data.result);
        console.log(response.data.result);
        navigate(
          `/community/livetalk/talkroom/${encodeURIComponent(roomLocation)}`,
          { replace: true },
        );
      })
      .catch(error => {
        alert(error.response.data.message);
        window.location.href = '/';
      });
  };

  return (
    <div>
      <Wrap>
        <Title>
          <h5>Contents</h5>
          <h4>포시즌</h4>
          <h4>실시간 날씨 TALK</h4>
          <h5>포시즌 유저와 지역별 실시간 날씨 상황을 공유해보세요.</h5>
        </Title>
        <Half>
          <LocationList>
            <ul>
              {roomList.map(room => (
                <li key={room.id}>
                  <a href="#" onClick={() => onClickEnter(room.location)}>
                    {room.location}
                  </a>
                </li>
              ))}
              <li />
              <li />
              <li />
            </ul>
          </LocationList>
          <LocationList>
            <TalkPreview />
          </LocationList>
        </Half>
      </Wrap>
    </div>
  );
}
export default LiveTalkList;
