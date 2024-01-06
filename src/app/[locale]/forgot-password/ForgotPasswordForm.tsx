"use client";

import { forgotPassword } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ForgotPasswordFormSchema,
  ForgotPasswordFormType,
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

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const toast = useToast();

  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      await forgotPassword(data.email);

      toast({
        title: "Check your Email For Reset Link",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" {...register("email")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
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

export default ForgotPasswordForm;
