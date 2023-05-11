import { memo, type VFC } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const CenterSpinner: VFC = memo(() => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
});
