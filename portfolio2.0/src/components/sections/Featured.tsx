import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeaturedSection = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  padding: 4em 2em;
  position: relative;

  @media (min-width: 768px) {
    padding: 4em;
    display: grid;
    grid-template-columns: 40% auto;
    gap: 2em;
    align-items: center;
  }
`;

const Left = styled(motion.div)`
  @media (min-width: 768px) {
    text-align: left;
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

const Title = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 1.3em;
  display: block;
  margin-bottom: 1em;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2em;
  font-size: 0.9em;
  line-height: 1.8em;
  font-weight: 500;
  opacity: 0.9;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Image = styled(motion.img)`
  border-radius: 1em;
  margin-top: 2em;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2em;
  }
`;

const Featured: React.FC = () => {
  return (
    <FeaturedSection id="featured">
      <Left
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Subtitle>Featured Project</Subtitle>
        <Title 
          href="https://github.com/J5kinner/Mobile-Application-Development" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Wanderer Travel App
        </Title>
        <Description>
          Created a mobile application using expo/react-native in android studio. Using the app, 
          the viewer is able to browse through categories such as restaurants, places to visit, 
          places to stay, things to do for a particular city. Once logged in, the user must be 
          able to add, delete and update every listing.
        </Description>
      </Left>
      <Image
        src="/images/WandererNoBackground.webp"
        alt="Featured Project"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </FeaturedSection>
  );
};

export default Featured; 