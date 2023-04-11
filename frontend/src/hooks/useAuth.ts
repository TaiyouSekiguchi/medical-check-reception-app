import { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { type User } from '../types/api/user';

export const useAuth = (): {
  login: (id: string) => void;
  loading: boolean;
} => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data != null) {
            navigate('/home');
          } else {
            alert('ユーザーが見つかりません');
          }
        })
        .catch(() => {
          alert('ログインできません');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, setLoading]
  );

  return { login, loading };
};
