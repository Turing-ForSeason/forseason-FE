import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <ul>
        {roomList.map(room => (
          <ul>
            <li key={room.id}>
              {/* <Link to={`/community/livetalk/talkroom/${encodeURIComponent(room.location)}`} onClick={() => onClickEnter(room.location)}>{room.location}</Link> */}
              <a href="#" onClick={() => onClickEnter(room.location)}>
                {room.location}
              </a>
            </li>
          </ul>
        ))}
      </ul>
    </div>
  );
}
export default LiveTalkList;
