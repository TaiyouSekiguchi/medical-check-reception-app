import { memo, type VFC } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { type ReservableSlot } from '../types/reservableSlot';

type Props = {
  reservableSlots: ReservableSlot[];
  onClickReservableSlot: (reservableSlot: ReservableSlot) => void;
};

export const ReservableSlotTable: VFC<Props> = memo((props) => {
  const { reservableSlots, onClickReservableSlot } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>日付</Th>
          <Th>基本検査</Th>
          <Th>胃カメラ</Th>
          <Th>バリウム</Th>
          <Th>乳がん検査</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservableSlots.map((rs, index) => (
          <Tr
            key={index}
            _hover={{ bg: 'gray.300' }}
            onClick={() => {
              onClickReservableSlot(rs);
            }}
          >
            <Td>{index + 1}</Td>
            <Td>
              {formatStringDate(rs.date)}
              {` (${rs.day_of_week})`}
            </Td>
            <Td>{rs.is_basic_reservable ? '○' : '―'}</Td>
            <Td>{rs.is_gastrointestinal_endoscopy_reservable ? '○' : '―'}</Td>
            <Td>{rs.is_barium_reservable ? '○' : '―'}</Td>
            <Td>{rs.is_breast_cancer_screening_reservable ? '○' : '―'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
