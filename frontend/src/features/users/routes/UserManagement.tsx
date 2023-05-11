import { memo, useState, useCallback, useEffect, type VFC } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useGetUsers } from '../api/useGetUsers';
import { CreateUserModal } from '../components/CreateUserModal';
import { EditUserInfoModal } from '../components/EditUserInfoModal';
import { type User } from '../types/user';

export const UserManagement: VFC = memo(() => {
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const { getUsers, loading, users } = useGetUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClickCreate = useCallback(() => {
    onOpenCreate();
  }, [onOpenCreate]);

  const onClickDetail = useCallback(
    (user: User) => {
      setSelectedUser(user);
      onOpenEdit();
    },
    [onOpenEdit]
  );

  const rendering = useCallback(() => {
    getUsers();
  }, [getUsers]);

  return (
    <ContentLayout title="ユーザー管理">
      <Flex justify="flex-end" mb="16px">
        <PrimaryButton onClick={onClickCreate}>ユーザー新規作成</PrimaryButton>
      </Flex>
      {loading ? (
        <CenterSpinner />
      ) : (
        <BorderedBox p="24px">
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
                  onClick={() => {
                    onClickDetail(user);
                  }}
                >
                  <Td>{user.id}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.is_admin ? '○' : '―'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </BorderedBox>
      )}
      <CreateUserModal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        users={users}
        rendering={rendering}
      />
      <EditUserInfoModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        user={selectedUser}
      />
    </ContentLayout>
  );
});
