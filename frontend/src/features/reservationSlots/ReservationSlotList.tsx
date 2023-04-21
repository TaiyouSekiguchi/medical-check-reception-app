import { memo, useEffect, type VFC } from 'react';
import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useAllReservationSlots } from './api/useAllReservationSlots';

export const ReservationSlotList: VFC = memo(() => {
  const { getReservationSlots, loading, reservationSlots } =
    useAllReservationSlots();

  useEffect(() => {
    getReservationSlots();
  }, [getReservationSlots]);

  const onClickDetail = () => {
    alert('詳細を表示します');
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>日付</Th>
                <Th>基本検査枠</Th>
                <Th>胃カメラ枠</Th>
                <Th>バリウム枠</Th>
                <Th>乳がん検査枠</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservationSlots.map((rs) => (
                <Tr
                  key={rs.id}
                  _hover={{ bg: 'gray.300' }}
                  onClick={onClickDetail}
                >
                  <Td>{rs.id}</Td>
                  <Td>{new Date(rs.date).toLocaleDateString('ja-JP')}</Td>
                  <Td>{rs.basic}</Td>
                  <Td>{rs.gastrointestinal_endoscopy}</Td>
                  <Td>{rs.barium}</Td>
                  <Td>{rs.breast_cancer_screening}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
});