import { memo, useCallback, type VFC } from 'react';
import { ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import {
  type SubmitHandler,
  type UseFormRegister,
  type UseFormHandleSubmit,
  type UseFormGetValues,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type ExamItemInfo } from '../types/examItemInfo';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';
import { type SelectExaminationItemFormData } from '../types/selectExaminationItemFormData';

type Props = {
  selectedInsured: InsuredWithReservation | null;
  selectedReservableSlot: ReservableSlot | null;
  examItems: ExamItemInfo[];
  register: UseFormRegister<SelectExaminationItemFormData>;
  handleSubmit: UseFormHandleSubmit<SelectExaminationItemFormData>;
  getValues: UseFormGetValues<SelectExaminationItemFormData>;
  isValid: boolean;
  isSubmitting: boolean;
};

export const SelectExaminationItemForm: VFC<Props> = memo((props) => {
  const {
    selectedInsured,
    selectedReservableSlot,
    examItems,
    register,
    handleSubmit,
    getValues,
    isValid,
    isSubmitting,
  } = props;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SelectExaminationItemFormData> = useCallback(
    (data: SelectExaminationItemFormData) => {
      const submitData: SelectExaminationItemFormData = {
        ...data,
      };
      navigate('/home/reservation_management/check', {
        state: {
          selectedInsured,
          selectedReservableSlot,
          submitData,
        },
      });
    },
    [navigate, selectedInsured, selectedReservableSlot]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="checkbox">
      <ModalBody>
        <Text>
          受診日:
          {selectedReservableSlot?.date != null &&
            formatStringDate(selectedReservableSlot?.date)}
        </Text>

        <div>
          {examItems.map((item) => {
            return (
              item.isReservable && (
                <div key={item.id}>
                  <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={item.checked}
                    disabled={item.disabled}
                    {...register(item.id)}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              )
            );
          })}
        </div>

        {getValues('IsGastrointestinalEndoscopyChecked') &&
          getValues('IsBariumChecked') && (
            <p>胃カメラ検査とバリウム検査はどちらかを選択して下さい。</p>
          )}
      </ModalBody>
      <ModalFooter>
        <Button type="submit" isDisabled={!isValid || isSubmitting}>
          予約確認
        </Button>
      </ModalFooter>
    </form>
  );
});
