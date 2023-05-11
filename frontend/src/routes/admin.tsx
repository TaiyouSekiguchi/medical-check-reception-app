import { Outlet } from 'react-router-dom';
import { HeaderLayout } from 'components/layouts/HeaderLayout';
import { Page404 } from 'components/pages/Page404';
import { InsuredManagement } from 'features/insureds/routes/InsuredManagement';
import { ReservationSlotManagement } from 'features/reservationSlots/routes/ReservationSlotManagement';
import { Login } from '../features/auth/Login';
import { DataExport } from '../features/export/DataExport';
import { Home } from '../features/home/Home';
import { ReservationManagement } from '../features/reservation/routes/ReservationManagement';
import { UserManagement } from '../features/users/routes/UserManagement';

const App = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export const adminRoutes = [
  {
    path: 'home/*',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'insureds/*', element: <InsuredManagement /> },
      { path: 'reservation_slots/*', element: <ReservationSlotManagement /> },
      { path: 'user_management', element: <UserManagement /> },
      { path: 'data_export', element: <DataExport /> },
      { path: 'reservation_management/*', element: <ReservationManagement /> },
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
