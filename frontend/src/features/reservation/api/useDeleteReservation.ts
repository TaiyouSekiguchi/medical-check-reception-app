/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../message/hooks/useMessage';

export const useDeleteReservations = (): {
  deleteReservations: (insuredId: number) => void;
  loading: boolean;
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteReservations = useCallback((insuredId: number) => {
    setLoading(true);
    axios
      .delete(`/reservations/${insuredId}`)
      .then(() => {
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: true,
            action: '予約削除',
          },
        });
      })
      .catch(() => {
        navigate('/home/reservation_management/result', {
          state: {
            isSuccess: false,
            action: '予約削除',
          },
        });
        showMessage({
          title: '予約情報の削除に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { deleteReservations, loading };
};
