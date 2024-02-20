"use client";
import type { commonTranslations } from "../../../../../messages/messagesKeys";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";

type Props = { translations: commonTranslations };

const EmailConfirmed = ({ translations }: Props) => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/signin");
    router.refresh();
  }, 3000);

  return (
    <Flex justify="center" direction="column" gap={4} align="center" mt={48}>
      <Heading as="h1">{translations.emailconfirmed}</Heading>
      <Heading as="h3">{translations.redirect}</Heading>
      <Icon
        boxSize={48}
        color="green"
        fontSize="xx-large"
        as={IoMdCheckmarkCircle}
      />
    </Flex>
  );
};

export default EmailConfirmed;
