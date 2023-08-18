import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LocationList, Title, Wrap } from './LiveTalkElements';
import './LiveTalk.css';

function LiveTalkList() {
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/talk/rooms', {
        params: {
          userId: localStorage.getItem('userId'),
        },
      })
      .then(response => {
        console.log(response.data.code);
        setRoomList(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, []);

  const onClickEnter = roomLocation => {
    axios
      .get('http://localhost:8080/talk/room', {
        params: {
          location: roomLocation,
          userId: localStorage.getItem('userId'),
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
        console.log(error.data.code);
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
        <LocationList>
          <ul>
            {roomList.map(room => (
              <li key={room.id}>
                {/* <Link to={`/community/livetalk/talkroom/${encodeURIComponent(room.location)}`} onClick={() => onClickEnter(room.location)}>{room.location}</Link> */}
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
      </Wrap>
    </div>
  );
}
export default LiveTalkList;
