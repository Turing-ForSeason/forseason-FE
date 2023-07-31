import React from 'react';
import { CoordinationContainer, Info, User } from './ContentsElements.js';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Coordination({ img, user, like, hashtag1, hashtag2 }) {
  return (
    <CoordinationContainer>
      <img src={img} alt="코디사진" />
      <Info>
        <User>
          <FontAwesomeIcon icon={faUser} />
          <h4>{user}</h4>
          <h4>님</h4>
        </User>
        <User>
          <FontAwesomeIcon icon={faHeart} />
          <h4>{like}</h4>
        </User>
        <User>
          <span>{hashtag1}</span>
          <span>{hashtag2}</span>
        </User>
      </Info>
    </CoordinationContainer>
  );
}

export default Coordination;
