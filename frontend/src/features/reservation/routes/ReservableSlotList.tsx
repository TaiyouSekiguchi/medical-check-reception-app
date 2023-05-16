import { memo, useState, useEffect, type VFC } from 'react';
import { Center, Spinner, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useReservableSlots } from '../api/useReservableSlots';
import { ReservableSlotModal } from '../components/ReservableSlotModal';
import { ReservableSlotTable } from '../components/ReservableSlotTable';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';

export const ReservableSlotList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getReservableSlots, loading, reservableSlots } = useReservableSlots();

  const location = useLocation();

  // eslint-disable-next-line
  const [selectedInsured, setSelectedInsured] =
    useState<InsuredWithReservation | null>(
      location.state as InsuredWithReservation | null
    );

  useEffect(() => {
    getReservableSlots();
  }, [getReservableSlots]);

  const [selectedReservableSlot, setSelectedReservableSlot] =
    useState<ReservableSlot | null>(null);

  const onClickReservableSlot = (reservableSlot: ReservableSlot) => {
    setSelectedReservableSlot(reservableSlot);
    onOpen();
  };

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <BorderedBox p="24px">
            <ReservableSlotTable
              reservableSlots={reservableSlots}
              onClickReservableSlot={onClickReservableSlot}
            />
          </BorderedBox>
          <ReservableSlotModal
            isOpen={isOpen}
            onClose={onClose}
            selectedInsured={selectedInsured}
            selectedReservableSlot={selectedReservableSlot}
          />
        </>
      )}
    </ContentLayout>
  );
});
