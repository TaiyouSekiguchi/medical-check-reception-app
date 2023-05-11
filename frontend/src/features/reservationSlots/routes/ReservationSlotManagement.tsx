import { Navigate, Route, Routes } from 'react-router-dom';
import { ReservationSlotImport } from './ReservationSlotImport';
import { ReservationSlotList } from './ReservationSlotList';

type Props = {
  isAdmin?: boolean;
};

export const ReservationSlotManagement = (props: Props): JSX.Element => {
  const { isAdmin = false } = props;

  return (
    <Routes>
      <Route path="" element={<ReservationSlotList isAdmin={isAdmin} />} />
      {isAdmin && <Route path="import" element={<ReservationSlotImport />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
