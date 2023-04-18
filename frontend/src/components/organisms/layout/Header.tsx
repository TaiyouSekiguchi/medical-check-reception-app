import { memo, useCallback, type VFC } from 'react';
import { Box, Flex, Link, Heading, useDisclosure } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { MenuDrawer } from 'components/molecules/MenuDrawer';

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickHome = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const onClickInsuredList = useCallback(() => {
    navigate('/home/insured_list');
  }, [navigate]);
  const onClickReservationSlotList = useCallback(() => {
    navigate('/home/reservation_slot_list');
  }, [navigate]);
  const onClickReservationManagement = useCallback(() => {
    navigate('/home/reservation_management');
  }, [navigate]);
  const onClickUserManagement = useCallback(() => {
    navigate('/home/user_management');
  }, [navigate]);
  const onClickSetting = useCallback(() => {
    navigate('/home/setting');
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
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>

        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
});
