import { createMuiTheme } from "@material-ui/core";

const anclTheme = createMuiTheme({
  typography: {
    fontFamily: [
      '微軟正黑體'
    ].join(),
  },
  palette: {
    primary: {
      light: '#cffaee',
      main: '#b0f7e3',
      dark: '#58d1b0'
    },
    text: {
      secondary: '#0f8cd9'
    }
  }
});

export default anclTheme;