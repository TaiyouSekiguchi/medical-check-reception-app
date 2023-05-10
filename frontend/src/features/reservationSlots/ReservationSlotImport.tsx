import { memo, useState, type VFC } from 'react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';

import StyledFileDrop from 'components/fileDlop/StyledFileDrop';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useCreateReservationSlots } from './api/useCreateReservationSlots';
import { ReservationSlotTable } from './components/ReservationSlotTable';
import { type ReservationSlotResponse } from './types/reservationSlot';

export const ReservationSlotImport: VFC = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservationSlots, setReservationSlots] = useState<
    ReservationSlotResponse[]
  >([]);

  const { createReservationSlots } = useCreateReservationSlots();

  const onClickImport = async () => {
    await createReservationSlots(reservationSlots);
  };

  return (
    <ContentLayout title="予約枠インポート">
      {!isLoaded ? (
        <StyledFileDrop<ReservationSlotResponse[]>
          setIsLoaded={setIsLoaded}
          setFunction={setReservationSlots}
        />
      ) : (
        <>
          <ReservationSlotTable reservationSlots={reservationSlots} />
          <PrimaryButton onClick={onClickImport}>import</PrimaryButton>
        </>
      )}
    </ContentLayout>
  );
});
