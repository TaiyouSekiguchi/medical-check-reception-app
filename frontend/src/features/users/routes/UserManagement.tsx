import { memo, useState, useCallback, useEffect, type VFC } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useGetUsers } from '../api/useGetUsers';
import { CreateUserModal } from '../components/CreateUserModal';
import { DeleteUserDialog } from '../components/DeleteUserDialog';
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

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
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

  const onClickDeleteIcon = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      user: UserResponse
    ) => {
      event.stopPropagation();
      setSelectedUser(user);
      onOpenDelete();
    },
    [onOpenDelete]
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
          <UserTable
            users={users}
            onClickUser={onClickUser}
            onClickDeleteIcon={onClickDeleteIcon}
          />
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
        getUsers={getUsers}
      />
      <DeleteUserDialog
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        user={selectedUser}
        getUsers={getUsers}
      />
    </ContentLayout>
  );
});
