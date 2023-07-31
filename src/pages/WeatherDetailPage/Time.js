const Time = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let day = week[today.getDay()];
  return year + '년 ' + month + '월 ' + date + '일 ' + day + '요일';
};
export default Time;
