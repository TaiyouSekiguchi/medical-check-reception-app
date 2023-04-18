import { memo, type VFC } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Page404 } from 'components/pages/Page404';
import { ReservationManagement } from 'components/pages/ReservationManagement';
import { ReservationSlotList } from 'components/pages/ReservationSlotList';
import { UserManagement } from 'components/pages/UserManagement';
import { HeaderLayout } from 'components/templates/HeaderLayout';
import { LoginUserProvider } from 'providers/LoginUserProvider';
import { Home } from '../components/pages/Home';
import { InsuredList } from '../components/pages/InsuredList';
import { Login } from '../components/pages/Login';
import { Setting } from '../components/pages/Setting';

export const Router: VFC = memo(() => {
  return (
    <BrowserRouter>
      <LoginUserProvider>
        <Routes>
          <Route
            path="home/*"
            element={
              <HeaderLayout>
                <Routes>
                  <Route path="" element={<Home />} />
                  <Route path="setting" element={<Setting />} />
                  <Route path="insured_list" element={<InsuredList />} />
                  <Route
                    path="reservation_slot_list"
                    element={<ReservationSlotList />}
                  />
                  <Route
                    path="reservation_management"
                    element={<ReservationManagement />}
                  />
                  <Route path="user_management" element={<UserManagement />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </HeaderLayout>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LoginUserProvider>
    </BrowserRouter>
  );
});
