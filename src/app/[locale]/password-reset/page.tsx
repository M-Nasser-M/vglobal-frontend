import { type Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import PasswordResetForm from "./PasswordResetForm";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return <PasswordResetForm />;
};

export default Page;
