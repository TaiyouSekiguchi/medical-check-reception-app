/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type User } from '../types/user';

export const useGetUsers = (): {
  getUsers: () => void;
  loading: boolean;
  users: User[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<User[]>(`/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        showMessage({
          title: 'ユーザー情報の取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    getUsers,
    loading,
    users,
  };
};
