"use client";

import {
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { MdOutlineLanguage } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";

type Props = { params: { locale: Locale } };

const LangSwitcher = ({ params }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const lang = params.locale;

  const changeLanguage = (newLang: string) => {
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(`${window.location.origin}/${newPathname}`);
  };

  return (
    <Menu>
      <MenuButton name="switch language button" px={4} py={2}>
        <Icon boxSize={5} as={MdOutlineLanguage} />
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
