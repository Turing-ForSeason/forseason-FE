import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cont, Name } from '../MainPage/ContentsElements';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TalkPreview() {
  const [talks, setTalks] = useState([]);

  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    axios
      .get('http://localhost:8080/talk/talklist?size=4', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(res => {
        const talkData = res.data.result;
        setTalks(
          talkData.map(talkData => ({
            id: talkData.talkId,
            user: talkData.userNickname,
            contents: talkData.contents,
            location: talkData.location,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <>
      {talks.map((talk, index) => (
        <Cont key={index}>
          <Name>
            <FontAwesomeIcon icon={faUser} />
            <h4>{talk.user}</h4>
          </Name>
          <h4>{talk.contents}</h4>
          <h5>{talk.location}</h5>
        </Cont>
      ))}
    </>
  );
}

export default TalkPreview;
