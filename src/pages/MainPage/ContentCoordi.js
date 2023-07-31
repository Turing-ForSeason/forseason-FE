import React from 'react';
import { Dummy } from './CoordiDummy';
import Coordination from './Coordination';
import { ContentCoordiContainer } from './ContentsElements';

function ContentCoordi() {
  return (
    <ContentCoordiContainer>
      {Dummy.post.map(post => {
        return (
          <Coordination
            img={post.img}
            user={post.user}
            like={post.like}
            hashtag1={post.hashtag1}
            hashtag2={post.hashtag2}
          />
        );
      })}
    </ContentCoordiContainer>
  );
}

export default ContentCoordi;
