import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { fadeInUp, slideIn, staggerContainer } from '../../styles/animations';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    overflow-x: hidden;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(20px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0c1833 0%, #1a2b4d 100%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  position: relative;
  overflow: hidden;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const Content = styled(motion.div)`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
  gap: 2rem;
  box-sizing: border-box;

  @media (min-width: 1050px) {
    justify-content: space-between;
    padding: 0 4rem;
    gap: 4rem;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  max-width: 600px;
  min-width: 300px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;

  @media (min-width: 1050px) {
    text-align: left;
    margin: 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(45deg, #ffffff, #27cc91);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: #27cc91;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const CodeContainer = styled(motion.div)`
  background: rgba(12, 24, 51, 0.8);
  border: 1px solid rgba(39, 204, 145, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  font-family: 'Fira Code', monospace;
  backdrop-filter: blur(10px);
`;

const CodeLine = styled(motion.div)`
  color: #ffffff;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: pre; /* Preserve whitespace and indentation */

  &::before {
    content: '>';
    color: #27cc91;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #27cc91;
  margin-left: 4px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ScrollContainer = styled(motion.div)`
  width: 40px;
  height: 60px;
  border: 2px solid #27cc91;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  cursor: pointer;
  margin-top: 2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffffff;
    background: rgba(39, 204, 145, 0.1);
  }
`;

const ScrollCircle = styled(motion.div)`
  width: 24px;
  height: 24px;
  background: #27cc91;
  border-radius: 50%;
  animation: ${scrollAnimation} 2s infinite ease-in-out;
`;

const RightContent = styled(motion.div)`
  display: none;

  @media (min-width: 1050px) {
    display: block;
    position: relative;
    flex: 1.2;
    height: 600px;
    min-width: 400px;
    max-width: 800px;
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(39, 204, 145, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(39, 204, 145, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(39, 204, 145, 0.15);
    transform: scale(1.05);
  }
`;

const Hero: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      'class SoftwareEngineer {',
      ' private val skills = listOf(',
      '   "Android", "Kotlin",',
      '   "Jetpack Compose", "MVI",',
      '   "& much more..."',
      ' )',
      '}'
    ];

    let isMounted = true;
    let timeoutIds: NodeJS.Timeout[] = [];

    const typeCode = () => {
      setCodeLines([]);
      
      // Use forEach instead of for loop to avoid closure issues
      lines.forEach((line, index) => {
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            setCodeLines(prev => [...prev, line]);
          }
        }, index * 500);
        
        timeoutIds.push(timeoutId);
      });
    };

    typeCode();

    return () => {
      isMounted = false;
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <GlobalStyle />
      <HeroSection id="hero">
        <Content
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LeftContent>
            <Title variants={fadeInUp}>
              Building Digital
              <br />
              Experiences
            </Title>
            <Subtitle variants={fadeInUp}>
              Software Engineer & Mobile Developer
            </Subtitle>
            <CodeContainer variants={fadeInUp}>
              {codeLines.map((line, index) => (
                <CodeLine
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {line}
                  {index === codeLines.length - 1 && <Cursor />}
                </CodeLine>
              ))}
            </CodeContainer>
            <ScrollContainer
              variants={slideIn}
              whileHover={{ scale: 1.1 }}
              onClick={scrollToContent}
            >
              <ScrollCircle />
            </ScrollContainer>
          </LeftContent>
          <RightContent>
            {[...Array(8)].map((_, i) => (
              <FloatingElement
                key={i}
                style={{
                  width: Math.random() * 150 + 100,
                  height: Math.random() * 150 + 100,
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  rotate: [0, 8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </RightContent>
        </Content>
      </HeroSection>
    </>
  );
};

export default Hero;