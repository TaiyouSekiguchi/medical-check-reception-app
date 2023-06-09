import { memo, useCallback, type VFC } from 'react';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import { useAuth } from 'features/auth/api/useAuth';
import { useLoginUser } from 'features/auth/hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';

export const Header: VFC = memo(() => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { loginUser } = useLoginUser();

  const onClickHome = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const onClickInsuredList = useCallback(() => {
    navigate('/home/insureds');
  }, [navigate]);
  const onClickReservationSlotList = useCallback(() => {
    navigate('/home/reservation_slots');
  }, [navigate]);
  const onClickReservationManagement = useCallback(() => {
    navigate('/home/reservation_management');
  }, [navigate]);
  const onClickUserManagement = useCallback(() => {
    navigate('/home/user_management');
  }, [navigate]);
  const onClickDataExport = useCallback(() => {
    navigate('/home/data_export');
  }, [navigate]);
  const onClickLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            人間ドック受付アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: 'none', md: 'flex' }}
        >
          <Box pr={4}>
            <Link onClick={onClickInsuredList}>被保険者一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickReservationSlotList}>予約枠一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickReservationManagement}>予約管理</Link>
          </Box>
          {loginUser?.is_admin != null && loginUser.is_admin && (
            <>
              <Box pr={4}>
                <Link onClick={onClickUserManagement}>ユーザー管理</Link>
              </Box>
              <Box pr={4}>
                <Link onClick={onClickDataExport}>エクスポート</Link>
              </Box>
            </>
          )}
          <Box pr={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
});
