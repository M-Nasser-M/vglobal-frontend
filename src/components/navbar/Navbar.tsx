"use client";

import { ExtendedSession } from "@/utils/types/extendedSession";
import { CalThemeAtom, SessionAtom } from "@/atoms/atoms";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../../public/brandLogo.webp";
import LangSwitcher from "../LangSwitcher";
import { signOut } from "next-auth/react";
import Navlinks from "./Navlinks";
import { useSetAtom } from "jotai";
import NextLink from "next/link";
import Image from "next/image";
import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  params: {
    locale: string;
  };
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined;
  session: ExtendedSession | null;
}

export function Navbar({
  params,
  permenantImmigrationPrograms,
  session,
}: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setSessionAtom = useSetAtom(SessionAtom);
  const setCalTheme = useSetAtom(CalThemeAtom);
  const router = useRouter();
  const t = useTranslations("common");
  const lang = params.locale;

  setCalTheme(colorMode);
  setSessionAtom(session);
  return (
    <>
      <Box boxShadow="md" bg="navbar-background" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={4} alignItems={"center"}>
            <IconButton
              name="mobile menu button"
              bg="navbar-background"
              size={"sm"}
              p={2}
              icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
              aria-label={"Open Menu"}
              display={{ lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", lg: "flex" }}
            >
              <Box mr={2} position={"relative"} w={"50px"} h={"50px"}>
                <Image src={Logo} alt="logo" />
              </Box>
              <Navlinks
                permenantImmigrationPrograms={permenantImmigrationPrograms}
                lang={lang}
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
                <Button
                  onClick={async () => {
                    await signOut();
                    setSessionAtom(null);
                    router.refresh();
                  }}
                  colorScheme="red"
                >
                  {t("signout")}
                </Button>
              ) : (
                <Link as={NextLink} href={`/${lang}/signin`}>
                  <Button colorScheme="red">{t("signin")}</Button>
                </Link>
              )}
              <LangSwitcher params={params} />
            </Stack>
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} textAlign={"center"} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Navlinks
                permenantImmigrationPrograms={permenantImmigrationPrograms}
                lang={lang}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
