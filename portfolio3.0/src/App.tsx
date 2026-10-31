import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { trackPageView } from './utils/gtm';
import { getEnabledSections } from './config/sections';
import { shouldEnableAnalytics } from './config/environment';

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

const App: React.FC = () => {
  const enabledSections = getEnabledSections();

  useEffect(() => {
    // Track initial page view only if analytics is enabled
    if (shouldEnableAnalytics()) {
      trackPageView('Portfolio Home');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <main>
        {enabledSections.map(({ id, component: Component }) => (
          <Component key={id} />
        ))}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App; 