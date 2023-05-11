import { memo, useState, useEffect, type VFC } from 'react';
import { Center, Spinner, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useReservableSlots } from '../api/useReservableSlots';
import { ReservableSlotListTable } from '../components/ReservableSlotListTable';
import { SelectExaminationItemModal } from '../components/SelectExaminationItemModal';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';

export const SelectReservableSlot: VFC = memo(() => {
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

  const handleRowClick = (reservableSlot: ReservableSlot) => {
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
            <ReservableSlotListTable
              reservableSlots={reservableSlots}
              handleRowClick={handleRowClick}
            />
          </BorderedBox>
          <SelectExaminationItemModal
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
