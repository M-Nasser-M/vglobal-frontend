"use client";
import { resetPassword } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import React from "react";
import {
  PasswordResetFormSchema,
  PasswordResetFormType,
} from "@/utils/types/authTypes";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const PasswordResetForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetFormType>({
    resolver: zodResolver(PasswordResetFormSchema),
  });

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const onSubmit = async (data: PasswordResetFormType) => {
    try {
      const res = await resetPassword(
        data.code,
        data.password,
        data.confirmPassword
      );
      if (res) redirect("/signin");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
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
    >
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl hidden isInvalid={Boolean(errors.code)}>
          <FormLabel htmlFor="code">Code</FormLabel>
          <Input
            id="code"
            isReadOnly
            value={code || ""}
            placeholder="code"
            {...register("code")}
          />
          <FormErrorMessage>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
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

export default PasswordResetForm;
