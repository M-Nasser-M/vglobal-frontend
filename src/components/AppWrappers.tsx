"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import React, { ReactNode } from "react";
import { theme } from "@/styles/theme";

type Props = { children: ReactNode; params: { locale: string } };

export const AppWrappers = ({ children, params }: Props) => {
  const lang = params.locale;
  const direction = lang === "ar" ? "rtl" : "ltr";
  const themeWithDirection = extendTheme({ ...theme, direction });
  return (
    <CacheProvider>
      <ChakraProvider theme={themeWithDirection}>{children}</ChakraProvider>
    </CacheProvider>
  );
};
