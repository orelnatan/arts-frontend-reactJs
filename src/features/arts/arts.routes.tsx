import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { AuthProtectedRoute } from '@arts/core';

import { ArtsLazy } from './arts.lazy';
import { Brands } from './pages';

export const artsRoutes: RouteObject[] = [
  {
    path: 'arts',
    element: (
      <AuthProtectedRoute>
        <ArtsLazy />
      </AuthProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="brands" replace />,
      },
      {
        path: 'brands',
        element: <Brands />,
      },
    ],
  },
];