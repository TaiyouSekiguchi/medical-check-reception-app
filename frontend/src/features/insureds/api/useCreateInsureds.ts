/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type InsuredRequest, type InsuredResponse } from '../types/insured';

export const useCreateInsureds = (): {
  createInsureds: (data: InsuredRequest[]) => Promise<void>;
  loading: boolean;
  insureds: InsuredResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [insureds, setInsureds] = useState<InsuredResponse[]>([]);

  const createInsureds = useCallback(async (data: InsuredRequest[]) => {
    setLoading(true);
    try {
      const res = await axios.post<InsuredResponse[]>(`/insureds/bulk`, data);
      setInsureds(res.data);
      showMessage({
        title: '被保険者を作成しました',
        status: 'success',
      });
    } catch {
      showMessage({
        title: '被保険者の作成に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { createInsureds, loading, insureds };
};
