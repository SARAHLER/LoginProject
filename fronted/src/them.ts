import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121' ,

    },
    secondary: {
      main: '#bf360c',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: '#000',
         color: '#fff'
       
      },
    },
    MuiTextField: {
      root: {
        background: 'linear-gradient(to right, #FFC371, #FF5F6D, #FFFFFF)',
      },
    },
  },
});

export default theme;
