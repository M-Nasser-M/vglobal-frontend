import { useTranslations } from "next-intl";
import EmailConfirmed from "./EmailConfirmed";
import {
  commonKeys,
  commonTranslations,
} from "../../../../../messages/messagesKeys";
import type { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = { params: { locale: Locale } };

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("common");
  const translations = commonKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as commonTranslations);

  return <EmailConfirmed translations={translations} />;
};

export default Page;
