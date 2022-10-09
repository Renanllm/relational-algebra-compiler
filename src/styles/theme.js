import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5429CC',
      green: '#33CC95',
      red: '#E52E4D'
    },
    secondary: {
      main: '#6933FF'
    },
    error: {
      main: '#E52E4D'
    },
    neutral: {
      main: '#F0F2F5',
    },
    disabled: {
      main: '#969CB2'
    },
    background: {
      main: '#F0F2F5'
    },
    text: {
      primary: '#363F5F'
    },
    grey: {
      "300": '#D7D7D7',
      "900": '#969CB2'
    },
  },
});