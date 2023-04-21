import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../lib/axios';
import { type User } from '../../../types/api/user';
import { useMessage } from '../../message/hooks/useMessage';
import { useLoginUser } from '../hooks/useLoginUser';

export const useAuth = (): {
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (username: string, password: string) => {
      setLoading(true);

      const data = {
        username,
        password,
      };

      axios
        .post<User>('/login', data)
        .then((res) => {
          if (res.data != null) {
            // TODO 今後管理者機能を実装するために、暫定的にisAdminをtrueにしている
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

  const logout = useCallback(() => {
    setLoading(true);
    axios
      .post('/logout')
      .then(() => {
        setLoginUser(null);
        showMessage({ title: 'ログアウトしました', status: 'success' });
        navigate('/');
      })
      .catch(() => {
        showMessage({ title: 'ログアウトできません', status: 'error' });
        setLoading(false);
      });
  }, [navigate, setLoading, showMessage, setLoginUser]);

  return { login, logout, loading };
};
