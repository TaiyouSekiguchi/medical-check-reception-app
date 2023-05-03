import { memo, useCallback, useEffect, type VFC } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useGetUsers } from './api/useGetUsers';
import { CreateUserModal } from './components/CreateUserModal';

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getUsers, loading, users } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClickCreate = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const onClickDetail = useCallback(() => {
    alert('詳細を表示します');
  }, []);

  const rendering = useCallback(() => {
    getUsers();
  }, [getUsers]);

  return (
    <ContentLayout title="ユーザー管理">
      <PrimaryButton onClick={onClickCreate}>ユーザー新規作成</PrimaryButton>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Name</Th>
                <Th>admin</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr
                  key={user.id}
                  _hover={{ bg: 'gray.300' }}
                  onClick={onClickDetail}
                >
                  <Td>{user.id}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.is_admin ? '○' : '―'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        users={users}
        rendering={rendering}
      />
    </ContentLayout>
  );
});
