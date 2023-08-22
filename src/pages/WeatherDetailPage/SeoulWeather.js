import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SeoulWeek from './SeoulWeek.js';
import {
  Wrapper1,
  Wrapper2,
  WeatherDiv,
  Wrapper22,
  WeatherImg,
  Container,
  Temperature,
  Location,
  Title,
  Wrapper11,
  WeekWrapper,
  WholeWrapper,
} from './WeatherElements.js';
import SetBackground from './SetBackground.js';
import SetSkyIcon from './SetSkyIcon.js';

function Weather() {
  const [weather, setWeather] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=d0a6715be544311062d89f45ccb86908`;

  // 날씨 가져오기
  axios.get(url).then(responseData => {
    const data = responseData.data;
    setWeather({
      id: data.weather[0].id,
      main: data.weather[0].main,
      temperature: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      clouds: data.clouds.all,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      loading: false,
    });
  });

  const weatherValue = {
    Clear: '맑음',
    Rain: '비',
    Thunderstorm: '뇌우',
    Snow: '눈',
    Mist: '옅은 안개',
    Drizzle: '이슬비',
    Clouds: '흐림',
    Fog: '안개',
    Haze: '실안개',
  };

  function convertDate(milliSecond) {
    const date = new Date(milliSecond * 1000); //Date객체 생성

    const year = date.getFullYear(); //0000년 가져오기
    const month = date.getMonth() + 1; //월은 0부터 시작하니 +1하기
    const day = date.getDate(); //일자 가져오기
    const hour = date.getHours();
    const min = date.getMinutes();

    return `${year}.${month}.${day} ${hour}시 ${min}분`;
  }

  return (
    <WholeWrapper>
      <WeatherImg>{SetBackground(weather.id)}</WeatherImg>
      <Container>
        <Wrapper1>
          <Location>
            <FontAwesomeIcon icon={faLocationDot} /> Seoul
          </Location>
          <Temperature>
            {(weather.temperature - 273.15).toFixed(1)}°C
          </Temperature>
          <WeatherDiv>
            {weatherValue[weather.main]}
            {SetSkyIcon(weather.id)}
          </WeatherDiv>
          <WeatherDiv>
            최고 : {(weather.temp_max - 273.15).toFixed(1)}°C 최저 :{' '}
            {(weather.temp_min - 273.15).toFixed(1)}°C
          </WeatherDiv>
        </Wrapper1>

        <Wrapper2>
          <h4>Weather Details</h4>
          <WeatherDiv>
            체감온도 : {(weather.feels_like - 273.15).toFixed(1)}°C
          </WeatherDiv>
          <WeatherDiv>습도 : {weather.humidity} %</WeatherDiv>
          <WeatherDiv>바람 : {weather.wind} ms</WeatherDiv>
          <WeatherDiv>구름 : {weather.clouds}</WeatherDiv>
        </Wrapper2>
      </Container>

      <WholeWrapper>
        <WeekWrapper>
          <SeoulWeek />

          <Wrapper22>
            <Title>일출 및 일몰</Title>
            <Wrapper11>
              <WeatherDiv>일출 시간: {convertDate(weather.sunrise)}</WeatherDiv>
              <WeatherDiv>일몰 시간: {convertDate(weather.sunset)}</WeatherDiv>
              <Footer />
            </Wrapper11>
          </Wrapper22>
        </WeekWrapper>
      </WholeWrapper>
    </WholeWrapper>
  );
}
export default Weather;
