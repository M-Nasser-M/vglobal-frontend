"use client";

import { Box } from "@chakra-ui/react";
import { navlinksKeys } from "../../../messages/messagesKeys";
import { useTranslations } from "next-intl";
import { Link } from "@chakra-ui/next-js";
import DropDownMenu from "./DropDownMenu";
import React from "react";

type Props = { lang: string };

const Navlinks = ({ lang }: Props) => {
  const t = useTranslations("navlinks");

  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink != "permenant-immigration" ? (
        <Link textAlign={"center"} href={`/${lang}/${navLink}`}>
          {t(navLink)}
        </Link>
      ) : (
        <DropDownMenu
          href={`/${lang}/${navLink}`}
          title={t(navLink)}
          menuData={[
            { label: "label1", href: "href1" },
            { label: "label2", href: "href2" },
          ]}
        />
      )}
    </Box>
  ));
};

export default Navlinks;
