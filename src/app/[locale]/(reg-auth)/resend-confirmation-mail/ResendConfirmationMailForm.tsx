"use client";

import { resendConfirmationEmail } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ResendConfirmationMailFormSchema,
  type ResendConfirmationMailFormType,
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
import { useRouter } from "next/navigation";

const ResendConfirmationMailForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ResendConfirmationMailFormType>({
    resolver: zodResolver(ResendConfirmationMailFormSchema),
  });

  const toast = useToast();

  const onSubmit = async (data: ResendConfirmationMailFormType) => {
    try {
      await resendConfirmationEmail(data.email);

      toast({
        title: "Check your Email For New Link",
        description: "will redirect in 3 seconds",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/email-confirmation");
        router.refresh();
      }, 3000);
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

export default ResendConfirmationMailForm;
