import { Navigate, Route, Routes } from 'react-router-dom';
import { CheckReservation } from '../CheckReservation';
import { ReservationResult } from '../ReservationResult';
import { SearchInsured } from '../SearchInsured';
import { SelectReservableSlot } from '../SelectReservableSlot';

export const ReservationManagement = (): JSX.Element => {
  return (
    <Routes>
      <Route path="" element={<SearchInsured />} />
      <Route path="reservable_slot" element={<SelectReservableSlot />} />
      <Route path="check" element={<CheckReservation />} />
      <Route path="result" element={<ReservationResult />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
