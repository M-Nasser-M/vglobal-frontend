import { unstable_setRequestLocale } from "next-intl/server";
import EmailConfirmationForm from "./EmailConfirmationForm";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n";
import {
  signinformKeys,
  type signinformTranslations,
} from "../../../../../messages/messagesKeys";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("signinform");

  const translations = signinformKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as signinformTranslations);
  return <EmailConfirmationForm translations={translations} />;
};

export default Page;
