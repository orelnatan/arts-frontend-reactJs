import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { AuthLazy } from './auth.lazy';
import { Login, Registration } from './pages';

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthLazy />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
    ],
  },
];