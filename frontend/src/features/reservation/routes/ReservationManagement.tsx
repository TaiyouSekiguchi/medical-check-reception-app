import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckDeleteReservation } from './CheckDeleteReservation';
import { CheckReservation } from './CheckReservation';
import { ReservableSlotList } from './ReservableSlotList';
import { ReservationResult } from './ReservationResult';
import { SearchInsured } from './SearchInsured';

export const ReservationManagement = (): JSX.Element => {
  return (
    <Routes>
      <Route path="" element={<SearchInsured />} />
      <Route path="reservable_slot" element={<ReservableSlotList />} />
      <Route path="check" element={<CheckReservation />} />
      <Route path="delete_check" element={<CheckDeleteReservation />} />
      <Route path="result" element={<ReservationResult />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
