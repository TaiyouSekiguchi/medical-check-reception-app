import { useRef, memo, type VFC, useCallback } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
} from '@chakra-ui/react';
import { useMessage } from 'features/message/hooks/useMessage';
import { useDeleteUser } from '../api/useDeleteUser';
import { type UserResponse } from '../types/user';
import { SelectedUserCard } from './SelectedUserCard';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserResponse | null;
  getUsers: () => void;
};

export const DeleteUserDialog: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user, getUsers } = props;

  const { deleteUser } = useDeleteUser();
  const { showMessage } = useMessage();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClickDelete = useCallback(async () => {
    if (user?.id != null) {
      await deleteUser(user.id);
      getUsers();
    } else {
      showMessage({
        title: 'ユーザー情報がありません',
        status: 'error',
      });
    }
    console.log('delete');
    onClose();
  }, [user, deleteUser, getUsers, onClose, showMessage]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ユーザーの削除 ⛔️
            </AlertDialogHeader>
            <Box mx="24px" my="8px">
              <SelectedUserCard user={user} />
            </Box>
            <AlertDialogBody>
              このユーザーを削除しますか？
              <br />
              この操作は取り消せません。
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={onClickDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
});
