"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  SigninFormSchema,
  SigninFormType,
} from "@/utils/types/signinFormTypes";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const SigninForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormType>({ resolver: zodResolver(SigninFormSchema) });

  const onSubmit = async (data: SigninFormType) => {
    try {
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
  return (
    <Container maxW="container.sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
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
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
        <Button
          colorScheme="green"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          Sign in
        </Button>
      </form>
    </Container>
  );
};

export default SigninForm;
