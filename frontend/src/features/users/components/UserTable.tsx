import { memo, type VFC } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type UserResponse } from '../types/user';

type Props = {
  users: UserResponse[];
  onClickDetail: (user: UserResponse) => void;
};

export const UserTable: VFC<Props> = memo((props) => {
  const { users, onClickDetail } = props;

  console.log(users);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>UserName</Th>
          <Th>管理者権限</Th>
          <Th>作成日</Th>
          <Th>更新日</Th>
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
            <Td>{formatStringDate(user.created_at)}</Td>
            <Td>{formatStringDate(user.updated_at)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
