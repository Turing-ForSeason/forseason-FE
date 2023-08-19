import styled from 'styled-components';

export const FooterWrap = styled.div`
  width: 900px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;

  @media (max-width: 950px) {
    width: 100%;
    margin: 0;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Address = styled.div`
  margin-bottom: 0;
  font-size: 13px;
`;
