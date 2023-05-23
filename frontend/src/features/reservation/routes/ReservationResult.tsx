import { memo, type VFC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { ContentLayout } from 'components/layouts/ContentLayout';

export const ReservationResult: VFC = memo(() => {
  const location = useLocation();

  const { isSuccess, action } = location.state as {
    isSuccess: boolean;
    action: string;
  };

  return (
    <ContentLayout title={'予約管理'}>
      <Box>
        {isSuccess ? (
          <Text fontSize="xl">{`🎉 ${action}に成功しました 🎉`}</Text>
        ) : (
          <Text fontSize="xl">{`💣 ${action}に失敗しました 💣`}</Text>
        )}
      </Box>
    </ContentLayout>
  );
});
