import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
          danger: React.CSSProperties['color'];
        };
        lightShade: {
            main:  React.CSSProperties['color'];
        }
      }
    
      interface ThemeOptions {
        status: {
          danger: React.CSSProperties['color'];
        };
        lightShade: {
            main:  React.CSSProperties['color'];
        }
      }
}

export const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    lightShade: {
        main: '#E5E6E3'
    }
});