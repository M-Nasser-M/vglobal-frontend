"use client";

import {
  type commonTranslations,
  navlinksKeys,
  type navlinksTranslations,
} from "../../../messages/messagesKeys";
import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import Link from "@/components/Link";
import { Box } from "@chakra-ui/react";
import DropDownMenu from "./DropDownMenu";

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined | null;
  translations: commonTranslations & navlinksTranslations;
};

const Navlinks = ({ permenantImmigrationPrograms, translations }: Props) => {
  const menuData = permenantImmigrationPrograms?.data.map((item) => ({
    label: item.title,
    href: `/permenant-immigration/${item.id}`,
  }));
  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink !== "permenant-immigration" && (
        <Link href={navLink}>{translations[navLink]}</Link>
      )}
      {navLink === "permenant-immigration" &&
        permenantImmigrationPrograms &&
        permenantImmigrationPrograms.data.length > 0 && (
          <DropDownMenu
            triggerTitle={translations[navLink]}
            menuData={menuData!}
          />
        )}
    </Box>
  ));
};

export default Navlinks;
