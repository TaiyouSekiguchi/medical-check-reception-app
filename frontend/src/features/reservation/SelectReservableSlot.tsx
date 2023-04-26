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
import { formatStringDate } from 'lib/formatDate';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useReservableSlots } from './api/useReservableSlots';

export const SelectReservableSlot: VFC = memo(() => {
  const { getReservableSlots, loading, reservableSlots } = useReservableSlots();

  useEffect(() => {
    getReservableSlots();
  }, [getReservableSlots]);

  const onClickDetail = () => {
    alert('詳細を表示します');
  };

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
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
                  onClick={onClickDetail}
                >
                  <Td>{index + 1}</Td>
                  <Td>
                    {formatStringDate(rs.date)}
                    {` (${rs.day_of_week})`}
                  </Td>
                  <Td>{rs.is_basic_reservable ? '○' : '―'}</Td>
                  <Td>
                    {rs.is_gastrointestinal_endoscopy_reservable ? '○' : '―'}
                  </Td>
                  <Td>{rs.is_barium_reservable ? '○' : '―'}</Td>
                  <Td>
                    {rs.is_breast_cancer_screening_reservable ? '○' : '―'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </ContentLayout>
  );
});
