import type { RouteObject } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'

import {
  AuthProtectedRoute,
  GuestProtectedRoute,
  NotFoundPage,
} from '@arts/core'
import { authRoutes } from '@arts/features/auth'
import { homeRoutes } from '@arts/features/home'
import {
  artsRoutes,
  BrandsProvider,
  CategoriesProvider,
  FamiliesProvider,
  FavoritesProvider,
  ProductsProvider,
} from '@arts/features/arts'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    element: (
      <AuthProtectedRoute>
        <BrandsProvider>
          <CategoriesProvider>
            <FamiliesProvider>
              <FavoritesProvider>
                <ProductsProvider>
                  <Outlet />
                </ProductsProvider>
              </FavoritesProvider>
            </FamiliesProvider>
          </CategoriesProvider>
        </BrandsProvider>
      </AuthProtectedRoute>
    ),
    children: [...homeRoutes, ...artsRoutes],
  },
  {
    element: (
      <GuestProtectedRoute>
        <Outlet />
      </GuestProtectedRoute>
    ),
    children: [...authRoutes],
  },
]
