import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      white: string;
    };
    fonts: {
      main: string;
    };
  }
} 