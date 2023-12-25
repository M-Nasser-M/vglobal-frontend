import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = { params: { locale: Locale } };

const page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return <div></div>;
};

export default page;
