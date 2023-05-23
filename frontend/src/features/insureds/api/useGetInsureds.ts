/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type InsuredResponse } from '../types/insured';

export const useGetInsureds = (): {
  getInsureds: () => void;
  loading: boolean;
  insureds: InsuredResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const [insureds, setInsureds] = useState<InsuredResponse[]>([]);

  const getInsureds = useCallback(() => {
    setLoading(true);
    axios
      .get<InsuredResponse[]>(`/insureds`)
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
