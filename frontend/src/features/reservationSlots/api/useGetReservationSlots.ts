/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import { type ReservationSlotResponse } from '../types/reservationSlot';

export const useGetReservationSlots = (): {
  getReservationSlots: () => void;
  loading: boolean;
  reservationSlots: ReservationSlotResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);
  const [reservationSlots, setReservationSlots] = useState<
    ReservationSlotResponse[]
  >([]);

  const getReservationSlots = useCallback(() => {
    setLoading(true);
    axios
      .get<ReservationSlotResponse[]>(`/reservation-slots`)
      .then((res) => {
        setReservationSlots(res.data);
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

  return { getReservationSlots, loading, reservationSlots };
};
