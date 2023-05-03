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
import { useCreateUser } from '../api/useCreateUser';
import { type User, type UserRequest } from '../types/user';
import { createUserFormValidateScheme } from '../validator/createUserFromValidateScheme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  rendering: () => void;
};

type FormInputs = {
  username: string;
  password: string;
  is_admin: boolean;
};

export const CreateUserModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, rendering } = props;

  const { createUser, loading } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setValue,
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {},
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
    await createUser(newUser);
    rendering();

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
            <FormControl isInvalid={errors.username != null}>
              <FormLabel htmlFor="username">username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="ユーザー名を入力してください"
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
                placeholder="パスワードを入力してください"
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
              position="absolute"
              bottom={4}
            >
              検索
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
