import { type VFC, memo, useState, type ChangeEvent } from 'react';
import { Stack, Box, Divider, Flex, Heading, Input } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const [username, setUsername] = useState('');
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState('');
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    login(username, password);
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          人間ドック受付アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="Username"
            value={username}
            onChange={onChangeUserName}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <PrimaryButton
            disabled={username === '' || password === '' || loading}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
