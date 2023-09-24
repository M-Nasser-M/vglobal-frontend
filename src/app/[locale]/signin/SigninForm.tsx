"use client";
import { SigninFormSchema, SigninFormType } from "@/utils/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "@chakra-ui/next-js";
import { signIn } from "next-auth/react";
import React from "react";
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
} from "@chakra-ui/react";

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
    <Container
      display="flex"
      minH="70vh"
      pb={4}
      justifyContent="center"
      alignItems="center"
      maxW="container.sm"
    >
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
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
        <Stack
          mt={4}
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Text>
            Don&apos;t have an account?
            <Link color="green.400" href="/signup">
              {" "}
              Sign up
            </Link>
          </Text>
          <Text>
            <Link color="green.400" href="/forgot-password">
              Forgot Password
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default SigninForm;
