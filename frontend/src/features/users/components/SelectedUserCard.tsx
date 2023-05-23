import { memo, type VFC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { type UserResponse } from '../types/user';

type Props = {
  user: UserResponse | null;
};

export const SelectedUserCard: VFC<Props> = memo((props) => {
  const { user } = props;

  return (
    <>
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
            {user?.is_admin != null && user.is_admin ? 'あり 🐜' : 'なし 🍐'}
          </Text>
        </Flex>
      </BorderedBox>
    </>
  );
});
