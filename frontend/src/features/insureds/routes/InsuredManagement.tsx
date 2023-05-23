import { Navigate, Route, Routes } from 'react-router-dom';
import { InsuredImport } from './InsuredImport';
import { InsuredList } from './InsuredList';

type Props = {
  isAdmin?: boolean;
};

export const InsuredManagement = (props: Props): JSX.Element => {
  const { isAdmin = false } = props;

  return (
    <Routes>
      <Route path="" element={<InsuredList isAdmin={isAdmin} />} />
      {isAdmin && <Route path="import" element={<InsuredImport />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
