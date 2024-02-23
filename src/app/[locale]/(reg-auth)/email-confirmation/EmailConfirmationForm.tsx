"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { clientENV } from "@/clientENV.mjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "@/components/Link";

import {
  ConfirmationCodeFormSchema,
  type ConfirmationCodeFormType,
} from "@/utils/types/authTypes";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { signinformTranslations } from "../../../../../messages/messagesKeys";

type Props = { translations: signinformTranslations };

const EmailConfirmationCode = ({ translations }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmationCodeFormType>({
    resolver: zodResolver(ConfirmationCodeFormSchema),
  });

  const toast = useToast();

  const onSubmit = async (data: ConfirmationCodeFormType) => {
    try {
      router.push(
        `${clientENV.NEXT_PUBLIC_STRAPI_API_URL}/auth/email-confirmation?confirmation=${data.code}`
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);

      toast({
        title: "An Error Occcured Please Try Again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Container
      display="flex"
      minH="100vh"
      pb={4}
      justifyContent="center"
      alignItems="center"
      maxW="container.sm"
      paddingTop="20"
    >
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="code">Confirmation Code</FormLabel>
          <Input id="code" type="code" {...register("code")} />
          <FormErrorMessage>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>

        <Stack w="100%" direction="row" justify="space-between">
          <Text color="inherit">{translations.credentialserror}</Text>
          <Link href="/resend-confirmation-mail">
            {translations.resendmail}
          </Link>
        </Stack>

        <Button
          colorScheme="red"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EmailConfirmationCode;
