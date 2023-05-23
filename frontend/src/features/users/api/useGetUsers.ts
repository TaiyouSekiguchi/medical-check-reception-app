/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type UserResponse } from '../types/user';

export const useGetUsers = (): {
  getUsers: () => void;
  loading: boolean;
  users: UserResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse[]>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<UserResponse[]>(`/users`)
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
