import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import * as FaIcons from 'react-icons/fa';
import { mainNavItems, socialNavItems, NavItem } from '../../config/navigation';

// Type guard to check if a value is a valid React component
const isValidIcon = (icon: any): icon is React.ComponentType<{ size: number }> => {
  return typeof icon === 'function';
};

// Helper component to safely render dynamic icons
const DynamicIcon: React.FC<{ iconName: string; size: number }> = ({ iconName, size }) => {
  const Icon = FaIcons[`Fa${iconName.charAt(0).toUpperCase() + iconName.slice(1)}` as keyof typeof FaIcons];
  
  if (isValidIcon(Icon)) {
    const IconComponent = Icon as React.ComponentType<{ size: number }>;
    return <IconComponent size={size} />;
  }
  
  return null;
};

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;

  @media (min-width: 1050px) {
    padding: 1.5rem 4rem;
  }
`;

const NavContainer = styled.div<{ $scrolled: boolean }>`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 16px;
  background: ${props => props.$scrolled 
    ? 'rgba(12, 24, 51, 0.8)' 
    : 'rgba(12, 24, 51, 0.4)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$scrolled 
    ? 'rgba(39, 204, 145, 0.2)' 
    : 'rgba(39, 204, 145, 0.1)'};
  transition: all 0.3s ease;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #27cc91;
  }
`;

const NavLinks = styled(motion.div)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;

const NavLink = styled(motion.div)`
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #27cc91;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #27cc91;
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (min-width: 768px) {
    display: none;
  }

  span {
    display: block;
    width: 25px;
    height: 2px;
    background: #ffffff;
    transition: all 0.3s ease;
  }

  &.open {
    span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(12, 24, 51, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLink = styled(motion.div)`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 200px;

  &.active {
    color: #27cc91;
  }
`;

const SocialLinks = styled(motion.div)`
  display: none;
  gap: 1.5rem;
  align-items: center;

  @media (min-width: 1050px) {
    display: flex;
  }
`;

const SocialLink = styled(motion.a)`
  color: #ffffff;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(39, 204, 145, 0.1);
  border: 1px solid rgba(39, 204, 145, 0.2);
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(39, 204, 145, 0.2);
    transform: translateY(-2px);
    color: #27cc91;
  }
`;

const MobileSocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileSocialLink = styled(motion.a)`
  color: #ffffff;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(39, 204, 145, 0.1);
  border: 1px solid rgba(39, 204, 145, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &:hover {
    background: rgba(39, 204, 145, 0.2);
    color: #27cc91;
  }
`;

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSetActive = (to: string) => {
    setActiveSection(to);
    setIsMobileMenuOpen(false);
  };

  const renderNavLink = (item: NavItem) => {
    if (item.isExternal && item.path) {
      return (
        <SocialLink
          key={item.id}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <DynamicIcon iconName={item.id} size={20} />
        </SocialLink>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.id}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onSetActive={() => setActiveSection(item.id)}
      >
        <NavLink
          className={activeSection === item.id ? 'active' : ''}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {item.label}
        </NavLink>
      </Link>
    );
  };

  return (
    <Nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <NavContainer $scrolled={isScrolled}>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSetActive('hero')}
        >
          JS<span>.</span>
        </Logo>

        <NavLinks>
          {mainNavItems.map(renderNavLink)}
        </NavLinks>

        <SocialLinks>
          {socialNavItems.map(renderNavLink)}
        </SocialLinks>

        <MobileMenuButton
          className={isMobileMenuOpen ? 'open' : ''}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {mainNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => handleSetActive(item.id)}
              >
                <MobileNavLink
                  className={activeSection === item.id ? 'active' : ''}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </MobileNavLink>
              </Link>
            ))}
            <MobileSocialLinks>
              {socialNavItems.map((item) => {
                return (
                  <MobileSocialLink
                    key={item.id}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DynamicIcon iconName={item.id} size={24} />
                  </MobileSocialLink>
                );
              })}
            </MobileSocialLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar; 