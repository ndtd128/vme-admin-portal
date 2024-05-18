import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#46a5e5',
    },
    secondary: {
      main: '#253b80',
    },
    type: 'light',
  },
  direction: 'rtl',
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 18,
    button: {
      textTransform: 'none',
      fontWeight: 650,
    },
  },
});

export default theme;
