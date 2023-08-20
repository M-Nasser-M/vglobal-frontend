"use client";

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
} from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import LangSwitcher from "./LangSwitcher";
import { Navlinks } from "@/utils/types/common";
import Link from "./Link";
// import LangSwitcher from "./LangSwitcher";

interface Props {
  links: Navlinks;
  lang: string;
}

export default function Navbar({ links, lang = "en" }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        boxShadow={"2xl"}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <IconButton
              size={"md"}
              icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => {
                const [k, v] = Object.entries(link)[0];
                return (
                  <Link key={k} href={`/${k}`}>
                    {v}
                  </Link>
                );
              })}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
              </Button>
              <LangSwitcher lang={lang} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
