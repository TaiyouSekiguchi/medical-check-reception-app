import { memo, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { useDeleteUser } from '../api/useDeleteUser';
import { useUpdateUser } from '../api/useUpdateUser';
import { type User, type UserRequest } from '../types/user';
import { createUserFormValidateScheme } from '../validator/createUserFromValidateScheme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};

type FormInputs = {
  username: string;
  password: string;
  is_admin: boolean;
};

export const EditUserInfoModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user } = props;

  const { updateUser, loading } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setValue,
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {
      username: user?.username != null ? user.username : '',
      password: '',
      is_admin: user?.is_admin != null ? user.is_admin : false,
    },
    mode: 'onChange',
    resolver: yupResolver(createUserFormValidateScheme),
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const newUser: UserRequest = {
      username: data.username,
      password: data.password,
      is_admin: data.is_admin,
    };
    await updateUser(user?.id != null ? user.id : 0, newUser);

    setValue('username', '');
    setValue('password', '');
    setValue('is_admin', false);
    onClose();
  };

  const onClickDelete = () => {
    deleteUser(user?.id != null ? user.id : 0);
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
            <FormControl isInvalid={errors.username != null}>
              <FormLabel htmlFor="username">username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="新しいユーザー名を入力してください"
                {...register('username')}
              />
              <FormErrorMessage fontSize="xs">
                errorが起きてますぜ
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password != null}>
              <FormLabel htmlFor="password">password</FormLabel>
              <Input
                type="text"
                id="password"
                placeholder="新しいパスワードを入力してください"
                {...register('password')}
              />
              <FormErrorMessage fontSize="xs">
                errorが起きてますぜ
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.is_admin != null}>
              <FormLabel htmlFor="is_admin">admin</FormLabel>
              <input
                type="checkbox"
                id="is_admin"
                // placeholder="パスワードを入力してください"
                {...register('is_admin')}
              />
              <FormErrorMessage fontSize="xs">
                errorが起きてますぜ
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="teal.400"
              color="white"
              type="submit"
              isLoading={loading}
              isDisabled={
                loading ||
                !isDirty ||
                !isValid ||
                (getValues('username') === '' && getValues('password') === '')
              }
            >
              更新
            </Button>
            <PrimaryButton onClick={onClickDelete}>削除</PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
