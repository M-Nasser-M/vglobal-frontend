"use client";

import { PermenantImmigrationPages } from "@/utils/types/permenantImmigrationPageTypes";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  VStack,
} from "@chakra-ui/react";
import Link from "@/components/Link";
import {
  type commonTranslations,
  type navlinksTranslations,
} from "../../../messages/messagesKeys";

const navlinksKeys = [
  "permenant-immigration",
  "study",
  "visit",
  "assessment",
  "book-consult",
  "about-us",
  "blog",
] as const;

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined | null;
  translations: commonTranslations & navlinksTranslations;
};

const MobileNavlinks = ({
  permenantImmigrationPrograms,
  translations,
}: Props) => {
  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink !== "permenant-immigration" && (
        <Link href={`/${navLink}`}>{translations[navLink]}</Link>
      )}

      {navLink === "permenant-immigration" &&
        permenantImmigrationPrograms &&
        permenantImmigrationPrograms.data.length > 0 && (
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" w="full">
                  {translations[navLink]}
                  <AccordionIcon />
                </Box>
              </AccordionButton>

              <AccordionPanel>
                <VStack>
                  {permenantImmigrationPrograms?.data.map((item) => (
                    <Link
                      key={item.id}
                      pl="2"
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
