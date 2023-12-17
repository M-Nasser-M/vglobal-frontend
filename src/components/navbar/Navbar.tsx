"use client";

import { CalThemeAtom, LocaleAtom, SessionAtom } from "@/atoms/atoms";
import Link from "@/components/Link";
import { Locale } from "@/i18n";
import { ExtendedSession } from "@/utils/types/extendedSession";
import type { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import type {
  commonTranslations,
  navlinksTranslations,
} from "../../../messages/messagesKeys";
import Logo from "../../../public/brandLogo.webp";
import LangSwitcher from "../LangSwitcher";
import MobileNavlinks from "./MobileNavlinks";
import Navlinks from "./Navlinks";

interface Props {
  params: {
    locale: Locale;
  };
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined | null;
  session: ExtendedSession | null;
  translations: commonTranslations & navlinksTranslations;
}

export function Navbar({
  params,
  permenantImmigrationPrograms,
  session,
  translations,
}: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  useHydrateAtoms([
    [SessionAtom, session],
    [LocaleAtom, params.locale],
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setSessionAtom = useSetAtom(SessionAtom);
  const setCalTheme = useSetAtom(CalThemeAtom);
  const router = useRouter();
  const lang = params.locale;
  setCalTheme(colorMode);

  return (
    <>
      <Box
        position="fixed"
        zIndex="sticky"
        width="full"
        boxShadow="md"
        bg="navbar-background"
        px={4}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={4} alignItems={"center"}>
            <IconButton
              name="mobile menu button"
              bg="navbar-background"
              size={"sm"}
              p={2}
              icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
              aria-label={"Open Menu"}
              display={{ xl: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", xl: "flex" }}
            >
              <Box mr={2} position={"relative"} w={"50px"} h={"50px"}>
                <Link href="/">
                  <Image src={Logo} alt="logo" />
                </Link>
              </Box>
              <Navlinks
                permenantImmigrationPrograms={permenantImmigrationPrograms}
                lang={lang}
                translations={translations}
              />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                bg="navbar-background"
                onClick={() => {
                  toggleColorMode();
                  setCalTheme(colorMode);
                }}
              >
                {colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
              </Button>
              {session && session.user ? (
                <Menu>
                  <MenuButton name="user button">
                    <Avatar
                      src={session.user.image || ""}
                      name={session.user.name}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      as={Button}
                      onClick={async () => {
                        await signOut();
                        setSessionAtom(null);
                        router.refresh();
                      }}
                      colorScheme="red"
                    >
                      {translations.signout}
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link href={`/signin`}>
                  <Button colorScheme="red">{translations.signin}</Button>
                </Link>
              )}
              <LangSwitcher params={params} />
            </Stack>
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} textAlign={"center"} display={{ xl: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <MobileNavlinks
                permenantImmigrationPrograms={permenantImmigrationPrograms}
                lang={lang}
                translations={translations}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
