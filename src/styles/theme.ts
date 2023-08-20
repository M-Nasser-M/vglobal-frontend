import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700", "900"],
});

const tokens = {
  colors: {
    light: {
      mainBackground: "gray.100",
    },
    dark: {
      mainBackground: "gray.700",
    },
  },
  font: {
    fontSizes: { heading: 31.5, subheading: 18, body: 12 },
  },
};

const semanticTokens = {
  colors: {
    "main-background": {
      default: tokens.colors.light.mainBackground,
      _dark: tokens.colors.dark.mainBackground,
    },
  },
  shadows: {},
  font: {
    fontSizes: {
      "heading-size": tokens.font.fontSizes.heading,
      "subheading-size": tokens.font.fontSizes.subheading,
      "body-size": tokens.font.fontSizes.body,
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
  },
};

export const theme = extendTheme({ ...defaultTheme, semanticTokens, styles });
