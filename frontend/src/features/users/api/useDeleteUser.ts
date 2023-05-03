/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';

export const useDeleteUser = (): {
  deleteUser: (userId: number) => void;
  loading: boolean;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const deleteUser = useCallback((userId: number) => {
    setLoading(true);
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        showMessage({
          title: 'ユーザー削除に成功しました',
          status: 'success',
        });
      })
      .catch(() => {
        showMessage({
          title: 'ユーザー削除に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    deleteUser,
    loading,
  };
};
