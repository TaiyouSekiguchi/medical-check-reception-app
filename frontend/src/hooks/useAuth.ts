import { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type User } from '../types/api/user';
import { useMessage } from './useMessage';

export const useAuth = (): {
  login: (id: string) => void;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data != null) {
            showMessage({ title: 'ログインしました', status: 'success' });
            navigate('/home');
          } else {
            showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
          }
        })
        .catch(() => {
          showMessage({ title: 'ログインできません', status: 'error' });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, setLoading, showMessage]
  );

  return { login, loading };
};
