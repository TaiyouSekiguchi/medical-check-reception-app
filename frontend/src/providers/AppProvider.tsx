import { type ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../theme/theme';
import { LoginUserProvider } from './LoginUserProvider';

type Props = {
  children: ReactNode;
};

export const AppProvider = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <ChakraProvider theme={theme}>
      <LoginUserProvider>
        <Router>{children}</Router>
      </LoginUserProvider>
    </ChakraProvider>
  );
};
