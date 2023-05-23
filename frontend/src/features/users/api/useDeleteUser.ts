/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';

export const useDeleteUser = (): {
  deleteUser: (userId: number) => Promise<void>;
  loading: boolean;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const deleteUser = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      await axios.delete(`/users/${userId}`);
      showMessage({
        title: 'ユーザー削除に成功しました',
        status: 'success',
      });
    } catch {
      showMessage({
        title: 'ユーザー削除に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteUser, loading };
};
