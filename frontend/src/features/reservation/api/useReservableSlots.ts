/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type ReservableSlot } from '../types/reservableSlot';

export const useReservableSlots = (): {
  getReservableSlots: () => void;
  loading: boolean;
  reservableSlots: ReservableSlot[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservableSlots, setReservableSlots] = useState<ReservableSlot[]>([]);

  const getReservableSlots = useCallback(() => {
    setLoading(true);
    axios
      .get<ReservableSlot[]>(`/reservation-slots/reservable`)
      .then((res) => {
        setReservableSlots(res.data);
      })
      .catch(() => {
        showMessage({
          title: '予約枠情報の取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    getReservableSlots,
    loading,
    reservableSlots,
  };
};
