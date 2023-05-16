/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../message/hooks/useMessage';
import {
  type ReservationRequest,
  type ReservationResponse,
} from '../types/reservation';

export const useUpdateReservations = (): {
  updateReservations: (data: ReservationRequest[]) => void;
  loading: boolean;
  reservations: ReservationResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const navigate = useNavigate();

  const updateReservations = useCallback((data: ReservationRequest[]) => {
    setLoading(true);

    axios
      .post<ReservationResponse[]>(`/reservations/update`, data)
      .then((res) => {
        setReservations(res.data);
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: true,
            action: '予約変更',
          },
        });
      })
      .catch(() => {
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: false,
            action: '予約変更',
          },
        });
        showMessage({
          title: '予約情報の変更に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { updateReservations, loading, reservations };
};
