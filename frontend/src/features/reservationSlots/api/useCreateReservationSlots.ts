/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useMessage } from '../../message/hooks/useMessage';
import {
  type ReservationSlotRequest,
  type ReservationSlotResponse,
} from '../types/reservationSlot';

export const useCreateReservationSlots = (): {
  createReservationSlots: (data: ReservationSlotRequest[]) => Promise<void>;
  loading: boolean;
  reservationSlots: ReservationSlotResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservationSlots, setReservationSlots] = useState<
    ReservationSlotResponse[]
  >([]);

  const createReservationSlots = useCallback(
    async (data: ReservationSlotRequest[]) => {
      setLoading(true);
      try {
        const res = await axios.post<ReservationSlotResponse[]>(
          `/reservation-slots/bulk`,
          data
        );
        setReservationSlots(res.data);
        showMessage({
          title: '予約枠を作成しました',
          status: 'success',
        });
      } catch {
        showMessage({
          title: '予約枠の作成に失敗しました',
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createReservationSlots, loading, reservationSlots };
};
