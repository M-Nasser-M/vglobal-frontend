"use client";
import { SignupFormType, signupFormSchema } from "@/utils/types/authTypes";
import { registerUsingEmail } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const SignupForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({ resolver: zodResolver(signupFormSchema) });

  const onSubmit = async (data: SignupFormType) => {
    const res = await registerUsingEmail(data);
    if (res?.user) redirect("/signin");
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
        <FormControl isInvalid={Boolean(errors.firstName)}>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input
            id="firstName"
            placeholder="firstName"
            {...register("firstName")}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.lastName)}>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input
            id="lastName"
            placeholder="lastName"
            {...register("lastName")}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.dateOfBirth)}>
          <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="Select your date of birth"
            {...register("dateOfBirth", {
              required: "This is required",
              valueAsDate: true,
            })}
          />
          <FormErrorMessage>
            {errors.dateOfBirth && errors.dateOfBirth.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)}>
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
        <Button
          colorScheme="green"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          Sign up
        </Button>
      </Box>
    </Container>
  );
};

export default SignupForm;
