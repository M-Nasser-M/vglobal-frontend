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
import { useTranslations } from "next-intl";
import Link from "@/components/Link";
import { navlinksKeys } from "../../../messages/messagesKeys";

type Props = {
  lang: string;
  permenantImmigrationPrograms: PermenantImmigrationPages | undefined;
};

const MobileNavlinks = ({ permenantImmigrationPrograms }: Props) => {
  const t = useTranslations("navlinks");

  return navlinksKeys.map((navLink, index) => (
    <Box as={"nav"} key={index}>
      {navLink !== "permenant-immigration" && (
        <Link href={`/${navLink}`}>{t(navLink)}</Link>
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
