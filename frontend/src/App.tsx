import { ChakraProvider } from '@chakra-ui/react';

import theme from 'theme/theme';
import { Router } from 'router/Router';

const App = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
};

export default App;
