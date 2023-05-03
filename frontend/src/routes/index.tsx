import { useLoginUser } from 'features/auth/hooks/useLoginUser';
import { useRoutes } from 'react-router-dom';
import { adminRoutes } from './admin';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
  const { loginUser } = useLoginUser();
  const routes =
    loginUser == null
      ? publicRoutes
      : !loginUser.is_admin
      ? protectedRoutes
      : adminRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
