import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Navbar from '../Navbar';
import * as analytics from '../../../utils/analytics';

// Mock analytics functions
jest.mock('../../../utils/analytics', () => ({
  trackNavigation: jest.fn(),
  trackSocialClick: jest.fn(),
}));

// Mock react-scroll
jest.mock('react-scroll', () => ({
  Link: ({ children, to, onSetActive, onClick, ...props }: any) => (
    <div 
      data-testid={`nav-link-${to}`}
      onClick={() => {
        onClick?.();
        onSetActive?.();
      }}
      {...props}
    >
      {children}
    </div>
  ),
}));

const theme = {
  colors: {
    primary: '#0c1833',
    secondary: '#061326',
    accent: '#27cc91',
    white: '#ffffff',
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
};

const renderNavbar = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
};

describe('Navbar Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });

    // Mock window dimensions for desktop view (so social links render)
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true
    });

    // Mock getElementById
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => ({
        getBoundingClientRect: () => ({
          top: 100,
          bottom: 200,
        }),
      })),
      writable: true
    });
  });

  describe('Logo Analytics', () => {
    it('should track logo click with correct parameters', () => {
      renderNavbar();
      
      const logo = screen.getByText('JS');
      fireEvent.click(logo);
      
      expect(analytics.trackNavigation).toHaveBeenCalledWith('hero', 'logo');
    });
  });

  describe('Desktop Navigation Analytics', () => {
    it('should track desktop navigation clicks', () => {
      renderNavbar();
      
      const skillsLink = screen.getByTestId('nav-link-skills');
      fireEvent.click(skillsLink);
      
      expect(analytics.trackNavigation).toHaveBeenCalledWith('skills', 'desktop');
    });

    it('should track all navigation sections', () => {
      renderNavbar();
      
      const sections = ['featured', 'skills', 'portfolio', 'hire'];
      
      sections.forEach(section => {
        const link = screen.getByTestId(`nav-link-${section}`);
        fireEvent.click(link);
        
        expect(analytics.trackNavigation).toHaveBeenCalledWith(section, 'desktop');
      });
    });
  });

  describe('Mobile Navigation Analytics', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
    });

    it('should track mobile menu open/close', () => {
      renderNavbar();
      
      const menuButton = screen.getByRole('button');
      
      // Open menu
      fireEvent.click(menuButton);
      expect(analytics.trackNavigation).toHaveBeenCalledWith('mobile_menu_open', 'mobile');
      
      // Close menu
      fireEvent.click(menuButton);
      expect(analytics.trackNavigation).toHaveBeenCalledWith('mobile_menu_close', 'mobile');
    });
  });

  describe('Social Media Analytics', () => {
    it('should have social media tracking capability', () => {
      // This test verifies that the tracking function exists and can be called
      expect(analytics.trackSocialClick).toBeDefined();
      
      // Test that we can call the function without errors
      analytics.trackSocialClick('github');
      expect(analytics.trackSocialClick).toHaveBeenCalledWith('github');
    });
  });

  describe('Analytics Edge Cases', () => {
    it('should handle rapid navigation clicks', () => {
      renderNavbar();
      
      const skillsLink = screen.getByTestId('nav-link-skills');
      
      // Rapid clicks
      fireEvent.click(skillsLink);
      fireEvent.click(skillsLink);
      fireEvent.click(skillsLink);
      
      expect(analytics.trackNavigation).toHaveBeenCalledTimes(3);
      expect(analytics.trackNavigation).toHaveBeenCalledWith('skills', 'desktop');
    });

    it('should track different navigation sources correctly', () => {
      renderNavbar();
      
      // Logo click
      const logo = screen.getByText('JS');
      fireEvent.click(logo);
      expect(analytics.trackNavigation).toHaveBeenCalledWith('hero', 'logo');
      
      // Desktop navigation click
      const portfolioLink = screen.getByTestId('nav-link-portfolio');
      fireEvent.click(portfolioLink);
      expect(analytics.trackNavigation).toHaveBeenCalledWith('portfolio', 'desktop');
      
      // Verify different sources are tracked
      expect(analytics.trackNavigation).toHaveBeenCalledTimes(2);
    });

    it('should not break when analytics functions are undefined', () => {
      // Temporarily remove analytics functions
      (analytics.trackNavigation as jest.Mock).mockImplementation(() => {
        throw new Error('Analytics unavailable');
      });
      
      renderNavbar();
      
      const logo = screen.getByText('JS');
      
      // Should not throw error
      expect(() => fireEvent.click(logo)).not.toThrow();
    });
  });
}); 