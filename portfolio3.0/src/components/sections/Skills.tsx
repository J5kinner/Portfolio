import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTools, FaCode, FaMobile } from 'react-icons/fa';
import type { IconBaseProps } from 'react-icons';
import { trackSectionView, trackSkillInteraction } from '../../utils/analytics';

const SkillsSection = styled.section`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 4em 2em;
  margin-top: -5em;
  margin-bottom: -7em;
  padding-top: 7em;

  @media (min-width: 768px) {
    padding: 4em;
  }
`;

const SkillsHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3em;
  margin-top: 2em;

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

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 1.3em;
`;

const SkillsGrid = styled.div`
  display: grid;
  gap: 2em;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  padding: 2em;
  border-radius: 1em;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(39, 204, 145, 0.15);
  }
`;

const IconContainer = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: 100px;
  display: grid;
  place-content: center;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 2.5em;
`;

const SkillTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin: 1em 0;
`;

const SkillDescription = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9em;
  line-height: 1.8em;
  font-weight: 500;
  opacity: 0.9;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Skills: React.FC = () => {
  const iconProps: IconBaseProps = { size: 75 };

  const skills = [
    {
      icon: (
        <IconWrapper>
          {FaTools(iconProps)}
        </IconWrapper>
      ),
      title: 'Software Engineering',
      description: 'Studying software engineering at Macquarie University specialising in Java and JavaScript libraries',
      iconSize: '75px'
    },
    {
      icon: (
        <IconWrapper>
          {FaCode(iconProps)}
        </IconWrapper>
      ),
      title: 'Frontend Developer',
      description: 'Practicing HTML, CSS, SASS and JS fundamentals before moving onto frameworks like REACT and Express.js',
      iconSize: '200px'
    },
    {
      icon: (
        <IconWrapper>
          {FaMobile(iconProps)}
        </IconWrapper>
      ),
      title: 'Web App Developer',
      description: 'Developing web hosted novelty apps and GUI tools for controlling certain subsystems.',
      iconSize: '60px'
    }
  ];

  return (
    <SkillsSection id="skills">
      <SkillsHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        onViewportEnter={() => {
          try {
            trackSectionView('Skills');
          } catch (error) {
            console.warn('Analytics error:', error);
          }
        }}
      >
        <Subtitle>Current</Subtitle>
        <Title>Skills</Title>
      </SkillsHeader>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            onClick={() => {
              try {
                trackSkillInteraction(skill.title);
              } catch (error) {
                console.warn('Analytics error:', error);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconContainer size={skill.iconSize}>
              {skill.icon}
            </IconContainer>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillDescription>{skill.description}</SkillDescription>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills; 