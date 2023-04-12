import { useCallback, useState } from 'react';

import { type User } from '../types/api/user';

type Props = {
  id: number;
  users: User[];
  onOpen: () => void;
};

export const useSelectUser = (): {
  onSelectUser: (props: Props) => void;
  selectedUser: User | null;
} => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);

    if (targetUser != null) {
      setSelectedUser(targetUser);
      onOpen();
    }
  }, []);

  return { onSelectUser, selectedUser };
};
