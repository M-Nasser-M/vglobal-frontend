import React from "react";
import SignupForm from "./SignupForm";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import { useTranslations } from "next-intl";
import {
  signupformKeys,
  type signupformTranslations,
} from "../../../../messages/messagesKeys";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("signupform");

  const translations = signupformKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as signupformTranslations);

  return <SignupForm translations={translations} />;
};

export default Page;
