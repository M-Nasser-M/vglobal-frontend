"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  useToast,
} from "@chakra-ui/react";
import { clientENV } from "@/clientENV.mjs";
import { clientApi } from "@/utils/services/fetchApiClient";
import { redirect } from "next/navigation";

const EmailConfirmationCode = () => {
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
      //

      clientApi.get(
        `${clientENV.NEXT_PUBLIC_STRAPI_URL}?confirmation=${data.code}`
      );

      toast({
        title: "Email succesfully confirmed",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      redirect("/");
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
