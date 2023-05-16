import { memo, useCallback, useEffect, useState, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { type ExamItemInfo } from '../types/examItemInfo';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';
import { type SelectExaminationItemFormData } from '../types/selectExaminationItemFormData';
import { examinationItemCheckboxScheme } from '../validator/examinationItemCheckboxScheme';
import { SelectExaminationItemForm } from './SelectExaminationItemForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
  selectedReservableSlot: ReservableSlot | null;
};

export const ReservableSlotModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured, selectedReservableSlot } = props;

  const [examItems, setExamItems] = useState<ExamItemInfo[]>([]);

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
          selectedReservableSlot.is_gastrointestinal_endoscopy_reservable,
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
  } = useForm<SelectExaminationItemFormData>({
    defaultValues: {
      IsGastrointestinalEndoscopyChecked: false,
      IsBariumChecked: false,
      IsBreastCancerScreeningChecked: false,
      IsProstateCancerScreeningChecked: false,
    },
    mode: 'onChange',
    resolver: yupResolver(examinationItemCheckboxScheme),
  });

  const onCloseModal = useCallback(() => {
    examItems.forEach((item) => {
      setValue(item.id, false);
    });
    onClose();
  }, [onClose, examItems, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>検査項目選択</ModalHeader>
        <ModalCloseButton />
        <SelectExaminationItemForm
          selectedInsured={selectedInsured}
          selectedReservableSlot={selectedReservableSlot}
          examItems={examItems}
          register={register}
          handleSubmit={handleSubmit}
          getValues={getValues}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </ModalContent>
    </Modal>
  );
});
