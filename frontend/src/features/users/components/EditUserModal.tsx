import { memo, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMessage } from 'features/message/hooks/useMessage';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { useUpdateUser } from '../api/useUpdateUser';
import { type UserResponse, type UserRequest } from '../types/user';
import { userFormValidateScheme } from '../validator/userFromValidateScheme';
import { SelectedUserCard } from './SelectedUserCard';
import { UserForm } from './UserForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserResponse | null;
  getUsers: () => void;
};

export const EditUserModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user, getUsers } = props;
  const { showMessage } = useMessage();
  const { updateUser, loading } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserRequest>({
    defaultValues: {
      username: '',
      password: '',
      is_admin: false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(userFormValidateScheme),
  });

  const onSubmit = async (data: UserRequest) => {
    if (user?.id != null) {
      await updateUser(user.id, data);
      getUsers();
      setValue('username', '');
      setValue('password', '');
      setValue('is_admin', false);
    } else {
      showMessage({
        title: 'ユーザー情報がありません',
        status: 'error',
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザー情報編集</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <SelectedUserCard user={user} />
            <UserForm register={register} errors={errors} />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              更新
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
