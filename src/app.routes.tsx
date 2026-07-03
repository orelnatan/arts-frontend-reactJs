import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { NotFoundPage } from '@arts/core';
import { authRoutes } from '@arts/features/auth';
import { homeRoutes } from '@arts/features/home';
import { artsRoutes } from '@arts/features/arts';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  { 
    path: "*",
    element: <NotFoundPage />
  },
  ...authRoutes,
  ...homeRoutes,
  ...artsRoutes
];