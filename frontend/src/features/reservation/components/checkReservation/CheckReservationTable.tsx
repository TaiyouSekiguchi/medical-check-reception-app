import { memo, type VFC } from 'react';
import { Flex, Table, Tr, Th, Td } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type InsuredWithReservation } from '../../types/insuredWithReservation';
import { type ReservableSlot } from '../../types/reservableSlot';

// TODO どこかで共通化する
type SubmitData = {
  IsGastrointestinalEndoscopyChecked: boolean;
  IsBariumChecked: boolean;
  IsBreastCancerScreeningChecked: boolean;
  IsProstateCancerScreeningChecked: boolean;
};

type Props = {
  selectedInsured: InsuredWithReservation;
  selectedReservableSlot: ReservableSlot;
  submitData: SubmitData;
};

export const CheckReservationTable: VFC<Props> = memo((props) => {
  const { selectedInsured, selectedReservableSlot, submitData } = props;

  // TODO TBody で囲ってエラー解消
  return (
    <Table>
      <Tr>
        <Th>被保険者番号</Th>
        <Td>{selectedInsured.number}</Td>
      </Tr>
      <Tr>
        <Th>氏名</Th>
        <Td>
          {selectedInsured.last_name} {selectedInsured.first_name}
        </Td>
      </Tr>
      <Tr>
        <Th>生年月日</Th>
        <Td>
          {new Date(selectedInsured.birthday).toLocaleDateString('ja-JP')}
        </Td>
      </Tr>
      <Tr>
        <Th>性別</Th>
        <Td>{selectedInsured.sex_alias}</Td>
      </Tr>
      <Tr>
        <Th>住所</Th>
        <Td>{selectedInsured.address}</Td>
      </Tr>
      <Tr>
        <Th>検査日</Th>
        <Td>{formatStringDate(selectedReservableSlot.date)}</Td>
      </Tr>
      <Tr>
        <Th>検査項目</Th>
        <Td>
          <Flex>
            {'基本検査'}
            {submitData.IsGastrointestinalEndoscopyChecked && ', 胃カメラ検査'}
            {submitData.IsBariumChecked && ', バリウム検査'}
            {submitData.IsBreastCancerScreeningChecked && ', 乳がん検査'}
            {submitData.IsProstateCancerScreeningChecked && ', 前立腺がん検査'}
          </Flex>
        </Td>
      </Tr>
    </Table>
  );
});
