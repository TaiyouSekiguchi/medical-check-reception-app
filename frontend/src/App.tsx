import { AppProvider } from 'providers/AppProvider';
import { Router } from 'router/Router';

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
