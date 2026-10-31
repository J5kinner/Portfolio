import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import MobileShowcase from '../MobileShowcase';

const theme: any = { colors: { primary: '#000', secondary: '#111', accent: '#0f0', white: '#fff' } };
const wrap = (ui: React.ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('MobileShowcase', () => {
  it('renders nothing with no data', () => {
    const { container } = wrap(<MobileShowcase screens={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('cycles through screens', () => {
    wrap(
      <MobileShowcase
        screens={[
          { id: 'a', title: 'Screen A', image: '/a.png' },
          { id: 'b', title: 'Screen B', image: '/b.png' }
        ]}
      />
    );
    expect(screen.getByAltText('Screen A')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Next screen'));
    expect(screen.getByAltText('Screen B')).toBeTruthy();
  });
});
