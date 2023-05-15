import { memo, type VFC, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useInsuredsWithReservation } from 'features/reservation/api/useInsuredsWithReservation';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { SearchInsuredForm } from 'features/reservation/components/SearchInsuredForm';
import { SearchInsuredResult } from '../components/SearchInsuredResult';
import { type InsuredWithReservation } from '../types/insuredWithReservation';

export const SearchInsured: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getInsuredsWithReservation, insuredsWithReservation, loading } =
    useInsuredsWithReservation();

  const [selectedInsured, setSelectedInsured] =
    useState<InsuredWithReservation | null>(null);

  const onClickInsured = (insured: InsuredWithReservation) => {
    setSelectedInsured(insured);
    onOpen();
  };

  return (
    <ContentLayout title={'予約管理'}>
      <SearchInsuredForm
        getInsuredsWithReservation={getInsuredsWithReservation}
      />
      <SearchInsuredResult
        insuredsWithReservation={insuredsWithReservation}
        loading={loading}
        onClickInsured={onClickInsured}
        isOpen={isOpen}
        onClose={onClose}
        selectedInsured={selectedInsured}
      />
    </ContentLayout>
  );
});
