import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Wrap,
  Title,
  Info,
  MessageWrap,
  InfoWrap,
  Location,
  UserCount,
} from './LiveTalkElements';
import './LiveTalk.css';
import Navbar from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  faLocationCrosshairs,
  faCommentDots,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LiveTalkRoom(props) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [userCount, setUserCount] = useState(0);

  const roomLocation = useRef('');
  const userUUID = useRef('');
  const stompClient = useRef(null);
  const userNickname = useRef('');
  const userProfilePicture = useRef('');

  const page = useRef(0);
  const prevMessage = useRef(null);

  const searchLocation = useLocation();
  const locationPathname = searchLocation.pathname;

  // 이제부터 필요한 함수들 나열
  const updateUserCount = () => {
    // userCount를 갱신해주는 함수
    axios
      .get('http://localhost:8080/talk/room/userCount', {
        params: {
          location: roomLocation.current,
        },
      })
      .then(response => {
        setUserCount(response.data.result.userCount);
      })
      .catch(error => {
        console.error('Fail to update userCount', error);
      });
  };

  const getTalkRecords = () => {
    // page를 이용하여 이전 채팅 기록들을 DB로부터 가져오는 함수
    axios
      .get('http://localhost:8080/talk/talks', {
        params: {
          page: page.current,
          location: roomLocation.current,
          userUUID: userUUID.current,
        },
      })
      .then(response => {
        const messageList = response.data.result;
        setMessages(prevMessages => [...messageList, ...prevMessages]);

        page.current += 1;
      })
      .catch(error => {
        console.error('Failed to get talk records: ', error);
      });
  };

  const initUser = () => {
    // 사용자 정보 초기화해주는 함수
    // 사용자의 닉네임과 프사를 DB로부터 불러와서 변수에 저장해줌
    axios
      .get('http://localhost:8080/talk/user/init', {
        params: {
          location: roomLocation.current,
          userUUID: userUUID.current,
        },
      })
      .then(response => {
        userNickname.current = response.data.result.userNickname;
        userProfilePicture.current = response.data.result.userProfilePicture;
      })
      .catch(error => {
        console.error('Failed to initialize user: ', error);
      });
  };

  const sendMessage = event => {
    // 메세지 보낼때
    event.preventDefault();

    if (messageContent && stompClient.current) {
      const chatMessage = {
        type: 'TALK',
        location: roomLocation.current,
        userUUID: userUUID.current,
        userNickname: userNickname.current,
        userProfilePicture: userProfilePicture.current,
        content: messageContent,
        date: null,
      };

      stompClient.current.send(
        '/pub/talk/sendMessage',
        {},
        JSON.stringify(chatMessage),
      );
      setMessageContent('');
    }
  };

  const onMessageReceived = payload => {
    // 메세지 받았을때
    // const message = JSON.parse(payload.body.result);
    const message = JSON.parse(payload.body).result;

    if (message.type === 'ENTER' || message.type === 'LEAVE') updateUserCount();
    else setMessages(prevMessages => [...prevMessages, message]);
  };

  const onError = payload => {
    // 에러메세지 받았을때
    if (payload !== null) {
      //   const errorResponse = JSON.parse(payload.body);
      console.log(payload);
      console.log(payload.body.code);
      console.log(payload.body.message);
    }

    // Handle errors and cleanup
    axios
      .post('http://localhost:8080/talk/user/delete', {
        location: roomLocation.current,
        userUUID: userUUID.current,
      })
      .catch(error => {
        console.error('Failed to delete user: ', error);
      });
  };

  const onConnect = () => {
    // 채널 구독
    stompClient.current.subscribe(
      `/sub/talk/room/${roomLocation.current}`,
      onMessageReceived,
    );

    // 입장 메세지 날리기
    stompClient.current.send(
      '/pub/talk/enter',
      {},
      JSON.stringify({
        type: 'ENTER',
        location: roomLocation.current,
        userUUID: userUUID.current,
        userNickname: null,
        userProfilePicture: null,
        content: null,
        date: null,
      }),
    );

    // Initialize user
    console.log('initUser' + roomLocation.current);
    initUser();

    // Load previous messages
    console.log('getTalkRecords' + userUUID.current);
    getTalkRecords();
  };

  useEffect(() => {
    // userUUID 초기화
    userUUID.current = localStorage.getItem('userUUID');
    console.log(userUUID.current);
    localStorage.removeItem('userUUID');

    //roomLocation 초기화
    roomLocation.current = decodeURIComponent(
      locationPathname.split('/').pop(),
    );

    // stompClient 초기화 (소켓)
    let socket = new SockJS('http://localhost:8080/stomp/talk');
    stompClient.current = Stomp.over(socket);

    if (stompClient.current !== null) {
      // 연결
      console.log('stompClient 설정 됨');
      stompClient.current.connect({}, onConnect, onError);
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.send(
          '/pub/talk/leave',
          {},
          JSON.stringify({
            type: 'LEAVE',
            location: roomLocation.current,
            userUUID: userUUID.current,
            userNickname: null,
            userProfilePicture: null,
            content: null,
            date: null,
          }),
        );
      }
    };
  }, []);

  useEffect(() => {
    // 혹시라도 messages에 널이 들어갈까봐 추가.
    if (messages.length > 0 && messages[messages.length - 1] === null) {
      setMessages(prevMessages =>
        prevMessages.slice(0, prevMessages.length - 1),
      );
    }
  }, [messages]);

  const MessageArea = props => {
    let message;
    if (props.chat.type === 'TALK') {
      if (
        props.chat.userUUID === null ||
        props.chat.userUUID === userUUID.current
      ) {
        message = <MyMessage chat={props.chat} />;
      } else {
        message = <OtherMessage chat={props.chat} />;
      }
    } else if (props.chat.type === 'MINE') {
      message = <OtherMessage chat={props.chat} />;
    }
    return (
      <div>
        <DateBar chat={props.chat} />
        {message}
      </div>
    );
  };

  const MyMessage = props => {
    return (
      <span className="myMessage">
        <li>
          <div>
            <img
              src={props.chat.userProfilePicture}
              className="userProfilePictureElement"
            />
            <div className="userNameElement">{props.chat.userNickname}</div>
          </div>
          <div className="contentElement">{props.chat.content}</div>
          <DateParse date={props.chat.date} />
        </li>
      </span>
    );
  };

  const OtherMessage = props => {
    return (
      <span className="otherMessage">
        <li>
          <div>
            <img
              src={props.chat.userProfilePicture}
              className="userProfilePictureElement"
            />
            <div className="userNameElement">{props.chat.userNickname}</div>
          </div>
          <div className="contentElement">{props.chat.content}</div>
          <DateParse date={props.chat.date} />
        </li>
      </span>
    );
  };

  const DateParse = props => {
    let date = new Date(props.date);
    let stringDate = null;

    if (date.getHours() < 12) {
      stringDate =
        '오전 ' +
        String(date.getHours()) +
        ':' +
        String(date.getMinutes()).padStart(2, '0');
    } else if (date.getHours() === 12) {
      stringDate =
        '오후 ' +
        String(date.getHours()) +
        ':' +
        String(date.getMinutes()).padStart(2, '0');
    } else {
      stringDate =
        '오후 ' +
        String(date.getHours() - 12) +
        ':' +
        String(date.getMinutes()).padStart(2, '0');
    }

    return <div className="dateElement">{stringDate}</div>;
  };

  const DateBar = props => {
    let DateBarElement = null;
    const prevMessageCurrent = prevMessage.current;
    let currentDate = new Date(props.chat.date);
    let currentStringDate =
      String(currentDate.getFullYear()) +
      '년 ' +
      String(currentDate.getMonth() + 1) +
      '월 ' +
      String(currentDate.getDate()) +
      '일';

    if (prevMessageCurrent === null) {
      DateBarElement = (
        <div className="dateBarElement">
          <FontAwesomeIcon icon={faCalendarDays} size="sm" />
          {currentStringDate}
        </div>
      );
    } else {
      let prevDate = new Date(prevMessageCurrent.date);
      let prevStringDate =
        String(prevDate.getFullYear()) +
        '년 ' +
        String(prevDate.getMonth() + 1) +
        '월 ' +
        String(prevDate.getDate()) +
        '일';

      if (currentStringDate !== prevStringDate) {
        DateBarElement = (
          <div className="dateBarElement">
            <FontAwesomeIcon icon={faCalendarDays} size="sm" />
            {currentStringDate}
          </div>
        );
      }
    }

    prevMessage.current = props.chat;
    return DateBarElement;
  };

  const RoomHead = props => {
    const roomLocationCurrent = roomLocation.current;
    return (
      <Info>
        <Location>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
          <h5> {roomLocationCurrent}</h5>
        </Location>
        <UserCount>
          <FontAwesomeIcon icon={faCommentDots} />
          <div>{userCount}명 참여중</div>
        </UserCount>
      </Info>
    );
  };

  /* 채팅 추가될 때마다 스크롤 아래로 이동 */
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="body">
      <Navbar />
      <Wrap>
        <Title>
          <h5>Contents</h5>
          <h4>포시즌</h4>
          <h4>실시간 날씨 TALK</h4>
          <h5>포시즌 유저와 지역별 실시간 날씨 상황을 공유해보세요.</h5>
        </Title>

        <MessageWrap>
          <InfoWrap>
            <RoomHead />
          </InfoWrap>

          <ul className="messageArea" ref={scrollRef}>
            {messages.map(message => (
              <MessageArea key={message.id} chat={message} />
            ))}
          </ul>

          <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
            <input
              type="text"
              id="message"
              placeholder="실시간 TALK에 참여해보세요"
              autoComplete="off"
              value={messageContent}
              onChange={e => setMessageContent(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="lg"
                style={{ color: '#676b74' }}
              />
            </button>
          </form>
        </MessageWrap>
      </Wrap>
      <Footer />
    </div>
  );
}

export default LiveTalkRoom;
