"use client";

import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import { navlinksKeys } from "../../../messages/messagesKeys";
import { Box, Link } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import DropDownMenu from "./DropDownMenu";
import NextLink from "next/link";
import React from "react";

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined;
  mobile?: boolean;
};

const Navlinks = ({ lang, permenantImmigrationPrograms, mobile }: Props) => {
  const t = useTranslations("navlinks");
  const menuData = permenantImmigrationPrograms?.data.map((item) => ({
    label: item.title,
    href: `/permenant-immigration/${item.id}`,
  }));
  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      <Link as={NextLink} textAlign={"center"} href={`/${lang}/${navLink}`}>
        {t(navLink)}
      </Link>
      {navLink === "permenant-immigration" &&
        permenantImmigrationPrograms &&
        permenantImmigrationPrograms.data.length > 0 && (
          <DropDownMenu mobile={mobile} menuData={menuData!} />
        )}
    </Box>
  ));
};

export default Navlinks;
