import { memo, type VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { ContentLayout } from 'components/layouts/ContentLayout';

export const ReservationResult: VFC = memo(() => {
  const location = useLocation();

  const { isSuccess } = location.state as {
    isSuccess: boolean;
  };

  return (
    <ContentLayout title={'予約管理'}>
      <Box bg="white">
        {isSuccess ? (
          <div>予約が完了しました。</div>
        ) : (
          <div>予約が失敗しました。</div>
        )}
      </Box>
    </ContentLayout>
  );
});
