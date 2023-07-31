import SeoulWeather from './SeoulWeather.js';
import Navbar from '../../components/Nav/Nav.js';
import Footer from '../../components/Footer/Footer.js';
import {
  Wrapper,
  WeatherImg,
  Container,
  Container0,
  Wrapper0,
  Wrapper1,
  Wrapper2,
  Location,
  Temperature,
  WeatherDiv,
  Input,
  Wrap,
  WholeWrapper,
  Cont,
  WeekWrapper,
  Title,
  Time1,
  Week,
  Wrapper11,
  Wrapper22,
  Temp,
} from './WeatherElements.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import Time from './Time.js';
import {
  faLocationDot,
  faDroplet,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import SetSkyIconBig from './SetSkyIconBig.js';
import SetSkyIcon from './SetSkyIcon.js';
import SetBackground from './SetBackground.js';

function WeatherDetail() {
  const API_KEY = 'd0a6715be544311062d89f45ccb86908';
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [week, setWeek] = useState({});

  const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const weekUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`;

  const [visible, setVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);

  const searchWeather = async e => {
    if (e.key === 'Enter') {
      axios.get(searchUrl).then(responseData => {
        const data = responseData.data;
        setResult({
          id: data.weather[0].id,
          name: data.name,
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
    }
  };
  const searchWeek = async e => {
    if (e.key === 'Enter') {
      axios.get(weekUrl).then(response => {
        const week = response.data;
        setWeek({
          dt0: week.list[3].dt_txt.substring(0, 13),
          dt1: week.list[4].dt_txt.substring(0, 13),
          dt2: week.list[5].dt_txt.substring(0, 13),
          dt3: week.list[6].dt_txt.substring(0, 13),
          dt4: week.list[7].dt_txt.substring(0, 13),
          temp0: week.list[3].main.temp_max,
          temp1: week.list[4].main.temp_max,
          temp2: week.list[5].main.temp_max,
          temp3: week.list[6].main.temp_max,
          temp4: week.list[7].main.temp_max,
          id0: week.list[3].weather[0].id,
          id1: week.list[4].weather[0].id,
          id2: week.list[5].weather[0].id,
          id3: week.list[6].weather[0].id,
          id4: week.list[7].weather[0].id,
          hu0: week.list[3].main.humidity,
          hu1: week.list[4].main.humidity,
          hu2: week.list[5].main.humidity,
          hu3: week.list[6].main.humidity,
          hu4: week.list[7].main.humidity,
        });
      });
    }
  };

  const changeDisplay = async e => {
    if (e.key === 'Enter' && visible === true) {
      try {
        setVisible(!visible);
        setSearchVisible(!searchVisible);
      } catch (err) {
        alert(err);
      }
    }
  };

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
    <Wrap>
      <Navbar />
      <Container0>
        <Wrapper0>
          <Time />
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
            <Input
              placeholder="도시를 영어로 입력하세요."
              value={location}
              onChange={e => setLocation(e.target.value)}
              type="text"
              onKeyDown={searchWeather}
              onKeyPress={searchWeek}
              onKeyUp={changeDisplay}
            />
          </div>
        </Wrapper0>
      </Container0>

      {searchVisible && (
        <WholeWrapper>
          <WeatherImg>{SetBackground(result.id)}</WeatherImg>
          <Container>
            <Wrapper1>
              <Location>
                <FontAwesomeIcon icon={faLocationDot} /> {result.name}
              </Location>
              <Temperature>
                {(result.temperature - 273.15).toFixed(1)}°C
              </Temperature>
              <WeatherDiv>
                {weatherValue[result.main]}
                {SetSkyIcon(result.id)}
              </WeatherDiv>
              <WeatherDiv>
                최고 : {(result.temp_max - 273.15).toFixed(1)}°C 최저 :{' '}
                {(result.temp_min - 273.15).toFixed(1)}°C
              </WeatherDiv>
            </Wrapper1>

            <Wrapper2>
              <h4>Weather Details</h4>
              <WeatherDiv>
                체감온도 : {(result.feels_like - 273.15).toFixed(1)}
                °C
              </WeatherDiv>
              <WeatherDiv>습도 : {result.humidity} %</WeatherDiv>
              <WeatherDiv>바람 : {result.wind} ms</WeatherDiv>
              <WeatherDiv>구름 : {result.clouds}</WeatherDiv>
            </Wrapper2>
          </Container>

          <WholeWrapper>
            <WeekWrapper>
              <Wrapper11>
                <Title>시간별 날씨</Title>
                <Time1>
                  <Cont>
                    <Week>{week.dt0}시</Week>
                    <Temp>{SetSkyIconBig(week.id0)}</Temp>
                    <Temp> {(week.temp0 - 273.15).toFixed(1)}°</Temp>
                    <WeatherDiv>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={{ color: '#c9c5c5' }}
                      />{' '}
                      {week.hu0}%
                    </WeatherDiv>
                  </Cont>
                  <Cont>
                    <Week>{week.dt1}시</Week>
                    <Temp>{SetSkyIconBig(week.id1)}</Temp>
                    <Temp>{(week.temp1 - 273.15).toFixed(1)}°</Temp>
                    <WeatherDiv>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={{ color: '#c9c5c5' }}
                      />{' '}
                      {week.hu1}%
                    </WeatherDiv>
                  </Cont>
                  <Cont>
                    <Week>{week.dt2}시</Week>
                    <Temp>{SetSkyIconBig(week.id2)}</Temp>
                    <Temp>{(week.temp2 - 273.15).toFixed(1)}°</Temp>
                    <WeatherDiv>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={{ color: '#c9c5c5' }}
                      />{' '}
                      {week.hu2}%
                    </WeatherDiv>
                  </Cont>
                  <Cont>
                    <Week>{week.dt3}시</Week>
                    <Temp>{SetSkyIconBig(week.id3)}</Temp>
                    <Temp>{(week.temp3 - 273.15).toFixed(1)}°</Temp>
                    <WeatherDiv>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={{ color: '#c9c5c5' }}
                      />{' '}
                      {week.hu3}%
                    </WeatherDiv>
                  </Cont>
                  <Cont>
                    <Week>{week.dt4}시</Week>
                    <Temp>{SetSkyIconBig(week.id4)}</Temp>
                    <Temp>{(week.temp4 - 273.15).toFixed(1)}°</Temp>
                    <WeatherDiv>
                      <FontAwesomeIcon
                        icon={faDroplet}
                        style={{ color: '#c9c5c5' }}
                      />{' '}
                      {week.hu4}%
                    </WeatherDiv>
                  </Cont>
                </Time1>
              </Wrapper11>

              <Wrapper22>
                <Title>일출 및 일몰</Title>
                <Wrapper11>
                  <WeatherDiv>
                    일출 시간: {convertDate(result.sunrise)}
                  </WeatherDiv>
                  <WeatherDiv>
                    일몰 시간: {convertDate(result.sunset)}
                  </WeatherDiv>
                  <Footer />
                </Wrapper11>
              </Wrapper22>
            </WeekWrapper>
          </WholeWrapper>
        </WholeWrapper>
      )}
      {visible && <SeoulWeather />}
    </Wrap>
  );
}

export default WeatherDetail;
