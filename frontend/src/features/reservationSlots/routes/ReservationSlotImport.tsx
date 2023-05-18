import { memo, useState, type VFC } from 'react';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';

import StyledFileDrop from 'components/fileDlop/StyledFileDrop';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useCreateReservationSlots } from '../api/useCreateReservationSlots';
import { ReservationSlotImportTable } from '../components/ReservationSlotImportTable';
import { type ReservationSlotRequest } from '../types/reservationSlot';

export const ReservationSlotImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationSlots, setReservationSlots] = useState<
    ReservationSlotRequest[]
  >([]);

  const { createReservationSlots } = useCreateReservationSlots();
  const navigate = useNavigate();

  const onClickImport = async () => {
    await createReservationSlots(reservationSlots);
    navigate('/home/reservation_slots');
  };

  return (
    <ContentLayout title="予約枠インポート">
      {!isLoaded ? (
        <StyledFileDrop<ReservationSlotRequest[]>
          setIsLoaded={setIsLoaded}
          setFunction={setReservationSlots}
        />
      ) : (
        <>
          <BorderedBox p="24px">
            <ReservationSlotImportTable reservationSlots={reservationSlots} />
          </BorderedBox>
          <Flex m="24px" justifyContent="flex-end">
            <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
          </Flex>
        </>
      )}
    </ContentLayout>
  );
});
