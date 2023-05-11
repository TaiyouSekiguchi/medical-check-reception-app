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
import { useNavigate } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useAllReservationSlots } from './api/useAllReservationSlots';

type Props = {
  isAdmin?: boolean;
};

export const ReservationSlotList: VFC<Props> = memo((props) => {
  const { isAdmin = false } = props;

  const { getReservationSlots, loading, reservationSlots } =
    useAllReservationSlots();

  const navigate = useNavigate();

  useEffect(() => {
    getReservationSlots();
  }, [getReservationSlots]);

  const onClickImport = () => {
    navigate('/home/reservation_slots/import');
  };

  return (
    <ContentLayout title="予約枠一覧">
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          {isAdmin && reservationSlots.length === 0 && (
            <PrimaryButton onClick={onClickImport}>インポート</PrimaryButton>
          )}
          <BorderedBox>
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
                  <Tr key={rs.id} _hover={{ bg: 'gray.300' }}>
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
          </BorderedBox>
        </Box>
      )}
    </ContentLayout>
  );
});
