import { getPermenantImmigrationPagesLocalised } from "@/utils/services/permenantImmigrationService";
import { ExtendedSession } from "@/utils/types/extendedSession";
import ContainerWrapper from "@/components/ContainerWrapper";
import { options } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { AppWrappers } from "@/components/AppWrappers";
import { Navbar } from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import { Locale } from "../../i18n";
import { ReactNode } from "react";

import "./global.css";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
  commonKeys,
  navlinksKeys,
  type commonTranslations,
  type navlinksTranslations,
} from "../../../messages/messagesKeys";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function RootLayout({ children, params }: Props) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
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
