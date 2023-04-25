/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { axios } from 'lib/axios';
import { type Insured } from '../../../types/api/insured';
import { useMessage } from '../../message/hooks/useMessage';
import { type FormInputs } from '../types/formInputs';

export const useInsuredsWithReservation = (): {
  getInsuredsWithReservation: (data: FormInputs) => void;
  loading: boolean;
  insuredsWithReservation: Insured[];
} => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [insuredsWithReservation, setInsuredsWithReservation] = useState<
    Insured[]
  >([]);

  const getInsuredsWithReservation = useCallback((data: FormInputs) => {
    setLoading(true);
    axios
      .get<Insured[]>(
        `/insureds/reservation?first_name_kana=${data.firstNameKana}&last_name_kana=${data.lastNameKana}&birthday=${data.birthday}`
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
  }, []);

  return { getInsuredsWithReservation, loading, insuredsWithReservation };
};
