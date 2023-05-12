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
import { useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { useCreateUser } from '../api/useCreateUser';
import { type UserRequest } from '../types/user';
import { userFormValidateScheme } from '../validator/userFromValidateScheme';
import { UserForm } from './UserForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getUsers: () => void;
};

export const CreateUserModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, getUsers } = props;

  const { createUser, loading } = useCreateUser();

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
    await createUser(data);
    getUsers();
    setValue('username', '');
    setValue('password', '');
    setValue('is_admin', false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザー新規作成</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <UserForm register={register} errors={errors} />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              isLoading={loading}
              isDisabled={loading}
              bottom={4}
            >
              新規作成
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
