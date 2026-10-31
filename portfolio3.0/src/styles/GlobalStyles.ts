import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,300&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #0c1833;
    color: #ffffff;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: auto;
  }

  :focus-visible {
    outline: 3px solid #27cc91;
    outline-offset: 3px;
  }

  main:focus {
    outline: none;
  }

  .skip-link {
    position: absolute;
    left: 1em;
    top: -4em;
    z-index: 10000;
    padding: 0.75em 1em;
    background: #27cc91;
    color: #0c1833;
    font-weight: 700;
    border-radius: 4px;
  }

  .skip-link:focus {
    top: 1em;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  section {
    padding: 4em 2em;
    text-align: center;
  }

  @media only screen and (min-width: 768px) {
    section {
      padding: 4em;
    }
  }

  @media only screen and (min-width: 1050px) {
    section {
      padding: 4em 6em;
    }
  }
`;

export default GlobalStyles; 