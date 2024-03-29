import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700", "900"],
});

const tokens = {
  colors: {
    light: {
      mainBackground: "gray.100",
      navbarBackground: "gray.100",
      linkHover: "cayan.400",
      defaultText: "gray.800",
    },
    dark: {
      mainBackground: "gray.800",
      navbarBackground: "gray.900",
      linkHover: "cayan.400",
      defaultText: "whiteAlpha.900",
    },
  },
};

const semanticTokens = {
  colors: {
    "main-background": {
      default: tokens.colors.light.mainBackground,
      _dark: tokens.colors.dark.mainBackground,
    },
    "navbar-background": {
      default: tokens.colors.light.navbarBackground,
      _dark: tokens.colors.dark.navbarBackground,
    },
    "link-hover": {
      default: tokens.colors.light.linkHover,
      _dark: tokens.colors.dark.linkHover,
    },
    "default-text": {
      default: tokens.colors.light.defaultText,
      _dark: tokens.colors.dark.defaultText,
    },
  },
};

const styles = {
  global: {
    body: {
      backgroundColor: "main-background",
      fontFamily: font.style.fontFamily,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    h1: { fontSize: "3rem" },
    h2: { fontSize: "2.125rem" },
    h3: { fontSize: "1.5rem" },
    h4: { fontSize: "1.25rem" },
    h5: { fontSize: "1rem" },
    h6: { fontSize: "0.75rem" },
    p: { color: "default-text" },
    span: { color: "default-text" },
  },
};

export const theme = extendTheme({ ...defaultTheme, semanticTokens, styles });
