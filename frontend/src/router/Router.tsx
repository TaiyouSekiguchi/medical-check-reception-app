import { memo, type VFC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Page404 } from 'components/pages/Page404';
import { UserManagement } from 'components/pages/UserManagement';
import { Home } from '../components/pages/Home';
import { Login } from '../components/pages/Login';
import { Setting } from '../components/pages/Setting';

export const Router: VFC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home">
          <Route path="" element={<Home />} />
          <Route path="setting" element={<Setting />} />
          <Route path="user_management" element={<UserManagement />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
});
