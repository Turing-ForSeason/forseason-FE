import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cont } from '../MainPage/ContentsElements';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TalkPreview() {
  const [talk, setTalk] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8080//talk/talklist?size=4', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(res => {
        const talk = res.data;
        setTalk({
          id: talk.result.getContent[0].talkId,
          user: talk.result.getContent[0].userNickname,
          contents: talk.result.getContent[0].Contents,
          location: talk.result.getContent[0].location,
        });
      });
  }, []);

  return (
    <Cont>
      <FontAwesomeIcon icon={faUser} />
      <h4>{talk.user}</h4>
      <h4>{talk.contents}</h4>
      <h4>{talk.location}</h4>
    </Cont>
  );
}

export default TalkPreview;
