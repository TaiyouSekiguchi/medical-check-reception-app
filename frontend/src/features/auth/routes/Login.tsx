import { type VFC, memo, useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Divider,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'features/auth/api/useAuth';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ViewIconButton } from 'components/iconButtons/ViewIconButton';
import { type LoginRequest } from '../types/auth';
import { loginFormValidateScheme } from '../validator/loginFormValidateScheme';

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const onClickViewIcon = () => {
    setIsRevealPassword(!isRevealPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(loginFormValidateScheme),
  });

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          人間ドック受付アプリ
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} py={4} px={10}>
            <FormControl isInvalid={errors.username != null}>
              <FormLabel htmlFor="username" hidden />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              <FormErrorMessage fontSize="xs">
                {errors.username?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password != null}>
              <FormLabel htmlFor="password" hidden />
              <InputGroup size="md">
                <Input
                  id="password"
                  type={isRevealPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password')}
                />
                <InputRightElement width="3rem">
                  <ViewIconButton
                    onClick={onClickViewIcon}
                    isRevealPassword={isRevealPassword}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage fontSize="xs">
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>

            <PrimaryButton
              type="submit"
              isDisabled={loading}
              isLoading={loading}
            >
              ログイン
            </PrimaryButton>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
});
