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
            date: talkData.date,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const TimeSince = props => {
    const talkDate = new Date(props.date);
    const now = new Date();
    const secondsPast = (now - talkDate) / 1000;

    var dateElement;

    if (secondsPast < 60) {
      dateElement = parseInt(secondsPast) + '초 전';
    } else if (secondsPast < 3600) {
      dateElement = parseInt(secondsPast / 60) + '분 전';
    } else if (secondsPast <= 86400) {
      dateElement = parseInt(secondsPast / 3600) + '시간 전';
    } else {
      dateElement = parseInt(secondsPast / 86400) + '일 전';
    }

    return <h5>{dateElement}</h5>;
  };

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
          <TimeSince date={talk.date} />
        </Cont>
      ))}
    </>
  );
}

export default TalkPreview;
