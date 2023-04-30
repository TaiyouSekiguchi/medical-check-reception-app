/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../message/hooks/useMessage';
import {
  type ReservationRequest,
  type ReservationResponse,
} from '../types/reservation';

export const usePostReservations = (): {
  postReservations: (data: ReservationRequest[]) => void;
  loading: boolean;
  reservations: ReservationResponse[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const navigate = useNavigate();

  const postReservations = useCallback((data: ReservationRequest[]) => {
    setLoading(true);

    axios
      .post<ReservationResponse[]>(`/reservations`, data)
      .then((res) => {
        setReservations(res.data);
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: true,
          },
        });
      })
      .catch(() => {
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: false,
          },
        });
        showMessage({
          title: '予約情報の登録に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { postReservations, loading, reservations };
};
