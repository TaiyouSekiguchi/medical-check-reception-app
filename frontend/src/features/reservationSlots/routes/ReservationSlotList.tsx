import { memo, useEffect, type VFC } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useGetReservationSlots } from '../api/useGetReservationSlots';
import { ReservationSlotTable } from '../components/ReservationSlotTable';

type Props = {
  isAdmin?: boolean;
};

export const ReservationSlotList: VFC<Props> = memo((props) => {
  const { isAdmin = false } = props;

  const { getReservationSlots, loading, reservationSlots } =
    useGetReservationSlots();

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
        <CenterSpinner />
      ) : (
        <Box p={4}>
          {isAdmin && reservationSlots.length === 0 && (
            <Flex mb="16px" justify="flex-end">
              <PrimaryButton onClick={onClickImport}>Import</PrimaryButton>
            </Flex>
          )}
          <BorderedBox>
            {reservationSlots.length === 0 ? (
              <Center h="100%">
                <Text color="gray.500">
                  {'No content. Please import reservation slots.'}
                </Text>
              </Center>
            ) : (
              <ReservationSlotTable reservationSlots={reservationSlots} />
            )}
          </BorderedBox>
        </Box>
      )}
    </ContentLayout>
  );
});
