"use client";

import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import { navlinksKeys } from "../../../messages/messagesKeys";
import Link from "@/components/Link";
import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import DropDownMenu from "./DropDownMenu";

import React from "react";

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined;
};

const Navlinks = ({ permenantImmigrationPrograms }: Props) => {
  const t = useTranslations("navlinks");
  const menuData = permenantImmigrationPrograms?.data.map((item) => ({
    label: item.title,
    href: `/permenant-immigration/${item.id}`,
  }));
  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink !== "permenant-immigration" && (
        <Link href={navLink}>{t(navLink)}</Link>
      )}
      {navLink === "permenant-immigration" &&
        permenantImmigrationPrograms &&
        permenantImmigrationPrograms.data.length > 0 && (
          <DropDownMenu triggerTitle={t(navLink)} menuData={menuData!} />
        )}
    </Box>
  ));
};

export default Navlinks;
