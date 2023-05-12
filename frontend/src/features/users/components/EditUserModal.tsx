import { memo, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMessage } from 'features/message/hooks/useMessage';
import { useForm } from 'react-hook-form';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { useUpdateUser } from '../api/useUpdateUser';
import { type UserResponse, type UserRequest } from '../types/user';
import { createUserFormValidateScheme } from '../validator/createUserFromValidateScheme';
import { CreateUserForm } from './CreateUserForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserResponse | null;
};

export const EditUserModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, user } = props;
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
    resolver: yupResolver(createUserFormValidateScheme),
  });

  const onSubmit = async (data: UserRequest) => {
    if (user?.id != null) {
      await updateUser(user.id, data);
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
            <Text fontSize="sm" fontWeight="bold">
              選択中のユーザー
            </Text>
            <BorderedBox borderColor="gray.200" p="16px" m="8px 0px 24px 0px">
              <Flex mb="8px">
                <Text w="160px">ユーザー名</Text>
                <Text>{user?.username}</Text>
              </Flex>
              <Flex>
                <Text w="160px">管理者権限</Text>
                <Text>
                  {user?.is_admin != null && user.is_admin
                    ? 'あり 🐜'
                    : 'なし 🍐'}
                </Text>
              </Flex>
            </BorderedBox>
            <CreateUserForm register={register} errors={errors} />
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
