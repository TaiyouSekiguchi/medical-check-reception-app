import { memo, type VFC } from 'react';
import { type SelectExaminationItemFormData } from 'features/reservation/types/selectExaminationItemFormData';
import { formatStringDate } from 'lib/formatDate';
import { SideHeaderTable } from 'components/table/SideHeaderTable';
import { type InsuredWithReservation } from '../../types/insuredWithReservation';
import { type ReservableSlot } from '../../types/reservableSlot';

type Props = {
  selectedInsured: InsuredWithReservation;
  selectedReservableSlot: ReservableSlot;
  examinationItem: SelectExaminationItemFormData;
};

export const CheckReservationTable: VFC<Props> = memo((props) => {
  const { selectedInsured, selectedReservableSlot, examinationItem } = props;

  const titles = [
    '被保険者番号',
    '氏名',
    '生年月日',
    '性別',
    '住所',
    '検査日',
    '検査項目',
  ];

  let stringExaminationItem: string;
  stringExaminationItem = '基本検査';
  if (examinationItem.IsGastrointestinalEndoscopyChecked) {
    stringExaminationItem += ', 胃カメラ検査';
  }
  if (examinationItem.IsBariumChecked) {
    stringExaminationItem += ', バリウム検査';
  }
  if (examinationItem.IsBreastCancerScreeningChecked) {
    stringExaminationItem += ', 乳がん検査';
  }
  if (examinationItem.IsProstateCancerScreeningChecked) {
    stringExaminationItem += ', 前立腺がん検査';
  }

  const contents = [
    String(selectedInsured.number),
    `${selectedInsured.last_name} ${selectedInsured.first_name}`,
    formatStringDate(selectedInsured.birthday),
    selectedInsured.sex_alias,
    selectedInsured.address,
    formatStringDate(selectedReservableSlot.date),
    stringExaminationItem,
  ];

  return <SideHeaderTable titles={titles} contents={contents} />;
});
