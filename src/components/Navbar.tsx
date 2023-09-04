"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Navlinks } from "@/utils/types/common";
import Logo from "../../public/brandLogo.svg";
import LangSwitcher from "./LangSwitcher";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  IconButton,
  HStack,
  useDisclosure,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useTranslations } from "next-intl";

interface Props {
  params: {
    locale: string;
  };
}

export function Navbar({ params }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lang = params.locale;
  const t = useTranslations("navlinks");
  const keys = [
    "/",
    "permenant-immigration",
    "temporary-immigration",
    "blog",
    "about-us",
    "book-consult",
    "assessment",
  ] as const;

  const navlinks = keys.map((key) => {
    return (
      <Link textAlign={"center"} key={key} href={`/${lang}/${key}`}>
        {t(key)}
      </Link>
    );
  });

  return (
    <>
      <Box
        boxShadow={"md"}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={4} alignItems={"center"}>
            <IconButton
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
              <Box position={"relative"} w={"50px"} h={"50px"}>
                <Icon fill={"rgb(239,64,35)"} as={Logo} w={"100%"} h={"100%"} />
              </Box>

              {navlinks}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
              </Button>
              <LangSwitcher params={params} />
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} textAlign={"center"} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navlinks}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
