import type { Locale } from "@/i18n";
import ResendConfirmationMailForm from "./ResendConfirmationMailForm";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  locale: Locale;
};
const page = ({ locale }: Props) => {
  unstable_setRequestLocale(locale);
  return <ResendConfirmationMailForm />;
};

export default page;
