"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 500,
      lg: 600,
      xl: 900,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
