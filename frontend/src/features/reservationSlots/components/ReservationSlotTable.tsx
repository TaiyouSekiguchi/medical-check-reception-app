import { memo, type VFC } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { type ReservationSlotResponse } from '../types/reservationSlot';

type Props = {
  reservationSlots: ReservationSlotResponse[];
};

export const ReservationSlotTable: VFC<Props> = memo((props) => {
  const { reservationSlots } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>日付</Th>
          <Th>基本検査枠数</Th>
          <Th>胃カメラ検査枠数</Th>
          <Th>バリウム検査枠数</Th>
          <Th>乳がん検査枠数</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservationSlots.map((reservationSlot, index) => (
          <Tr key={index} _hover={{ bg: 'gray.300' }}>
            <Td>{reservationSlot.date}</Td>
            <Td>{reservationSlot.basic}</Td>
            <Td>{reservationSlot.gastrointestinal_endoscopy}</Td>
            <Td>{reservationSlot.barium}</Td>
            <Td>{reservationSlot.breast_cancer_screening}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
