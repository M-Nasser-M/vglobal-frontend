import { type Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import ForgotPasswordForm from "./ForgotPasswordForm";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  return <ForgotPasswordForm />;
};

export default Page;
