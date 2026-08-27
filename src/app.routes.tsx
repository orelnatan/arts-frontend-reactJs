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

import { ShellLayout } from './libs/layout'
import { BreadcrumbsProvider } from './libs/breadcrumbs'

import App from './App'

export const appRoutes: RouteObject[] = [
  {
    element: <App />,
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
                        <BreadcrumbsProvider>
                          <Outlet />
                        </BreadcrumbsProvider>
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
            <BreadcrumbsProvider>
              <Outlet />
            </BreadcrumbsProvider>
          </GuestProtectedRoute>
        ),
        children: [...authRoutes],
      },
    ],
  },
]

export const routes = createBrowserRouter(appRoutes)
