import { memo, type ReactNode, type VFC } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  title: string;
  children: ReactNode;
};

export const ContentLayout: VFC<Props> = memo((props) => {
  const { title, children } = props;

  return (
    <Box mx="320px" mt="40px">
      <Box as="h1" color="gray.700" fontWeight="bold" fontSize="2xl" my="32px">
        {title}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
});
