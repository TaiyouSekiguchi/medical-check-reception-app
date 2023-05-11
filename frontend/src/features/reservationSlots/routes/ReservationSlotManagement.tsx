import { Navigate, Route, Routes } from 'react-router-dom';
import { ReservationSlotImport } from '../ReservationSlotImport';
import { ReservationSlotList } from '../ReservationSlotList';

export const ReservationSlotManagement = (): JSX.Element => {
  return (
    <Routes>
      <Route path="" element={<ReservationSlotList isAdmin={true} />} />
      <Route path="import" element={<ReservationSlotImport />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
