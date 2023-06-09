/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type UserRequest, type UserResponse } from '../types/user';

export const useUpdateUser = (): {
  updateUser: (userId: number, data: UserRequest) => Promise<void>;
  loading: boolean;
  user: UserResponse | null;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  const updateUser = useCallback(async (userId: number, data: UserRequest) => {
    setLoading(true);
    try {
      const res = await axios.put<UserResponse>(`/users/${userId}`, data);
      setUser(res.data);
      showMessage({
        title: 'ユーザー情報を更新しました',
        status: 'success',
      });
    } catch {
      showMessage({
        title: 'ユーザー情報の更新に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateUser, loading, user };
};
