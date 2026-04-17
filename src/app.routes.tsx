import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { authRoutes } from '@arts/features/auth';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/auth" replace />,
  },
  ...authRoutes,
];