/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { type Insured } from '../../../types/api/insured';
import { useMessage } from '../../message/hooks/useMessage';

export const useAllInsureds = (): {
  getInsureds: () => void;
  loading: boolean;
  insureds: Insured[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [insureds, setInsureds] = useState<Insured[]>([]);

  const getInsureds = useCallback(() => {
    setLoading(true);
    axios
      .get<Insured[]>(`/insureds`)
      .then((res) => {
        setInsureds(res.data);
      })
      .catch(() => {
        showMessage({
          title: '被保険者情報の取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getInsureds, loading, insureds };
};
