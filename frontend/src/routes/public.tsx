import { Navigate } from 'react-router';
import { Login } from '../components/pages/Login';

export const publicRoutes = [
  { path: '/', element: <Login /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
