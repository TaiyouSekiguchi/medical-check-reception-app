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
import { useReservationSlotsWithReservation } from 'features/reservation/api/useReservationSlotsWithReservation';
import { type ReservationSlot } from 'types/api/reservationSlot';

export const SelectReservationSlot: VFC = memo(() => {
  const {
    getReservationSlotsWithReservation,
    reservationSlotsWithReservation,
    loading,
  } = useReservationSlotsWithReservation();

  useEffect(() => {
    getReservationSlotsWithReservation();
  }, [getReservationSlotsWithReservation]);

  const onClickDetail = () => {
    alert('詳細を表示します');
  };

  const getRestReservations = (
    slotCount: number,
    reservationSlot: ReservationSlot,
    itemName: string
  ): number => {
    const filteredReservations = reservationSlot.reservation.filter(
      (reservation) => reservation.examination_item.name === itemName
    );

    return slotCount - filteredReservations.length;
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
                <Th>基本検査枠残数</Th>
                <Th>胃カメラ枠残数</Th>
                <Th>バリウム枠残数</Th>
                <Th>乳がん検査枠残数</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservationSlotsWithReservation.map((rs) => (
                <Tr
                  key={rs.id}
                  _hover={{ bg: 'gray.300' }}
                  onClick={onClickDetail}
                >
                  <Td>{rs.id}</Td>
                  <Td>{new Date(rs.date).toLocaleDateString('ja-JP')}</Td>
                  <Td>{getRestReservations(rs.basic, rs, 'Basic')}</Td>
                  <Td>
                    {getRestReservations(
                      rs.gastrointestinal_endoscopy,
                      rs,
                      'Gastrointestinal Endoscopy'
                    )}
                  </Td>
                  <Td>{getRestReservations(rs.barium, rs, 'Barium')}</Td>
                  <Td>
                    {getRestReservations(
                      rs.breast_cancer_screening,
                      rs,
                      'Breast Cancer Screening'
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
});
