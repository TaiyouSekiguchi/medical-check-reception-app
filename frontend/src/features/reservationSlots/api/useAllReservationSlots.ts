/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { type ReservationSlot } from 'features/reservationSlots/types/reservationSlot';
import { useMessage } from '../../message/hooks/useMessage';

export const useAllReservationSlots = (): {
  getReservationSlots: () => void;
  loading: boolean;
  reservationSlots: ReservationSlot[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservationSlots, setReservationSlots] = useState<ReservationSlot[]>(
    []
  );

  const getReservationSlots = useCallback(() => {
    setLoading(true);
    axios
      .get<ReservationSlot[]>(`/reservation-slots`)
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
