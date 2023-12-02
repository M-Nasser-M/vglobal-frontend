import React from "react";
import SigninForm from "./SigninForm";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import { useTranslations } from "next-intl";
import {
  signinformKeys,
  type signinformTranslations,
} from "../../../../messages/messagesKeys";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};
const Page = ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);

  const t = useTranslations("signinform");

  const translations = signinformKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as signinformTranslations);

  return <SigninForm translatinos={translations} />;
};

export default Page;
