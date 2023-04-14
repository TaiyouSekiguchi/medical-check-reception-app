import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { axios } from '../lib/axios';
import { type User } from '../types/api/user';
import { useLoginUser } from './useLoginUser';
import { useMessage } from './useMessage';

export const useAuth = (): {
  login: (username: string, password: string) => void;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      console.log(username, password);
      console.log(API_URL);

      const data = {
        username,
        password,
      };

      axios
        .post<User>('/login', data)
        .then((res) => {
          if (res.data != null) {
            const isAdmin = true;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: 'ログインしました', status: 'success' });
            navigate('/home');
          } else {
            showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: 'ログインできません', status: 'error' });
          setLoading(false);
        });
    },
    [navigate, setLoading, showMessage, setLoginUser]
  );

  // TODO logout関数を作成する

  return { login, loading };
};
