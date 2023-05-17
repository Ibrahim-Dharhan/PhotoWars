import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: "8px 20px"
        },
      }, 
    }, 
  },
  palette: {
    primary: {
      main: '#4F00D0',
    },
    secondary: {
      main: '#79DFD9',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

