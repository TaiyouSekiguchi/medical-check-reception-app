import { memo, type VFC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { useDeleteReservations } from './api/useDeleteReservation';
import { CheckDeleteReservationTable } from './components/CheckDeleteReservationTable';
import { type InsuredWithReservation } from './types/insuredWithReservation';

export const CheckDeleteReservation: VFC = memo(() => {
  const location = useLocation();
  const selectedInsured = location.state as InsuredWithReservation | null;

  const { deleteReservations, loading } = useDeleteReservations();

  const onClickConfirm = () => {
    deleteReservations(selectedInsured?.id ?? 0);
  };

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <CenterSpinner />
      ) : (
        <Box>
          {selectedInsured != null && (
            <CheckDeleteReservationTable selectedInsured={selectedInsured} />
          )}
          <Flex m="24px" justifyContent="flex-end">
            <PrimaryButton onClick={onClickConfirm}>
              予約を削除する
            </PrimaryButton>
          </Flex>
        </Box>
      )}
    </ContentLayout>
  );
});
