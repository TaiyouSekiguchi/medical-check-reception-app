import { memo, type VFC, useState } from 'react';
import { Center, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useInsuredsWithReservation } from 'features/reservation/api/useInsuredsWithReservation';
import { BorderedBox } from 'components/box/BorderedBox';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { InsuredListModal } from 'features/reservation/components/InsuredListModal';
import { InsuredListTable } from 'features/reservation/components/InsuredListTable';
import { SearchInputForm } from 'features/reservation/components/SearchInputForm';
import { type InsuredWithReservation } from '../types/insuredWithReservation';

export const SearchInsured: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getInsuredsWithReservation, insuredsWithReservation, loading } =
    useInsuredsWithReservation();

  const [selectedInsured, setSelectedInsured] =
    useState<InsuredWithReservation | null>(null);

  const handleRowClick = (insured: InsuredWithReservation) => {
    setSelectedInsured(insured);
    onOpen();
  };

  return (
    <ContentLayout title={'予約管理'}>
      <SearchInputForm
        getInsuredsWithReservation={getInsuredsWithReservation}
      />
      <BorderedBox h="240px" mt="24px" p="8px" overflowY="auto">
        {insuredsWithReservation.length === 0 ? (
          <Center h="240px">
            <Text size="lg" color="gray.500">
              Search Result
            </Text>
          </Center>
        ) : loading ? (
          <Center h="240px">
            <Spinner />
          </Center>
        ) : (
          <>
            <InsuredListTable
              insureds={insuredsWithReservation}
              handleRowClick={handleRowClick}
            />
            <InsuredListModal
              isOpen={isOpen}
              onClose={onClose}
              selectedInsured={selectedInsured}
            />
          </>
        )}
      </BorderedBox>
    </ContentLayout>
  );
});
