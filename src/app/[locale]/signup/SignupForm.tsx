"use client";
import { type SignupFormType, signupFormSchema } from "@/utils/types/authTypes";
import { registerUsingEmail } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import type { signupformTranslations } from "../../../../messages/messagesKeys";

type Props = { translations: signupformTranslations };
const SignupForm = ({ translations }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({ resolver: zodResolver(signupFormSchema) });
  const router = useRouter();

  const onSubmit = async (data: SignupFormType) => {
    const res = await registerUsingEmail(data);
    if (res?.user) router.push("/signin");
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
        <FormControl isInvalid={Boolean(errors.firstName)}>
          <FormLabel htmlFor="firstName">{translations.firstName}</FormLabel>
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
          <FormLabel htmlFor="lastName">{translations.lastName}</FormLabel>
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
          <FormLabel htmlFor="dateOfBirth">
            {translations.dateOfBirth}
          </FormLabel>
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
          <FormLabel htmlFor="email">{translations.email}</FormLabel>
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
          <FormLabel htmlFor="password">{translations.password}</FormLabel>
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
          <FormLabel htmlFor="confirmPassword">
            {translations.confirmPassword}
          </FormLabel>
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
          colorScheme="red"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          {translations.signup}
        </Button>
      </Box>
    </Container>
  );
};

export default SignupForm;
