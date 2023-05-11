/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { type ReservationSlot } from 'features/reservationSlots/types/reservationSlot';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';

export const useReservationSlotsWithReservation = (): {
  getReservationSlotsWithReservation: () => void;
  loading: boolean;
  reservationSlotsWithReservation: ReservationSlot[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservationSlotsWithReservation, setReservationSlotsWithReservation] =
    useState<ReservationSlot[]>([]);

  const getReservationSlotsWithReservation = useCallback(() => {
    setLoading(true);
    axios
      .get<ReservationSlot[]>(`/reservation-slots/examination-items`)
      .then((res) => {
        setReservationSlotsWithReservation(res.data);
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
    getReservationSlotsWithReservation,
    loading,
    reservationSlotsWithReservation,
  };
};
