import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import SetBackground from './SetBackground';
import Time from './Time';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import SetSkyIconGrey from './SetSkyIconGrey.js';

const Banner = () => {
  const API_KEY = 'd0a6715be544311062d89f45ccb86908';
  const [weather, setWeather] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}`;

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

  // 날씨 가져오기
  axios.get(url).then(responseData => {
    const data = responseData.data;
    setWeather({
      id: data.weather[0].id,
      main: data.weather[0].main,
      temperature: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      loading: false,
    });
  });

  const hashtag = () => {
    let temp = (weather.temperature - 273.15).toFixed(1);
    if (temp < 20) return '#따듯하게 입고 다녀, 걱정되니까';
    else return '#더위로부터 지켜줄게';
  };

  const setTitle = () => {
    let temp = (weather.temperature - 273.15).toFixed(1);
    if (temp < 20) return '오늘 쌀쌀한데 어떻게 입지?';
    else return '오늘 덥다는데 어떻게 입지?';
  };

  const navigate = useNavigate();

  const navigateToWeatherDetail = () => {
    navigate('/weather');
  };

  return (
    <WholeWrapper>
      <WeatherImg>{SetBackground()}</WeatherImg>
      <Container>
        <DataWrapper>
          <Time />
          <Temp>{(weather.temperature - 273.15).toFixed(1)}°</Temp>
          <Wrapper1>
            <Location>
              <FontAwesomeIcon icon={faLocationDot} /> 서울특별시 |
            </Location>
            <WeatherDiv>{weatherValue[weather.main]}</WeatherDiv>
            {SetSkyIconGrey(weather.id)}
          </Wrapper1>
        </DataWrapper>
        <Wrapper>
          <Wrapper2>
            <Phrase>{hashtag()}</Phrase>
            <Title>{setTitle()}</Title>
            <Phrase>포시즌과 함께 오늘의 코디를 공유해보세요.</Phrase>
          </Wrapper2>
          <button onClick={navigateToWeatherDetail}>날씨 자세히 보기 →</button>
        </Wrapper>
      </Container>
    </WholeWrapper>
  );
};
export default Banner;

const WholeWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const DataWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 970px) {
    width: 100%;
    text-align: center;
    position: relative;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    position: absolute;
    right: 0;
    bottom: 80px;
    border: 0;
    border-radius: 90px;
    padding: 2px 10px;
    color: black;
  }
  button:hover {
    cursor: pointer;
    color: gray;
  }

  @media (max-width: 970px) {
    display: none;
  }
`;

const WeatherImg = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.35;
  }
`;
const Container = styled.div`
  width: 950px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 970px) {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
  }
`;

const Wrapper2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-end;
`;

const Phrase = styled.div`
  padding-bottom: 5px;
  font-size: 20px;
`;
const Title = styled.div`
  padding-bottom: 5px;
  font-size: 35px;
  font-weight: bold;
`;

const Location = styled.div`
  color: grey;
  font-size: 20px;
  font-weight: 500;
  margin-right: 8px;
`;

const Temp = styled.div`
  text-shadow: 4px 4px 4px #bdbdbd;
  color: grey;
  font-size: 180px;
`;

const WeatherDiv = styled.div`
  color: grey;
  font-size: 20px;
`;
