import { memo, type VFC } from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';

type BorderedBoxProps = BoxProps;

export const BorderedBox: VFC<BorderedBoxProps> = memo((props) => {
  return (
    <Box
      p="32px"
      bg="white"
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      {...props}
    >
      {props.children}
    </Box>
  );
});
