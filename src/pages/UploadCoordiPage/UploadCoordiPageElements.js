import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Upload = styled.nav`
  background: #f2f2f2;
  height: 750px;
  margin: 0 auto;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const UploadTop = styled.nav`
  height: 80px;
  width: 1280px;
  align-item: left;
  margin-top: 35px;
  margin-left: 8px;
`;

export const UploadTop1 = styled.nav`
  color: #000000;
  font-size: 12px;
  margin-bottom: 7px;
  margin-left: 8px;
`;

export const UploadTop2 = styled.nav`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 7px;
  margin: 5px;
`;

export const UploadTop3 = styled.nav`
  font-size: 12px;
  color: #828282;
  margin: 5px;
`;

export const UploadTitle = styled.nav`
  margin-top: 36px;
  margin-left: 5px;
  width: 450px;
  height: 40px;
  display: flex;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 20px;
    padding-left: 15px;
    font-size: 14px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UploadImage = styled.nav`
  margin-top: 150px;
  margin-left: 5px;
  width: 993px;
  height: 40px;
  display: flex;
  color: #828282;
  font-size: 14px;
  background: white;
  border-radius: 20px;
  padding-left: 15px;
  padding-top: 9px;
  border: 'none !important';
  outline: 'none !important';
`;

export const StyledSelectLocation = styled.div`
  select {
    margin-top: 36px;
    border: none;
    background-color: white;
    padding: 5px;
    border-radius: 20px;
    font-size: 14px;
    margin-right: 5px;
    padding-right: 5px;
  }
`;

export const UploadContent = styled.nav`
  margin-top: 20px;
  margin-left: 5px;
  height: 100px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
`;

export const UploadHashTagInfo = styled.nav`
  font-size: 13px;
  color: #828282;
  margin-left: 18px;
  margin-top: 50px;
`;

export const UploadHashTag = styled.nav`
  width: 100%;
  margin-left: 5px;
  margin-top: 15px;
  display: flex;
  justify-content: left;
  gap: 10px;
`;

export const UploadHashTagContent = styled.nav`
  margin-left: 5px;
  font-size: 14px;
  height: 23px;
  background: #eef4fa;
  border-radius: 20px;
  padding: 5px 15px;
  text-align: center;
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    font-weight: bold;
  }
`;

export const UploadHashTagLink = styled(Link)`
  margin-left: 5px;
  border-radius: 20px;
  background: ${props => (props.active ? '#8cb6cf' : '#bad2e1')};
  padding: 0.3rem 1rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: #8cb6cf;
  }
`;

export const UploadBtn = styled.nav`
  margin-left: 900px;
  margin-top: 10px;
`;

export const UploadBtnLink = styled(Link)`
  border-radius: 20px;
  background: #b9b9b9;
  padding: 0.3rem 1rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #52a1de;
  }
`;
