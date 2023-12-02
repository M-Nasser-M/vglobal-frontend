"use client";

import type { HomeAndSeoType } from "@/utils/types/homeTypes";
import { BsInfoCircleFill } from "react-icons/bs";
import immigrate from "/public/immigrate.png";
import { useRouter } from "next/navigation";
import study from "/public/study.png";
import visit from "/public/visit.png";
import Image from "next/image";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import type { homeTranslations } from "../../../messages/messagesKeys";
import type { Locale } from "@/i18n";

type Props = {
  params: { locale: Locale };
  HomeAndSeo: HomeAndSeoType;
  translations: homeTranslations;
};

const Home = ({ params: { locale }, HomeAndSeo, translations }: Props) => {
  const router = useRouter();

  return (
    <Stack
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading mb={10} fontWeight={600}>
        <Text fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} as={"span"}>
          Vglobal Immigration Inc.
        </Text>
        <Box as="br" />
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          {translations.subheader1}
        </Text>
      </Heading>
      <Heading fontWeight={600} lineHeight={"110%"}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          {translations.subheader2}
        </Text>
      </Heading>
      <Button
        display="inline-block"
        colorScheme="red"
        variant="solid"
        size="lg"
        mb={5}
        onClick={() => {
          router.push(`/${locale}/signup`);
        }}
      >
        {translations.register}
      </Button>
      <Heading fontWeight={600} lineHeight={"110%"}>
        <Text
          color="blue.500"
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          as={"span"}
        >
          {translations.why}
        </Text>
      </Heading>
      <Stack mb={10} direction="row">
        {HomeAndSeo.data.labelandtooltip?.map((item, index) => (
          <HStack key={index}>
            <Badge fontSize="xl" variant="outline" colorScheme="blue">
              <Text color="default-text" as="span">
                {item.label}
              </Text>
              <Tooltip label={item.tooltip} aria-label="A tooltip">
                <Box as="span">
                  <Icon
                    ml={1}
                    color="default-text"
                    display="inline-block"
                    aria-label="A tooltip"
                    as={BsInfoCircleFill}
                  />
                </Box>
              </Tooltip>
            </Badge>
          </HStack>
        ))}
      </Stack>
      <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          {translations.services}
        </Text>
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={immigrate} alt="Immigrate" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              {translations.immigrate}
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.immigrate}
          </Text>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={visit} alt="visit" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              {translations.visit}
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.visit}
          </Text>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={study} alt="study" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              {translations.study}
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.study}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
