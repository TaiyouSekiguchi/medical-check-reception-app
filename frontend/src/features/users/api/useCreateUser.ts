/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type UserRequest, type User } from '../types/user';

export const useCreateUser = (): {
  createUser: (data: UserRequest) => Promise<void>;
  loading: boolean;
  user: User | null;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const createUser = useCallback(async (data: UserRequest) => {
    setLoading(true);
    try {
      const res = await axios.post<User>(`/users`, data);
      setUser(res.data);
      showMessage({
        title: 'ユーザーを新規に作成しました',
        status: 'success',
      });
    } catch {
      showMessage({
        title: '予約情報の登録に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { createUser, loading, user };
};
