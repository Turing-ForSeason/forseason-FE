import styled from 'styled-components';

export const FooterWrap = styled.div`
  width: 950px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;

  @media (max-width: 970px) {
    width: 100%;
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
`;
