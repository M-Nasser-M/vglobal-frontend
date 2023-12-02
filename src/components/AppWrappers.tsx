"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider as JotaiProvider } from "jotai";
import { theme } from "@/styles/theme";
import type { Locale } from "@/i18n";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: { locale: Locale } };

export const AppWrappers = ({ children, params }: Props) => {
  const lang = params.locale;
  const direction = lang === "ar" ? "rtl" : "ltr";
  const themeWithDirection = extendTheme({ ...theme, direction });
  return (
    <JotaiProvider>
      <CacheProvider>
        <ChakraProvider theme={themeWithDirection}>{children}</ChakraProvider>
      </CacheProvider>
    </JotaiProvider>
  );
};
