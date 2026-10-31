import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self';
  whileHover?: any;
  whileTap?: any;
}

const CardContainer = styled(motion.div)<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
  $clickable: boolean;
}>`
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  
  ${props => {
    switch (props.$variant) {
      case 'glass':
        return `
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        `;
      case 'outlined':
        return `
          background: transparent;
          border: 2px solid ${props.theme.colors.accent};
        `;
      case 'elevated':
        return `
          background: ${props.theme.colors.white};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        `;
      default:
        return `
          background: ${props.theme.colors.white};
        `;
    }
  }}
  
  ${props => {
    switch (props.$padding) {
      case 'sm':
        return 'padding: 1rem;';
      case 'lg':
        return 'padding: 3rem;';
      default:
        return 'padding: 2rem;';
    }
  }}
  
  ${props => props.$clickable && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(39, 204, 145, 0.15);
    }
  `}
`;

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  onClick,
  href,
  target = '_self',
  whileHover,
  whileTap,
  ...props
}) => {
  const isClickable = !!(onClick || href);
  
  const handleClick = () => {
    if (href) {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener noreferrer');
      } else {
        window.location.href = href;
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <CardContainer
      className={className}
      $variant={variant}
      $padding={padding}
      $clickable={isClickable}
      onClick={handleClick}
      whileHover={whileHover || (isClickable ? { scale: 1.02 } : undefined)}
      whileTap={whileTap || (isClickable ? { scale: 0.98 } : undefined)}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default Card; 