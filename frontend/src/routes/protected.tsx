import { Outlet } from 'react-router-dom';
import { Page404 } from 'components/pages/Page404';
import { SelectReservationSlot } from 'features/reservation/SelectReservationSlot';

import { HeaderLayout } from '../components/layouts/HeaderLayout';
import { Login } from '../features/auth/Login';
import { Home } from '../features/home/Home';
import { InsuredList } from '../features/insureds/InsuredList';
import { SearchInsured } from '../features/reservation/SearchInsured';
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
      { path: 'reservation_management', element: <SearchInsured /> },
      { path: 'user_management', element: <UserManagement /> },
      { path: 'select_reservation_slot', element: <SelectReservationSlot /> }, // TODO ここは要検討
      { path: '*', element: <Page404 /> },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Page404 /> },
];
