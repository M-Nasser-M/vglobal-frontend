import ContainerWrapper from "@/components/ContainerWrapper";
import { AppWrappers } from "@/components/AppWrappers";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";
import { locales } from "../../../i18n";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const locale = params.locale;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppWrappers params={params}>
            <Navbar params={params} />
            <ContainerWrapper>{children}</ContainerWrapper>
          </AppWrappers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
