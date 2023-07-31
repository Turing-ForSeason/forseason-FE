import {
  ContentsContainer,
  Content1,
  Content2,
  ContentImg,
} from './ContentsElements.js';
import ContentCoordi from './ContentCoordi';
import temp1 from './img/temp1.jpg';
import temp2 from './img/temp2.jpg';
import { useNavigate } from 'react-router-dom';

const Contents = () => {
  const navigate = useNavigate();

  const navigateToCommunity = () => {
    navigate('/Community');
  };

  return (
    <ContentsContainer>
      <Content1>
        <h3>포시즌</h3>
        <h3>실시간 BEST 3 코디</h3>
        <h5>포시즌 유저가 추천하는 오늘의 코디를 확인해보세요.</h5>
        <ContentCoordi />
        <button onClick={navigateToCommunity}>커뮤니티 더보기 →</button>
      </Content1>
      <Content2>
        <h3>포시즌이 추천하는</h3>
        <h3>오늘의 코디</h3>
        <h5>오늘의 날씨에 적합한 코디를 포시즌이 직접 추천해드려요.</h5>
        <ContentImg>
          <img src={temp1} alt="temp1"></img>
          <img src={temp2} alt="temp2"></img>
        </ContentImg>
      </Content2>
    </ContentsContainer>
  );
};
export default Contents;
