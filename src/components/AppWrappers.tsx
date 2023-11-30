"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider as JotaiProvider } from "jotai";
import React, { ReactNode, useState } from "react";
import { theme } from "@/styles/theme";

type Props = { children: ReactNode; params: { locale: string } };

export const AppWrappers = ({ children, params }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const lang = params.locale;
  const direction = lang === "ar" ? "rtl" : "ltr";
  const themeWithDirection = extendTheme({ ...theme, direction });
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <CacheProvider>
          <ChakraProvider theme={themeWithDirection}>{children}</ChakraProvider>
        </CacheProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
