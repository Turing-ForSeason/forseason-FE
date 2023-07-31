import { ReactSkycon } from 'react-skycons-extended';

export default function SetSkyIcon(id) {
  let iconId = id === 800 ? 0 : (parseInt(id) / 100).toFixed(0);
  switch (iconId) {
    case 0:
      return <ReactSkycon icon="CLEAR_DAY" size={30} />;
    case '2':
      return <ReactSkycon icon="THUNDER" size={30} />;
    case '3':
      return <ReactSkycon icon="SLEET" size={30} />;
    case '5':
      return <ReactSkycon icon="RAIN" size={30} />;
    case '6':
      return <ReactSkycon icon="SNOW" size={30} />;
    case '7':
      return <ReactSkycon icon="FOG" size={30} />;
    case '8':
      return <ReactSkycon icon="CLOUDY" size={30} />;
    default:
      return <ReactSkycon icon="CLEAR_NIGHT" size={30} />;
  }
}
