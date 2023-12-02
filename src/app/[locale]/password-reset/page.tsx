import { type Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import PasswordResetForm from "./PasswordResetForm";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  return <PasswordResetForm />;
};

export default Page;
