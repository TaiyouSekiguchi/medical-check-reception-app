import { memo, useCallback, useEffect, useState, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatStringDate } from 'lib/formatDate';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';
import { examinationItemCheckboxScheme } from '../validator/examinationItemCheckboxScheme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
  selectedReservableSlot: ReservableSlot | null;
};

type ExamItem = {
  id:
    | 'IsGastrointestinalEndoscopyChecked'
    | 'IsBariumChecked'
    | 'IsBreastCancerScreeningChecked'
    | 'IsProstateCancerScreeningChecked';
  name: string;
  checked: boolean;
  disabled: boolean;
  isReservable: boolean;
};

type SubmitData = {
  IsGastrointestinalEndoscopyChecked: boolean;
  IsBariumChecked: boolean;
  IsBreastCancerScreeningChecked: boolean;
  IsProstateCancerScreeningChecked: boolean;
};

export const SelectExaminationItemModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured, selectedReservableSlot } = props;

  const [examItems, setExamItems] = useState<ExamItem[]>([]);

  useEffect(() => {
    setExamItems([
      {
        id: 'IsGastrointestinalEndoscopyChecked',
        name: '胃カメラ検査',
        checked: false,
        disabled: false,
        isReservable:
          selectedReservableSlot?.is_gastrointestinal_endoscopy_reservable !=
            null &&
          selectedReservableSlot?.is_gastrointestinal_endoscopy_reservable,
      },
      {
        id: 'IsBariumChecked',
        name: 'バリウム検査',
        checked: false,
        disabled: false,
        isReservable:
          selectedReservableSlot?.is_barium_reservable != null &&
          selectedReservableSlot?.is_barium_reservable,
      },
      {
        id: 'IsBreastCancerScreeningChecked',
        name: '乳がん検査',
        checked: false,
        disabled: false,
        isReservable:
          selectedInsured?.sex_alias != null &&
          selectedInsured.sex_alias === '女' &&
          selectedReservableSlot?.is_breast_cancer_screening_reservable !=
            null &&
          selectedReservableSlot?.is_breast_cancer_screening_reservable,
      },
      {
        id: 'IsProstateCancerScreeningChecked',
        name: '前立腺がん検査',
        checked: false,
        disabled: false,
        isReservable:
          selectedInsured?.sex_alias != null &&
          selectedInsured?.sex_alias === '男',
      },
    ]);
  }, [selectedReservableSlot, selectedInsured]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm<SubmitData>({
    mode: 'onChange',
    resolver: yupResolver(examinationItemCheckboxScheme),
  });

  // const navigate = useNavigate();

  // const onClickCheckReservation = useCallback(() => {
  //   navigate('/home/reservation_management/check');
  // }, [navigate]);

  const onSubmit: SubmitHandler<SubmitData> = useCallback(
    (data: SubmitData) => {
      console.log(data);
    },
    []
  );

  const handleReset = useCallback(() => {
    examItems.forEach((item) => {
      setValue(item.id, false);
    });
  }, [examItems, setValue]);

  const onCloseModal = useCallback(() => {
    handleReset();
    onClose();
  }, [handleReset, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>検査項目選択</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)} name="checkbox">
          <ModalBody>
            <HStack>
              <Text>
                受診日:
                {selectedReservableSlot?.date != null &&
                  formatStringDate(selectedReservableSlot?.date)}
              </Text>
            </HStack>
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
      </ModalContent>
    </Modal>
  );
});
