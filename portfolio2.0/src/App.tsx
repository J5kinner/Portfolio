import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Featured from './components/sections/Featured';
import Skills from './components/sections/Skills';
import Portfolio from './components/sections/Portfolio';
import HireMe from './components/sections/HireMe';
import Footer from './components/layout/Footer';

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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Featured />
        <Skills />
        <Portfolio />
        <HireMe />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App; 