import { Outlet } from 'react-router-dom';
import { HeaderLayout } from 'components/layouts/HeaderLayout';
import { Page404 } from 'components/pages/Page404';
import { Login } from '../features/auth/Login';
import { Home } from '../features/home/Home';
import { InsuredList } from '../features/insureds/InsuredList';
import { ReservationManagement } from '../features/reservation/routes/ReservationManagement';
import { ReservationSlotList } from '../features/reservationSlots/ReservationSlotList';
import { UserManagement } from '../features/users/UserManagement';

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
      { path: 'insured_list', element: <InsuredList /> },
      { path: 'reservation_slot_list', element: <ReservationSlotList /> },
      { path: 'user_management', element: <UserManagement /> },
      { path: 'reservation_management/*', element: <ReservationManagement /> },
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
