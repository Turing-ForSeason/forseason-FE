import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cont } from '../MainPage/ContentsElements';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TalkPreview() {
  const [talk, setTalk] = useState({});

  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    axios
      .get('http://localhost:8080/talk/talklist?size=4', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(res => {
        const talkData = res.data.result.getContent[0];
        setTalk({
          id: talkData.talkId,
          user: talkData.userNickname,
          contents: talkData.Contents,
          location: talkData.location,
        });
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
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
