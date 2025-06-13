import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HireSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  padding: 4em 2em;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 5em 4em;
  }
`;

const HireContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 2.2em;
  margin-bottom: 0.5em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  @media (min-width: 768px) {
    font-size: 2.8em;
  }
`;

const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1em;
  margin-bottom: 2.5em;
  opacity: 0.9;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5em;
  margin-bottom: 2em;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
    max-width: 600px;
    margin: 0 auto 2em auto;
  }
`;

const ContactCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5em 1em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    &::before {
      left: 100%;
    }
  }

  .icon {
    font-size: 2em;
    margin-bottom: 0.5em;
    display: block;
  }

  .title {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 0.3em;
  }

  .description {
    font-size: 0.9em;
    opacity: 0.8;
  }
`;

const AvailabilityBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  border-radius: 50px;
  padding: 0.5em 1em;
  margin-bottom: 2em;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9em;

  .status-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    margin-right: 0.5em;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }
`;

const QuickContact = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2em;
  margin-top: 2em;
`;

const ContactForm = styled.form`
  display: grid;
  gap: 1em;
  max-width: 400px;
  margin: 0 auto;
`;

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.8em;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(123, 97, 255, 0.3);
  }
`;

const FormTextarea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.8em;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1em;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(123, 97, 255, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1em 2em;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
`;

const HireMe: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const contactOptions = [
    {
      icon: '📧',
      title: 'Email Me',
      description: 'Quick response guaranteed',
      href: 'mailto:jonah.lee.skinner@gmail.com',
      target: '_self'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      description: 'Professional networking',
      href: 'https://linkedin.com/in/jonah-skinner',
      target: '_blank'
    },
    // {
    //   icon: '📅',
    //   title: 'Schedule Call',
    //   description: 'Book a 30-min chat',
    //   href: 'https://calendly.com/yourlink',
    //   target: '_blank'
    // },
    {
      icon: '📄',
      title: 'Download Resume',
      description: 'Latest version',
      href: 'https://github.com/J5kinner/Portfolio/blob/main/Files/JonahSkinner_Resume2.0.pdf',
      target: '_blank'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleQuickContact = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <HireSection id="hire">
      <HireContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title variants={itemVariants}>
          Ready to Build Something Amazing?
        </Title>
        
        <Subtitle variants={itemVariants}>
          I'm passionate about creating innovative solutions and would love to discuss how I can contribute to your team's success.
        </Subtitle>

        <AvailabilityBadge variants={itemVariants}>
          <span className="status-dot"></span>
          Available for new opportunities
        </AvailabilityBadge>

        <ContactGrid variants={itemVariants}>
          {contactOptions.map((option, index) => (
            <ContactCard
              key={index}
              href={option.href}
              target={option.target}
              rel={option.target === '_blank' ? 'noopener noreferrer' : undefined}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon">{option.icon}</span>
              <div className="title">{option.title}</div>
              <div className="description">{option.description}</div>
            </ContactCard>
          ))}
        </ContactGrid>

        {showContactForm && (
          <QuickContact
            variants={itemVariants}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 style={{ color: 'white', marginBottom: '1em' }}>Quick Message</h3>
            <ContactForm>
              <FormInput type="text" placeholder="Your Name" required />
              <FormInput type="email" placeholder="Your Email" required />
              <FormInput type="text" placeholder="Company" />
              <FormTextarea placeholder="Tell me about the opportunity..." required />
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message 🚀
              </SubmitButton>
            </ContactForm>
          </QuickContact>
        )}

        <motion.div variants={itemVariants} style={{ marginTop: '2em' }}>
          <motion.button
            onClick={handleQuickContact}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              padding: '0.8em 1.5em',
              cursor: 'pointer',
              fontSize: '1em'
            }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            {showContactForm ? 'Hide Quick Contact' : 'Send Quick Message'} ✉️
          </motion.button>
        </motion.div>
      </HireContainer>
    </HireSection>
  );
};

export default HireMe; 