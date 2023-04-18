import { useLoginUser } from 'hooks/useLoginUser';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
  const { loginUser } = useLoginUser();
  const routes = loginUser != null ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
