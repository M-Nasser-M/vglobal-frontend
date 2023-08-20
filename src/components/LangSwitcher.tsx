"use client";

import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

type Props = { lang: string };

const LangSwitcher = ({ lang }: Props) => {
  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
      >
        {lang} <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={lang} type="radio">
          <MenuItemOption value="en">en</MenuItemOption>
          <MenuItemOption value="ar">ar</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LangSwitcher;
