import { getPermenantImmigrationPagesLocalised } from "@/utils/services/permenantImmigrationService";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { options } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ExtendedSession } from "@/utils/types/extendedSession";
import ContainerWrapper from "@/components/ContainerWrapper";
import { AppWrappers } from "@/components/AppWrappers";
import { Navbar } from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import { LocalesParams } from "../defaults";
import { Locale } from "../../i18n";
import { ReactNode } from "react";
import {
  commonKeys,
  navlinksKeys,
  type commonTranslations,
  type navlinksTranslations,
} from "../../../messages/messagesKeys";

import "./global.css";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export async function generateStaticParams() {
  return LocalesParams();
}

export default async function RootLayout({ children, params }: Props) {
  const locale = params.locale;
  unstable_setRequestLocale(locale);
  const session = await getServerSession(options);

  const [tCommon, tNavlinks] = await Promise.all([
    getTranslations("common"),
    getTranslations("navlinks"),
  ]);

  const commonTranslations = commonKeys.reduce((obj, key) => {
    obj[key] = tCommon(key);
    return obj;
  }, {} as commonTranslations);

  const navlinksTranslations = navlinksKeys.reduce((obj, key) => {
    obj[key] = tNavlinks(key);
    return obj;
  }, {} as navlinksTranslations);

  const translations = { ...commonTranslations, ...navlinksTranslations };

  const permenantImmigrationPrograms =
    await getPermenantImmigrationPagesLocalised(locale);

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body>
        <AppWrappers params={params}>
          <Navbar
            session={session as ExtendedSession}
            permenantImmigrationPrograms={permenantImmigrationPrograms}
            params={params}
            translations={translations}
          />
          <ContainerWrapper>{children}</ContainerWrapper>
        </AppWrappers>
      </body>
    </html>
  );
}
