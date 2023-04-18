import { type VFC, memo, useState, type ChangeEvent } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Heading,
  Divider,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
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

  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const handleClick = () => {
    setIsRevealPassword(!isRevealPassword);
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
          <InputGroup size="md">
            <Input
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              type={isRevealPassword ? 'text' : 'password'}
              name="password"
            />
            <InputRightElement width="3rem">
              <IconButton
                aria-label="eye"
                icon={isRevealPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleClick}
                bg="rgba(0,0,0,0,0)"
                size="lg"
                color="gray.500"
                _hover={{ bg: 'rgba(0,0,0,0,0)' }}
                _active={{ bg: 'rgba(0,0,0,0,0)' }}
              />
            </InputRightElement>
          </InputGroup>
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
