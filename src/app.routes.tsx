import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import {
  AccessDeniedPage,
  AuthProtectedRoute,
  GuestProtectedRoute,
  NotFoundPage,
  SessionProtectedRoute,
} from '@arts/core'
import {
  artsRoutes,
  BrandsProvider,
  CategoriesProvider,
  FamiliesProvider,
  FavoritesProvider,
  ProductsProvider,
} from '@arts/features/arts'
import { authRoutes } from '@arts/features/auth'
import { homeRoutes } from '@arts/features/home'

import { AppRootProviders } from './app-root-providers'
import { ShellLayout } from './libs/layout'

export const appRoutes: RouteObject[] = [
  {
    element: <AppRootProviders />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '*',
        element: (
          <ShellLayout>
            <NotFoundPage />
          </ShellLayout>
        ),
      },
      {
        path: 'access-denied',
        element: (
          <ShellLayout>
            <AccessDeniedPage />
          </ShellLayout>
        ),
      },
      {
        element: (
          <SessionProtectedRoute>
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
          </SessionProtectedRoute>
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
    ],
  },
]

export const router = createBrowserRouter(appRoutes)
