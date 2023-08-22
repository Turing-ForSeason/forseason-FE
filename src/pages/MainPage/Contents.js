import { ContentsContainer, Content2, ContentImg } from './ContentsElements.js';
import temp1 from './img/temp1.jpg';
import temp2 from './img/temp2.jpg';

const Contents = () => {
  return (
    <ContentsContainer>
      <Content2>
        <h5>Contents</h5>
        <h4>포시즌이 추천하는</h4>
        <h4>오늘의 코디</h4>
        <h5>오늘의 날씨에 적합한 코디를 포시즌이 직접 추천해드려요.</h5>
        <ContentImg>
          <img src={temp1} alt="temp1" />
          <img src={temp2} alt="temp2" />
        </ContentImg>
      </Content2>
    </ContentsContainer>
  );
};
export default Contents;
