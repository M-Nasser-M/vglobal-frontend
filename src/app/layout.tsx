import useTranslation from "next-translate/useTranslation";
import AppWrappers from "@/components/AppWrappers";
import { Navlinks } from "@/utils/types/common";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({ children }: Props) {
  const { t, lang } = useTranslation("common");

  const links = t(
    "navlinks",
    {},
    { returnObjects: true }
  ) as unknown as Navlinks;

  return (
    <html lang={lang} dir={lang == "ar" ? "rtl" : "ltr"}>
      <body>
        <AppWrappers>
          <Navbar links={links} lang={lang} />
          {children}
        </AppWrappers>
      </body>
    </html>
  );
}
