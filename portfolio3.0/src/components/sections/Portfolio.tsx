import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { experiences, projects as allProjects, Project } from '../../data/content';

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

const PortfolioVideo = styled(motion.video)`
  border-radius: 1em;
  margin-top: 2em;
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2em;
  }
`;

const ImagePlaceholder = styled.div`
  min-height: 14em;
  border-radius: 1em;
  margin-top: 2em;
  border: 2px dashed rgba(39, 204, 145, 0.3);

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2em;
  }
`;

const Portfolio: React.FC = () => {
  const projects = allProjects.filter(project => !project.featured);

  const renderMedia = (project: Project, index: number) => {
    const motionProps = {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: index * 0.2 + 0.2, ease: 'easeOut' as const },
      viewport: { once: true }
    };
    if (project.video) {
      return (
        <PortfolioVideo
          src={project.video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${project.title} preview`}
          {...motionProps}
        />
      );
    }
    return (
      <PortfolioImage
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        {...motionProps}
      />
    );
  };

  return (
    <PortfolioSection id="portfolio">
      {experiences.map((experience, index) => (
        <PortfolioContainer
          key={experience.id}
          data-testid={`experience-${experience.id}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <PortfolioLeft>
            <Subtitle>{experience.technology}</Subtitle>
            <Title>{experience.company}</Title>
            <Description>{experience.description}</Description>
          </PortfolioLeft>
          {experience.image ? (
            <PortfolioImage src={experience.image} alt={`${experience.company} preview`} />
          ) : (
            <ImagePlaceholder aria-hidden="true" />
          )}
        </PortfolioContainer>
      ))}
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
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {renderMedia(project, index)}
            </a>
          ) : (
            renderMedia(project, index)
          )}
        </PortfolioContainer>
      ))}
    </PortfolioSection>
  );
};

export default Portfolio; 