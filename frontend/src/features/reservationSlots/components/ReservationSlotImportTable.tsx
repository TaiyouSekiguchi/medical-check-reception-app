import { memo, type VFC } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { type ReservationSlotRequest } from '../types/reservationSlot';

type Props = {
  reservationSlots: ReservationSlotRequest[];
};

export const ReservationSlotImportTable: VFC<Props> = memo((props) => {
  const { reservationSlots } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>日付</Th>
          <Th>基本検査</Th>
          <Th>胃カメラ検査</Th>
          <Th>バリウム検査</Th>
          <Th>乳がん検査</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservationSlots.map((rs, index) => (
          <Tr key={index} _hover={{ bg: 'gray.300' }}>
            <Td>{new Date(rs.date).toLocaleDateString('ja-JP')}</Td>
            <Td>{rs.basic}</Td>
            <Td>{rs.gastrointestinal_endoscopy}</Td>
            <Td>{rs.barium}</Td>
            <Td>{rs.breast_cancer_screening}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
