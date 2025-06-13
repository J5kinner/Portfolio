import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 2em;
  text-align: center;
  margin-top: -10%;
`;

const DesignerLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8em;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
    </FooterContainer>
  );
};

export default Footer; 