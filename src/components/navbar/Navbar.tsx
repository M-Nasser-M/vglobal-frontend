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
  Icon,
} from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../../public/brandLogo.svg";
import LangSwitcher from "../LangSwitcher";
import { Link } from "@chakra-ui/next-js";
import Navlinks from "./Navlinks";

interface Props {
  params: {
    locale: string;
  };
}

export function Navbar({ params }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lang = params.locale;

  return (
    <>
      <Box boxShadow={"md"} bg="navbar-background" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
                <Icon fill={"rgb(239,64,35)"} as={Logo} w={"100%"} h={"100%"} />
              </Box>
              <Navlinks lang={lang} />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button bg="navbar-background" onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
              </Button>
              <Link href={`/${lang}/signin`}>
                <Button colorScheme="green">Sign In</Button>
              </Link>
              <LangSwitcher params={params} />
            </Stack>
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} textAlign={"center"} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Navlinks lang={lang} />
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
