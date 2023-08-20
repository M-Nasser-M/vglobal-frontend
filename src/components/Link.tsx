import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/next-js";

const Link = (props: LinkProps) => {
  const { lang } = useTranslation();
  return <ChakraLink {...props} href={`/${lang}${props.href}`} />;
};

export default Link;
