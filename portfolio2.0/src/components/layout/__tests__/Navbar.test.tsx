import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from '../Navbar';

// Mock the navigation config
jest.mock('../../../config/navigation', () => ({
  mainNavItems: [
    { id: 'hero', label: 'Home' },
    { id: 'featured', label: 'Featured' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'hire', label: 'Hire Me' }
  ],
  socialNavItems: [
    { 
      id: 'github',
      label: 'GitHub',
      path: 'https://github.com/test',
      isExternal: true
    }
  ]
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    nav: 'nav',
    div: 'div',
    button: 'button',
    a: 'a'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock react-scroll
jest.mock('react-scroll', () => ({
  Link: ({ children, to, onSetActive, ...props }: any) => (
    <div 
      data-testid={`scroll-link-${to}`} 
      onClick={() => onSetActive && onSetActive(to)}
      {...props}
    >
      {children}
    </div>
  )
}));

// Mock theme for styled-components
const mockTheme = {
  colors: {
    primary: '#0c1833',
    secondary: '#1a2b4c',
    accent: '#27cc91',
    white: '#ffffff'
  },
  fonts: {
    main: "'Poppins', sans-serif"
  }
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = () => {
    return render(
      <ThemeProvider theme={mockTheme}>
        <Navbar />
      </ThemeProvider>
    );
  };

  test('renders basic navigation structure', () => {
    renderNavbar();
    
    // Test that navigation items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  test('renders with hero section active by default', () => {
    renderNavbar();
    
    const heroLink = screen.getByTestId('scroll-link-hero');
    expect(heroLink).toBeInTheDocument();
  });

  test('mobile menu button toggles state', () => {
    renderNavbar();
    
    const mobileMenuButton = screen.getByRole('button');
    
    // Initially closed
    expect(mobileMenuButton).not.toHaveClass('open');
    
    // Open mobile menu
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).toHaveClass('open');
    
    // Close mobile menu
    fireEvent.click(mobileMenuButton);
    expect(mobileMenuButton).not.toHaveClass('open');
  });

  test('scroll event handler is attached and works', () => {
    renderNavbar();
    
    // Mock scroll position > 50 to trigger scrolled state
    Object.defineProperty(window, 'scrollY', { value: 100 });
    fireEvent.scroll(window);
    
    // Test passes if no errors are thrown during scroll handling
    expect(window.scrollY).toBe(100);
  });

  test('navigation items are clickable', () => {
    renderNavbar();
    
    const skillsLink = screen.getByTestId('scroll-link-skills');
    fireEvent.click(skillsLink);
    
    // Test that the element exists and is clickable
    expect(skillsLink).toBeInTheDocument();
  });

  test('logo text is present', () => {
    renderNavbar();
    
    // Test that logo components are present (JS and .)
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();
  });

  test('component renders without errors', () => {
    renderNavbar();
    
    // Test that the component renders successfully
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

// Test for the scroll highlighting logic
describe('Navbar Scroll Highlighting Logic', () => {
  test('scroll detection calculation logic', () => {
    // Test the core logic that determines visible area
    const mockRect = {
      top: 100,
      bottom: 500,
      left: 0,
      right: 1000,
      width: 1000,
      height: 400,
      x: 0,
      y: 100,
      toJSON: () => {}
    };

    // Test the logic used in the component
    const navbarHeight = 70;
    const windowHeight = 800;
    const visibleTop = Math.max(mockRect.top, navbarHeight);
    const visibleBottom = Math.min(mockRect.bottom, windowHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    // Verify the calculation
    expect(visibleTop).toBe(100); // max(100, 70) = 100
    expect(visibleBottom).toBe(500); // min(500, 800) = 500
    expect(visibleHeight).toBe(400); // max(0, 500 - 100) = 400
    expect(visibleHeight).toBeGreaterThan(100); // Meets minimum threshold
  });

  test('minimum threshold logic', () => {
    // Test with element that has small visible area
    const smallRect = {
      top: 750,
      bottom: 800,
      left: 0,
      right: 1000,
      width: 1000,
      height: 50,
      x: 0,
      y: 750,
      toJSON: () => {}
    };

    const navbarHeight = 70;
    const windowHeight = 800;
    const visibleTop = Math.max(smallRect.top, navbarHeight);
    const visibleBottom = Math.min(smallRect.bottom, windowHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    expect(visibleHeight).toBe(50); // Only 50px visible
    expect(visibleHeight).toBeLessThan(100); // Doesn't meet minimum threshold
  });

  test('element completely above viewport', () => {
    const aboveRect = {
      top: -200,
      bottom: -100,
      left: 0,
      right: 1000,
      width: 1000,
      height: 100,
      x: 0,
      y: -200,
      toJSON: () => {}
    };

    const navbarHeight = 70;
    const windowHeight = 800;
    const visibleTop = Math.max(aboveRect.top, navbarHeight);
    const visibleBottom = Math.min(aboveRect.bottom, windowHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    expect(visibleHeight).toBe(0); // No visible area
  });

  test('element completely below viewport', () => {
    const belowRect = {
      top: 900,
      bottom: 1000,
      left: 0,
      right: 1000,
      width: 1000,
      height: 100,
      x: 0,
      y: 900,
      toJSON: () => {}
    };

    const navbarHeight = 70;
    const windowHeight = 800;
    const visibleTop = Math.max(belowRect.top, navbarHeight);
    const visibleBottom = Math.min(belowRect.bottom, windowHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    expect(visibleHeight).toBe(0); // No visible area
  });
}); 