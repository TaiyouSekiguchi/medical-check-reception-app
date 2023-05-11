import { memo, type VFC } from 'react';
import { Flex, Table, Tr, Th, Td } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type InsuredWithReservation } from '../types/insuredWithReservation';

type Props = {
  selectedInsured: InsuredWithReservation;
};

export const ReservationStatusTable: VFC<Props> = memo((props) => {
  const { selectedInsured } = props;

  return (
    <Table size="md">
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
      {selectedInsured.is_reserved ? (
        <>
          <Tr>
            <Th>検査日</Th>
            <Td>{formatStringDate(selectedInsured.reservation_date)}</Td>
          </Tr>
          <Tr>
            <Th>検査項目</Th>
            <Td>
              <Flex>
                {selectedInsured.examination_items.map(
                  (examinationItem, index) => (
                    <div key={index}>
                      {examinationItem}
                      {index !== selectedInsured.examination_items.length - 1 &&
                        ', '}
                    </div>
                  )
                )}
              </Flex>
            </Td>
          </Tr>
        </>
      ) : (
        <Tr>
          <Th>予約状況</Th>
          <Td>予約なし</Td>
        </Tr>
      )}
    </Table>
  );
});
