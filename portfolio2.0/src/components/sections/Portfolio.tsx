import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PortfolioSection = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  padding: 4em 2em;
  padding-top: 7em;

  @media (min-width: 768px) {
    padding: 4em;
  }
`;

const PortfolioContainer = styled(motion.div)`
  margin-bottom: 4em;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 40% auto;
    gap: 2em;
    align-items: center;
  }
`;

const PortfolioLeft = styled.div`
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

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 1em;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9em;
  line-height: 1.8em;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 2em;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const PortfolioImage = styled(motion.img)`
  border-radius: 1em;
  margin-top: 2em;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2em;
  }
`;

const Portfolio: React.FC = () => {
  const projects = [
    {
      subtitle: 'MERN Stack Web App',
      title: 'Paijolizmal',
      description: 'A collaborative team project where the main idea is a web application for students who can write their own rants as "notes" after completing pomodoros, they receive coins which can be used to buy more notes.',
      image: '/images/paijolizmalMVP.gif',
      link: 'https://github.com/J5kinner/PaiJoLizMal'
    },
    {
      subtitle: 'Engineering Project',
      title: 'Elevator Project',
      description: 'Working with the motor controls team of a elevator project, our arduino software needed to interface with 2 other software engineering teams code. We also got to experience what it was like working with all other different types of engineers including, civil, mechanical and electrical engineers.',
      image: '/images/liftWorking.gif',
      link: '#'
    },
    {
      subtitle: 'MERN Stack Web App',
      title: 'Swap Street',
      description: 'A collaborative project where the main idea is to give the community an application which allows trading of favours in exchange for more favours, these favours are tracked by using a coin system which is generated after completing favours for others.',
      image: '/images/swapstreet.gif',
      link: 'https://infinite-refuge-32502.herokuapp.com/'
    }
  ];

  return (
    <PortfolioSection id="portfolio">
      {projects.map((project, index) => (
        <PortfolioContainer
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <PortfolioLeft>
            <Subtitle>{project.subtitle}</Subtitle>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
          </PortfolioLeft>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <PortfolioImage
              src={project.image}
              alt={`${project.title} preview`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </a>
        </PortfolioContainer>
      ))}
    </PortfolioSection>
  );
};

export default Portfolio; 