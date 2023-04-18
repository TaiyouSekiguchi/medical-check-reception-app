import { useEffect } from 'react';
import { axios } from 'lib/axios';
import { AppRoutes } from 'routes';
import { type CsrfToken } from 'types';
import { AppProvider } from 'providers/AppProvider';

const App = (): JSX.Element => {
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(`/csrf`);
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token;
    };
    getCsrfToken()
      .then(() => {
        console.log('Successfully get csrf token');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
