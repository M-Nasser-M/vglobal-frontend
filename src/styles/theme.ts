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
    },
    dark: {
      mainBackground: "gray.700",
      navbarBackground: "gray.900",
      linkHover: "cayan.400",
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
  },
};

const styles = {
  global: {
    body: {
      background: "main-background",
      fontFamily: font.style.fontFamily,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    h1: { fontSize: "6rem" },
    h2: { fontSize: "3.75rem" },
    h3: { fontSize: "3rem" },
    h4: { fontSize: "2.125rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.25rem" },
  },
};

export const theme = extendTheme({ ...defaultTheme, semanticTokens, styles });
