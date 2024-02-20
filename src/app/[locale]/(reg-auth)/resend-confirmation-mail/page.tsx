import ResendConfirmationMailForm from "./ResendConfirmationMailForm";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: { locale: Locale };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return <ResendConfirmationMailForm />;
};

export default Page;
