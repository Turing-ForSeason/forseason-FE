import Clear from './BackgroundImg/Clear.jpg';
import Clouds from './BackgroundImg/Clouds.jpg';
import Drizzle from './BackgroundImg/Drizzle.jpg';
import Mist from './BackgroundImg/Mist.jpg';
import Rain from './BackgroundImg/Rain.jpg';
import Snow from './BackgroundImg/Snow.jpg';
import Thunderstorm from './BackgroundImg/Thunderstorm.jpg';
import CloudSun from './BackgroundImg/CloudSun.jpg';

export default function SetBackground(id) {
  let imgId = id === 800 ? 0 : (parseInt(id) / 100).toFixed(0);
  switch (imgId) {
    case 0:
      return <img src={Clear} alt="맑음" no-repeat="true" />;
    case '2':
      return <img src={Thunderstorm} alt="뇌우" no-repeat="true" />;
    case '3':
      return <img src={Drizzle} alt="이슬비" no-repeat="true" />;
    case '5':
      return <img src={Rain} alt="비" no-repeat="true" />;
    case '6':
      return <img src={Snow} alt="눈" no-repeat="true" />;
    case '7':
      return <img src={Mist} alt="옅은 안개" no-repeat="true" />;
    case '8':
      return <img src={Clouds} alt="흐림" no-repeat="true" />;
    default:
      return <img src={CloudSun} alt="기본" no-repeat="true" />;
  }
}
