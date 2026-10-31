import React, { useState } from 'react';
import styled from 'styled-components';
import { MobileScreen, mobileScreens } from '../../data/content';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 4em 2em;

  @media (min-width: 768px) {
    padding: 4em;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.2em;
  font-size: 0.85em;
  margin-bottom: 1em;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 2em;
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const PhoneFrame = styled.figure`
  width: 14em;
  margin: 0;
  padding: 0.7em;
  border: 0.4em solid ${({ theme }) => theme.colors.white};
  border-radius: 2em;
  background: #000;

  img {
    display: block;
    width: 100%;
    border-radius: 1.3em;
  }

  figcaption {
    color: ${({ theme }) => theme.colors.white};
    font-size: 0.8em;
    text-align: center;
    margin-top: 0.6em;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  cursor: pointer;
`;

interface MobileShowcaseProps {
  screens?: MobileScreen[];
}

const MobileShowcase: React.FC<MobileShowcaseProps> = ({ screens = mobileScreens }) => {
  const [index, setIndex] = useState(0);

  if (screens.length === 0) {
    return null;
  }

  const current = screens[index % screens.length];
  const prev = () => setIndex(i => (i - 1 + screens.length) % screens.length);
  const next = () => setIndex(i => (i + 1) % screens.length);

  return (
    <Section id="mobile">
      <Subtitle>Mobile</Subtitle>
      <Title>Mobile showcase</Title>
      <Carousel>
        {screens.length > 1 && (
          <NavButton type="button" onClick={prev} aria-label="Previous screen">
            &lsaquo;
          </NavButton>
        )}
        <PhoneFrame>
          <img src={current.image} alt={current.title} loading="lazy" />
          {current.caption && <figcaption>{current.caption}</figcaption>}
        </PhoneFrame>
        {screens.length > 1 && (
          <NavButton type="button" onClick={next} aria-label="Next screen">
            &rsaquo;
          </NavButton>
        )}
      </Carousel>
    </Section>
  );
};

export default MobileShowcase;
