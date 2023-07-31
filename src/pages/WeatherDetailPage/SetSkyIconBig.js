import { ReactSkycon } from 'react-skycons-extended';

export default function SetSkyIconBig(id) {
  let iconId = id === 800 ? 0 : (parseInt(id) / 100).toFixed(0);
  switch (iconId) {
    case 0:
      return <ReactSkycon icon="CLEAR_DAY" size={60} color={'grey'} />;
    case '2':
      return <ReactSkycon icon="THUNDER" size={60} color={'grey'} />;
    case '3':
      return <ReactSkycon icon="SLEET" size={60} color={'grey'} />;
    case '5':
      return <ReactSkycon icon="RAIN" size={60} color={'grey'} />;
    case '6':
      return <ReactSkycon icon="SNOW" size={60} color={'grey'} />;
    case '7':
      return <ReactSkycon icon="FOG" size={60} color={'grey'} />;
    case '8':
      return <ReactSkycon icon="CLOUDY" size={60} color={'grey'} />;
    default:
      return <ReactSkycon icon="CLEAR_NIGHT" size={60} color={'grey'} />;
  }
}
