"use client";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "/public/brandLogo.png";
import Link from "@/components/Link";
import Image from "next/image";
import {
  type footerTranslations,
  footerKeys,
} from "../../messages/messagesKeys";
import {
  Stack,
  HStack,
  Divider,
  IconButton,
  Text,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";

const accounts = [
  {
    url: "https://www.instagram.com/vglobal_immigration/",
    label: "Instagram Account",
    type: "red",
    icon: <FaInstagram />,
  },
  {
    url: "https://www.facebook.com/VglobalImmigration",
    label: "Facebook Account",
    type: "facebook",
    icon: <FaFacebook />,
  },
  {
    url: "https://www.linkedin.com/company/vglobal/",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
];

type Props = { translations: footerTranslations };

const Footer = ({ translations }: Props) => {
  return (
    <Stack
      width="full"
      bg="navbar-background"
      boxShadow="dark-lg"
      p={4}
      spacing={{ base: 8, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: "column", md: "row" }}
    >
      <Link href="https://vglobal.ca">
        <Image src={Logo} width={40} alt="Vglobal Logo" />
      </Link>

      {/* Desktop Screen */}
      <HStack
        spacing={4}
        alignItems="center"
        display={{ base: "none", md: "flex" }}
      >
        {footerKeys.map((link, index) => (
          <Link isExternal href={`/${link}`} key={index}>
            {translations[link]}
          </Link>
        ))}
        <Text> &copy; Vglobal, Inc. All rights reserved.</Text>
      </HStack>

      {/* Mobile and Tablet Screens */}
      <Stack display={{ base: "flex", md: "none" }} alignItems="center">
        <HStack alignItems="center">
          {footerKeys.map((link, index) => (
            <Box key={index} as="span">
              <Link isExternal href={`/${link}`}>
                {translations[link]}
              </Link>
              <Divider h="1rem" orientation="vertical" />
            </Box>
          ))}
        </HStack>
        <HStack alignItems="center">
          <Text> &copy; Vglobal, Inc. All rights reserved.</Text>
        </HStack>
      </Stack>

      <Stack
        direction="row"
        spacing={5}
        pt={{ base: 4, md: 0 }}
        alignItems="center"
      >
        {accounts.map((acc, index) => (
          <IconButton
            key={index}
            as={ChakraLink}
            isExternal
            href={acc.url}
            aria-label={acc.label}
            colorScheme={acc.type}
            icon={acc.icon}
            rounded="md"
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer;
