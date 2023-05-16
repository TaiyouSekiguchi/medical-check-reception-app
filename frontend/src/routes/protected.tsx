import { Outlet } from 'react-router-dom';
import { HeaderLayout } from 'components/layouts/HeaderLayout';
import { Page404 } from 'components/pages/Page404';
import { InsuredManagement } from 'features/insureds/routes/InsuredManagement';
import { ReservationSlotManagement } from 'features/reservationSlots/routes/ReservationSlotManagement';
import { Login } from '../features/auth/routes/Login';
import { Home } from '../features/home/Home';
import { ReservationManagement } from '../features/reservation/routes/ReservationManagement';

const App = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export const protectedRoutes = [
  {
    path: 'home/*',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'insureds/*', element: <InsuredManagement /> },
      { path: 'reservation_slots/*', element: <ReservationSlotManagement /> },
      { path: 'reservation_management/*', element: <ReservationManagement /> },
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
