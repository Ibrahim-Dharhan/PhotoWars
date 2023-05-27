import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: "8px 20px",
          textTransform: 'none',
        },
      }, 
    }, 
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
  typography: {
    "fontFamily": `"Rubik", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#27243A'
    },
    primary: {
      main: '#763DF0',
    },
    secondary: {
      main: '#FFD338',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

