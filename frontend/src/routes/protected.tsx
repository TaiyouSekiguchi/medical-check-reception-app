import { Outlet } from 'react-router-dom';
import { Page404 } from 'components/pages/Page404';
import { SelectReservationSlot } from 'components/pages/SelectReservationSlot';
import { Home } from '../components/pages/Home';
import { InsuredList } from '../components/pages/InsuredList';
import { Login } from '../components/pages/Login';
import { ReservationManagement } from '../components/pages/ReservationManagement';
import { ReservationSlotList } from '../components/pages/ReservationSlotList';
import { Setting } from '../components/pages/Setting';
import { UserManagement } from '../components/pages/UserManagement';
import { HeaderLayout } from '../components/templates/HeaderLayout';

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
      { path: 'setting', element: <Setting /> },
      { path: 'insured_list', element: <InsuredList /> },
      { path: 'reservation_slot_list', element: <ReservationSlotList /> },
      { path: 'reservation_management', element: <ReservationManagement /> },
      { path: 'user_management', element: <UserManagement /> },
      { path: 'select_reservation_slot', element: <SelectReservationSlot /> }, // TODO ここは要検討
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
