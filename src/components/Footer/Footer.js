import { FooterWrap, FooterContainer, Address } from './FooterElements.js';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>
        <Address>
          Copyright <FontAwesomeIcon icon={faCopyright} />
          <a href="https://www.notion.so/Turing-28799e16e71a4738b9bd6318a29c0e7f">
            <strong>turing</strong>
          </a>{' '}
          All Rights Reserved.
        </Address>
      </FooterContainer>
    </FooterWrap>
  );
};
export default Footer;
