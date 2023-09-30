import { getPermenantImmigrationPagesLocalised } from "@/utils/services/permenantImmigrationService";
import { ExtendedSession } from "@/utils/types/extendedSession";
import ContainerWrapper from "@/components/ContainerWrapper";
import { options } from "@/utils/other/nextAuthOptions";
import { AppWrappers } from "@/components/AppWrappers";
import { Navbar } from "@/components/navbar/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getServerSession } from "next-auth";
import { locales } from "../../../i18n";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const locale = params.locale;
  const session = await getServerSession(options);
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const permenantImmigrationPrograms =
    await getPermenantImmigrationPagesLocalised(locale);
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppWrappers params={params}>
            <Navbar
              session={session as ExtendedSession}
              permenantImmigrationPrograms={permenantImmigrationPrograms}
              params={params}
            />
            <ContainerWrapper>{children}</ContainerWrapper>
          </AppWrappers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
