import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { PageNotFound } from '@arts/core';
import { authRoutes } from '@arts/features/auth';
import { homeRoutes } from '@arts/features/home';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  { 
    path: "*",
    element: <PageNotFound />
  },
  ...authRoutes,
  ...homeRoutes
];