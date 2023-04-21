import { Navigate } from 'react-router';
import { Login } from '../features/auth/Login';

export const publicRoutes = [
  { path: '/', element: <Login /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
