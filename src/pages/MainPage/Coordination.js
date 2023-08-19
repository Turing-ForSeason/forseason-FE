import React from 'react';
import { CoordinationContainer, Info, User } from './ContentsElements.js';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Coordination({ coordi }) {
  return (
    <CoordinationContainer>
      <img src={coordi.img} alt="코디사진" />
      <Info>
        <User>
          <FontAwesomeIcon icon={faUser} />
          <h4>{coordi.user}</h4>
          <h4>님</h4>
        </User>
        <User>
          <FontAwesomeIcon icon={faHeart} />
          <h4>{coordi.like}</h4>
        </User>
        <User>
          <span>{coordi.hashtag}</span>
        </User>
      </Info>
    </CoordinationContainer>
  );
}

export default Coordination;
