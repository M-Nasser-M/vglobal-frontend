import { type Locale } from "@/i18n";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  signupformKeys,
  type signupformTranslations,
} from "../../../../messages/messagesKeys";
import SignupForm from "./SignupForm";

type Props = {
  params: { locale: Locale };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("signupform");

  const translations = signupformKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as signupformTranslations);

  return <SignupForm translations={translations} />;
};

export default Page;
