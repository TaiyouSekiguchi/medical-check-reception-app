/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { formatStringDate } from 'lib/formatDate';
import { useMessage } from '../../message/hooks/useMessage';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type SearchInsuredFormData } from '../types/searchInsuredFormData';

export const useInsuredsWithReservation = (): {
  getInsuredsWithReservation: (data: SearchInsuredFormData) => void;
  loading: boolean;
  insuredsWithReservation: InsuredWithReservation[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [insuredsWithReservation, setInsuredsWithReservation] = useState<
    InsuredWithReservation[]
  >([]);

  const getInsuredsWithReservation = useCallback(
    (data: SearchInsuredFormData) => {
      setLoading(true);
      axios
        .get<InsuredWithReservation[]>(
          `/insureds/reservation?first_name_kana=${
            data.firstName
          }&last_name_kana=${data.lastName}&birthday=${formatStringDate(
            data.birthday
          )}`
        )
        .then((res) => {
          setInsuredsWithReservation(res.data);
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
    },
    []
  );

  return { getInsuredsWithReservation, loading, insuredsWithReservation };
};
