import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 2em;
  text-align: center;
  margin-top: -10%;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
    </FooterContainer>
  );
};

export default Footer; 