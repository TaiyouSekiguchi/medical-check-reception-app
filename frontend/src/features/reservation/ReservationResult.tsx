import { memo, type VFC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { ContentLayout } from 'components/layouts/ContentLayout';

export const ReservationResult: VFC = memo(() => {
  const location = useLocation();

  const { isSuccess } = location.state as {
    isSuccess: boolean;
  };

  return (
    <ContentLayout title={'予約管理'}>
      <Box>
        {isSuccess ? (
          <Text fontSize="xl">{`🎉 予約処理が完了しました 🎉`}</Text>
        ) : (
          <Text fontSize="xl">{`💣 予約処理に失敗しました 💣`}</Text>
        )}
      </Box>
    </ContentLayout>
  );
});
