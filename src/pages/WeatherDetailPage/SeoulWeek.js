import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Wrapper11,
  WeatherDiv,
  Time1,
  Cont,
  Title,
  Week,
  Temp,
} from './WeatherElements.js';
import SetSkyIconBig from './SetSkyIconBig.js';

const WeekWeather = () => {
  const [weather, setWeather] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=d0a6715be544311062d89f45ccb86908`;

  // 날씨 가져오기
  useEffect(() => {
    axios
      .get(url)
      .then(responseData => {
        const data = responseData.data;
        setWeather({
          dt0: data.list[3].dt_txt.substring(0, 13),
          dt1: data.list[4].dt_txt.substring(0, 13),
          dt2: data.list[5].dt_txt.substring(0, 13),
          dt3: data.list[6].dt_txt.substring(0, 13),
          dt4: data.list[7].dt_txt.substring(0, 13),
          temp0: data.list[3].main.temp,
          temp1: data.list[4].main.temp,
          temp2: data.list[5].main.temp,
          temp3: data.list[6].main.temp,
          temp4: data.list[7].main.temp,
          id0: data.list[3].weather[0].id,
          id1: data.list[4].weather[0].id,
          id2: data.list[5].weather[0].id,
          id3: data.list[6].weather[0].id,
          id4: data.list[7].weather[0].id,
          hu0: data.list[3].main.humidity,
          hu1: data.list[4].main.humidity,
          hu2: data.list[5].main.humidity,
          hu3: data.list[6].main.humidity,
          hu4: data.list[7].main.humidity,
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          console.error('많은 요청으로 오류가 발생합니다. 잠시 기다려주세요.');
        }
      });
  }, [url]);

  return (
    <Wrapper11>
      <Title>시간별 날씨</Title>
      <Time1>
        <Cont>
          <Week>{weather.dt0}시</Week>
          <Temp>{SetSkyIconBig(weather.id0)}</Temp>
          <Temp>{(weather.temp0 - 273.15).toFixed(1)}°</Temp>
          <WeatherDiv>
            <FontAwesomeIcon icon={faDroplet} style={{ color: '#c9c5c5' }} />{' '}
            {weather.hu0}%
          </WeatherDiv>
        </Cont>
        <Cont>
          <Week>{weather.dt1}시</Week>
          <Temp>{SetSkyIconBig(weather.id1)}</Temp>
          <Temp>{(weather.temp1 - 273.15).toFixed(1)}°</Temp>
          <WeatherDiv>
            <FontAwesomeIcon icon={faDroplet} style={{ color: '#c9c5c5' }} />{' '}
            {weather.hu1}%
          </WeatherDiv>
        </Cont>
        <Cont>
          <Week>{weather.dt2}시</Week>
          <Temp>{SetSkyIconBig(weather.id2)}</Temp>
          <Temp>{(weather.temp2 - 273.15).toFixed(1)}°</Temp>
          <WeatherDiv>
            <FontAwesomeIcon icon={faDroplet} style={{ color: '#c9c5c5' }} />{' '}
            {weather.hu2}%
          </WeatherDiv>
        </Cont>
        <Cont>
          <Week>{weather.dt3}시</Week>
          <Temp>{SetSkyIconBig(weather.id3)}</Temp>
          <Temp> {(weather.temp3 - 273.15).toFixed(1)}°</Temp>
          <WeatherDiv>
            <FontAwesomeIcon icon={faDroplet} style={{ color: '#c9c5c5' }} />{' '}
            {weather.hu3}%
          </WeatherDiv>
        </Cont>
        <Cont>
          <Week>{weather.dt4}시</Week>
          <Temp>{SetSkyIconBig(weather.id4)}</Temp>
          <Temp> {(weather.temp4 - 273.15).toFixed(1)}°</Temp>
          <WeatherDiv>
            <FontAwesomeIcon icon={faDroplet} style={{ color: '#c9c5c5' }} />{' '}
            {weather.hu4}%
          </WeatherDiv>
        </Cont>
      </Time1>
    </Wrapper11>
  );
};

export default WeekWeather;
