import styled from 'styled-components';

export const Container0 = styled.div`
  width: 950px;
  margin: 10px auto;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

export const Wrapper0 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Container = styled.div`
  width: 950px;
  height: 60%;
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);

  @media (max-width: 970px) {
    width: 100%;
  }
`;
export const WeekWrapper = styled.div`
  width: 950px;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transform: translate(-50%, 0);
  left: 50%;
  top: 10%;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

export const WeatherImg = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.35;
  }
`;

export const SunIcon = styled.div`
  width: 22px;
  height: 22px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Wrapper1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 970px) {
    width: 100%;
    text-align: center;
    position: relative;
    justify-content: center;
  }
`;

export const Wrapper2 = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  h4 {
    border-bottom: 1px solid grey;
  }
  @media (max-width: 970px) {
    display: none;
  }
`;

export const Location = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 500;
`;

export const Temperature = styled.div`
  color: black;
  font-size: 90px;

  @media (max-width: 970px) {
    text-align: center;
    position: relative;
    justify-content: center;
  }
`;

export const WeatherDiv = styled.div`
  color: black;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-top: 5px;

  @media (max-width: 970px) {
    text-align: center;
    position: relative;
    justify-content: center;
  }
`;

export const Input = styled.input`
  border: 0;
  width: 200px;
  height: 30px;
  border-bottom: 1px solid grey;
  outline: none;
`;

export const Wrap = styled.div`
  position: relative;
`;

export const WholeWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

export const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px;
`;
export const Time1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const Week = styled.div`
  width: 180px;
  text-align: center;
  font-size: 18px;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

export const Wrapper11 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
`;
export const Wrapper22 = styled.div`
  width: 60%;
  margin-top: 30px;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

export const WeatherDiv2 = styled.div`
  align-items: center;
  display: flex;
`;

export const Temp = styled.div`
  font-size: 18px;
`;
