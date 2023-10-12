"use client";

import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { navlinksKeys } from "../../../messages/messagesKeys";

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined;
};

const MobileNavlinks = ({ lang, permenantImmigrationPrograms }: Props) => {
  const t = useTranslations("navlinks");

  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink !== "permenant-immigration" && (
        <Link as={NextLink} textAlign={"center"} href={`/${lang}/${navLink}`}>
          {t(navLink)}
        </Link>
      )}

      {navLink === "permenant-immigration" &&
        permenantImmigrationPrograms &&
        permenantImmigrationPrograms.data.length > 0 && (
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" w="full">
                  {t(navLink)}
                  <AccordionIcon />
                </Box>
              </AccordionButton>

              <AccordionPanel>
                <VStack>
                  {permenantImmigrationPrograms?.data.map((item) => (
                    <Link
                      key={item.id}
                      as={NextLink}
                      pl="2"
                      textAlign={"center"}
                      href={`/permenant-immigration/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
    </Box>
  ));
};

export default MobileNavlinks;
