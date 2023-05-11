import { Navigate, Route, Routes } from 'react-router-dom';
import { InsuredImport } from './InsuredImport';
import { InsuredList } from './InsuredList';

export const InsuredManagement = (): JSX.Element => {
  return (
    <Routes>
      <Route path="" element={<InsuredList isAdmin={true} />} />
      <Route path="import" element={<InsuredImport />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
