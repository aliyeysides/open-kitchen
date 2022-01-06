import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#1de9b6", //#009688
    },
    secondary: {
      main: "#1de9b6",
    },
    error: {
      main: red.A400,
    },
    mode: "dark",
  },
});

export default theme;
