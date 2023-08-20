"use client";
import { theme } from "@/styles/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { ReactNode } from "react";

const AppWrappers = ({ children }: { children: ReactNode }) => {
  const { lang } = useTranslation();
  const direction = lang === "ar" ? "rtl" : "ltr";
  const themeWithDirection = extendTheme({ ...theme, direction });
  return (
    <CacheProvider>
      <ChakraProvider theme={themeWithDirection}>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default AppWrappers;
