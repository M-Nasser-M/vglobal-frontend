"use client";

import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { locales } from "../../i18n";

type Props = { params: { locale: string } };

const LangSwitcher = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const lang = params.locale;

  const changeLanguage = (newLang: string) => {
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(`${window.location.origin}/${newPathname}`);
  };

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
          {locales.map((locale) => (
            <MenuItemOption
              key={locale}
              onClick={() => changeLanguage(locale)}
              value={locale}
            >
              {locale}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LangSwitcher;
