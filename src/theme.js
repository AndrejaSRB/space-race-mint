
import '@fontsource/dm-mono';
import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  fonts: {
    heading: `'DM Mono', monospace, sans-serif`,
    body: `'DM Mono', monospace, sans-serif`,
  },

  breakpoints: {
    xs: "320px",
    sm: "375px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1420px",
    "3xl": "1800px",
    "4xl": "2432px",
  },

});

export default theme;
