import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { protectedRoutes } from "./protectedRoutes";
import { locales } from "./i18n";

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  // If always, the locale will be set in the URL (e.g. `/en/about`)
  localePrefix: "always",
  // If true, the locale will be detected from the browser (e.g. `/en/about`)
  localeDetection: true,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(request: NextRequest) {
    return intlMiddleware(request);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  // Step 2: Create and call the next-intl middleware

  const response = intlMiddleware(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const routePath = request.nextUrl.pathname.split("/")[2];
  // const routeLocale = request.nextUrl.pathname.split("/")[1];

  if (protectedRoutes.includes(routePath))
    return authMiddleware(request as NextRequestWithAuth, {} as NextFetchEvent);

  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/signin"],
};
