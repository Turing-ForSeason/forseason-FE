import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Coordi = styled.nav`
  background: #f2f2f2;
  height: 680px;
  margin: 0 auto;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const CoordiTop = styled.nav`
  height: 80px;
  width: 1280px;
  align-item: left;
  margin-top: 40px;
  margin-left: 8px;
`;

export const CoordiTop1 = styled.nav`
  color: #000000;
  font-size: 12px;
  margin-bottom: 9px;
  margin-left: 8px;
`;

export const CoordiTop2 = styled.nav`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 7px;
  margin: 5px;
`;

export const CoordiTop3 = styled.nav`
  font-size: 12px;
  color: #828282;
  margin: 5px;
`;

export const CoordiLocation = styled.nav`
  display: flex;
  align-items: center;
  background: #ffffff;
  width: 110px;
  height: 27px;
  align-item: left;
  margin-top: 30px;
  margin-left: 8px;
  font-weight: bold;
  padding: 0.3rem 1rem;
  font-size: 13px;
  color: 393939;
  border-radius: 20px;
`;

export const CoordiDetailBox = styled.nav`
  background: #fff;
  height: 400px;
  margin-top: 28px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 8;
`;

export const CoordiDetailImg = styled.nav`
  height: 100%;
  width: 750px;
  display: flex;
  justify-content: space-between;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
`;

export const CoordiDetailImgContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CoordiDetailInfo = styled.nav`
  height: 100%;
  width: 100%;
  margin-left: 80px;
`;

export const CoordiDetailTag = styled.nav`
  font-size: 12px;
  color: #828282;
  margin-right: 30px;
  margin-top: 35px;
`;

export const CoordiDetailTitle = styled.nav`
  color: #000000;
  width: 85%;
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

export const CoordiDetailContents = styled.nav`
  color: #7b7b7b;
  width: 85%;
  font-size: 14px;
  margin-top: 15px;
`;

export const CoordiDetailHashtag = styled.nav`
  background: #ffffff;
  font-size: 13px;
  background: #f2f2f2;
  text-align: center;
  padding: 0.3rem 1rem;
  border-radius: 20px;
`;

export const CoordiDetailHashtagContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
  gap: 8px;
  margin-top: 30px;
`;

export const CoordiDetailUser = styled.nav`
  height: 60px;
  width: 85%;
  margin-top: 50px;
  background: #eff5ff;
  z-index: 2;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
`;

export const CoordiDetailUserImg = styled.nav`
  width: 60px;
  height: 40px;
  margin: 10px;
  margin-left: 25px;
  border-radius: 50%;
  overflow: hidden;
`;

export const CoordiDetailUserImgContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CoordiDetailUserInfo = styled.nav`
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px;
  margin-left: -13px;
`;

export const CoordiDetailUserName = styled.nav`
  height: 20px;
  width: 100px;
  margin-left: 15px;
  margin-top: 2px;
  font-size: 14px;
`;

export const CoordiDetailUserDate = styled.nav`
  height: 10px;
  width: 100%;
  margin-left: 15px;
  margin-top: 1px;
  font-size: 11px;
  color: #828282;
`;

export const CoordiDetailIconInfo = styled.nav`
  height: 30px;
  margin-top: 2px;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoordiDetailUserIcon = styled.nav`
  width: 30px;
  height: 30px;
  color: gray;
  margin-top: 18px;
  margin-left: 3px;
  display: flex;
  align-items: center;
`;

export const CoordiDetailUserIconNum = styled.nav`
  height: 30px;
  width: 100%;
  margin-left: 5px;
  margin-top: 18px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;
