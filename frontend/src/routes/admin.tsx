import { Outlet } from 'react-router-dom';
import { HeaderLayout } from 'components/layouts/HeaderLayout';
import { Page404 } from 'components/pages/Page404';
import { InsuredManagement } from 'features/insureds/routes/InsuredManagement';
import { Login } from '../features/auth/Login';
import { DataExport } from '../features/export/DataExport';
import { Home } from '../features/home/Home';
import { ReservationManagement } from '../features/reservation/routes/ReservationManagement';
import { ReservationSlotImport } from '../features/reservationSlots/ReservationSlotImport';
import { ReservationSlotList } from '../features/reservationSlots/ReservationSlotList';
import { UserManagement } from '../features/users/UserManagement';

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
      {
        path: 'reservation_slot_list',
        element: <ReservationSlotList isAdmin={true} />,
      },
      {
        path: 'reservation_slot_list_import',
        element: <ReservationSlotImport />,
      },
      { path: 'user_management', element: <UserManagement /> },
      { path: 'data_export', element: <DataExport /> },
      { path: 'reservation_management/*', element: <ReservationManagement /> },
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
