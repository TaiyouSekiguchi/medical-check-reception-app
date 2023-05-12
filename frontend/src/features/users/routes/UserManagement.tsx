import { memo, useState, useCallback, useEffect, type VFC } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useGetUsers } from '../api/useGetUsers';
import { CreateUserModal } from '../components/CreateUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { UserTable } from '../components/UserTable';
import { type UserResponse } from '../types/user';

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

  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClickCreate = useCallback(() => {
    onOpenCreate();
  }, [onOpenCreate]);

  const onClickUser = useCallback(
    (user: UserResponse) => {
      setSelectedUser(user);
      onOpenEdit();
    },
    [onOpenEdit]
  );

  return (
    <ContentLayout title="ユーザー管理">
      <Flex justify="flex-end" mb="16px">
        <PrimaryButton onClick={onClickCreate}>ユーザー新規作成</PrimaryButton>
      </Flex>
      {loading ? (
        <CenterSpinner />
      ) : (
        <BorderedBox p="24px">
          <UserTable users={users} onClick={onClickUser} />
        </BorderedBox>
      )}
      <CreateUserModal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        getUsers={getUsers}
      />
      <EditUserModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        user={selectedUser}
      />
    </ContentLayout>
  );
});
