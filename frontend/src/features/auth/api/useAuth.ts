import { useCallback, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type User } from '../../users/types/user';
import { useLoginUser } from '../hooks/useLoginUser';
import { type LoginRequest } from '../types/auth';

export const useAuth = (): {
  login: (data: LoginRequest) => void;
  logout: () => void;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);

  const getJWTPayload = useCallback(
    (
      jwt: string
    ): {
      userID: number;
      username: string;
      admin: boolean;
      exp: string;
    } => {
      const payload = jwtDecode<{
        userID: number;
        username: string;
        admin: boolean;
        exp: string;
      }>(jwt);

      return payload;
    },
    []
  );

  const login = useCallback(
    (data: LoginRequest) => {
      setLoading(true);

      axios
        .post<{ jwt: string }>('/login', data)
        .then((res) => {
          if (res.data != null) {
            const { jwt } = res.data;

            const { admin, userID, username } = getJWTPayload(jwt);

            const user: User = {
              id: userID,
              username,
              is_admin: admin,
            };

            setLoginUser(user);
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
    [navigate, setLoading, showMessage, setLoginUser, getJWTPayload]
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
