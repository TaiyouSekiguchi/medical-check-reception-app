/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type InsuredForExport } from '../types/insuredForExport';

export const useGetInsuredsForExport = (): {
  getInsuredsForExport: () => void;
  loading: boolean;
  insuredsForExport: InsuredForExport[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [insuredsForExport, setInsuredsForExport] = useState<
    InsuredForExport[]
  >([]);

  const getInsuredsForExport = useCallback(() => {
    setLoading(true);
    axios
      .get<InsuredForExport[]>(`/insureds/export`)
      .then((res) => {
        setInsuredsForExport(res.data);
      })
      .catch(() => {
        showMessage({
          title: 'エクスポート用被保険者情報の取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getInsuredsForExport, loading, insuredsForExport };
};
