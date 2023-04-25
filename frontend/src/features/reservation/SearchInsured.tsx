import { memo, type VFC, useState } from 'react';
import { Box, Center, Spinner, useDisclosure } from '@chakra-ui/react';
import { useInsuredsWithReservation } from 'features/reservation/api/useInsuredsWithReservation';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { InsuredListModal } from 'features/reservation/components/InsuredListModal';
import { InsuredListTable } from 'features/reservation/components/InsuredListTable';
import { SearchInputForm } from 'features/reservation/components/SearchInputForm';
import { type InsuredWithReservation } from './types/insuredWithReservation';

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
      <Box ml={24} mt={8}>
        <SearchInputForm
          getInsuredsWithReservation={getInsuredsWithReservation}
        />
      </Box>

      {insuredsWithReservation.length === 0 ? (
        <></>
      ) : loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Box p={4}>
          <InsuredListTable
            insureds={insuredsWithReservation}
            handleRowClick={handleRowClick}
          />
          <InsuredListModal
            isOpen={isOpen}
            onClose={onClose}
            selectedInsured={selectedInsured}
          />
        </Box>
      )}
    </ContentLayout>
  );
});
