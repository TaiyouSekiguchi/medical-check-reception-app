import { type ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';

type Props = {
  children: ReactNode;
};

export const AppProvider = (props: Props): JSX.Element => {
  const { children } = props;

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
