import { memo, type VFC } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { useDeleteReservations } from './api/useDeleteReservation';
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
        <Spinner />
      ) : (
        <Box bg="white">
          <div>予約内容</div>
          <div>{selectedInsured?.last_name}</div>
          <div>{selectedInsured?.first_name}</div>
          <div>
            受診日:
            {selectedInsured?.reservation_date != null &&
              formatStringDate(selectedInsured.reservation_date)}
          </div>
          {selectedInsured?.examination_items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div>この予約を削除しますか？</div>
          <div>良ければ「予約を削除する」ボタンを押してください。</div>
          <PrimaryButton onClick={onClickConfirm}>予約を削除する</PrimaryButton>
        </Box>
      )}
    </ContentLayout>
  );
});
