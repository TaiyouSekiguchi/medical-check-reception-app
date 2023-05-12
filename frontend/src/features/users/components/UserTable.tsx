import { memo, type VFC } from 'react';
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { DeleteIconButton } from 'components/iconButtons/DeleteIconButton';
import { useDeleteUser } from '../api/useDeleteUser';
import { type UserResponse } from '../types/user';

type Props = {
  users: UserResponse[];
  onClick: (user: UserResponse) => void;
};

const HoverableTr = chakra(Tr, {
  baseStyle: {
    _hover: {
      bg: 'gray.300',
      '> td:last-child': {
        opacity: 1,
      },
    },
  },
});

export const UserTable: VFC<Props> = memo((props) => {
  const { users, onClick } = props;
  const { deleteUser } = useDeleteUser();

  const onClickDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: UserResponse
  ) => {
    event.stopPropagation();
    deleteUser(user.id);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>UserName</Th>
          <Th>管理者権限</Th>
          <Th>作成日</Th>
          <Th>更新日</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <HoverableTr
            key={user.id}
            onClick={() => {
              onClick(user);
            }}
          >
            <Td>{user.id}</Td>
            <Td>{user.username}</Td>
            <Td>{user.is_admin ? '○' : '―'}</Td>
            <Td>{formatStringDate(user.created_at)}</Td>
            <Td>{formatStringDate(user.updated_at)}</Td>
            <Td opacity={0}>
              <DeleteIconButton onClick={onClickDelete} user={user} />
            </Td>
          </HoverableTr>
        ))}
      </Tbody>
    </Table>
  );
});
