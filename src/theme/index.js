import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  status: {
    danger: '#e53e3e'
  },
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.green[500]
    },
    secondary: {
      main: colors.red[500]
    },

    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      white: colors.common.white
    }
  },
  shadows,
  typography
});

export default theme;
