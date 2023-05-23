/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type UserRequest, type UserResponse } from '../types/user';

export const useCreateUser = (): {
  createUser: (data: UserRequest) => Promise<void>;
  loading: boolean;
  user: UserResponse | null;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  const createUser = useCallback(async (data: UserRequest) => {
    setLoading(true);
    try {
      const res = await axios.post<UserResponse>(`/users`, data);
      setUser(res.data);
      showMessage({
        title: 'ユーザーの作成に成功しました',
        status: 'success',
      });
    } catch {
      showMessage({
        title: 'ユーザーの作成に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { createUser, loading, user };
};
