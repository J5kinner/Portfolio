import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Portfolio from '../Portfolio';
import { projects } from '../../../data/content';

jest.mock('framer-motion', () => {
  const React = require('react');
  const strip = (tag: string) =>
    React.forwardRef(({ children, initial, whileInView, transition, viewport, ...p }: any, ref: any) =>
      React.createElement(tag, { ...p, ref }, children));
  return { motion: new Proxy({}, { get: (_t, tag: string) => strip(tag) }) };
});

const theme: any = { colors: { primary: '#000', secondary: '#111', accent: '#0f0', white: '#fff' } };

describe('Portfolio', () => {
  it('hides the link for projects without one', () => {
    render(<ThemeProvider theme={theme}><Portfolio /></ThemeProvider>);
    const elevator = projects.find(p => p.id === 'elevator')!;
    expect(elevator.link).toBeUndefined();
    expect(screen.getByLabelText('Elevator Project preview').closest('a')).toBeNull();
  });

  it('renders no case study block when fields are empty', () => {
    render(<ThemeProvider theme={theme}><Portfolio /></ThemeProvider>);
    expect(screen.queryByTestId('case-study-paijolizmal')).toBeNull();
  });
});

describe('Portfolio experiences', () => {
  it('renders each experience company without empty bullets', () => {
    render(<ThemeProvider theme={theme}><Portfolio /></ThemeProvider>);
    expect(screen.getByText('Racing.com')).toBeTruthy();
    expect(screen.queryByTestId('experience-bullets-racing-com')).toBeNull();
  });
});
