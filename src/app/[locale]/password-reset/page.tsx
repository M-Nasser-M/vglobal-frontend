import React from "react";
import PasswordResetForm from "./PasswordResetForm";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  return <PasswordResetForm />;
};

export default Page;
