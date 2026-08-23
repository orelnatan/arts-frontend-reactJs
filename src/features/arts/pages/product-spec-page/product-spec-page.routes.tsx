import { Navigate, type RouteObject } from 'react-router-dom'

import { AccessProtectedRoute, UserType } from '@arts/libs/user-access'
import type { Crumb } from '@arts/libs/breadcrumbs'

import { UpdateProductPage, ViewProductPage } from './pages'
import ProductSpecPage from './ProductSpecPage'

export const productSpecPageRoutes: RouteObject[] = [
  {
    // Fallback route: Keeps ProductSpecPage mounted so cached data can render during the close animation
    path: '',
    element: <ProductSpecPage />,
  },
  {
    // Active route: Mounts ProductSpecPage normally when a specific product is opened in the drawer
    path: ':productId/product-spec',
    element: <ProductSpecPage />,
    handle: {
      breadcrumbs: [
        {
          id: 'selected-product-spec-crumb',
          path: 'productId',
        },
        {
          id: 'product-spec-crumb',
          path: 'product-spec',
          label: 'productSpec',
          namespace: 'arts',
          keyPrefix: 'breadcrumbs',
        },
      ] satisfies Crumb[],
    },
    children: [
      {
        index: true,
        element: <Navigate to="view" replace />,
      },
      {
        path: 'view',
        element: <ViewProductPage />,
        handle: {
          breadcrumbs: [
            {
              id: 'view-product-crumb',
              path: 'view',
              label: 'view',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'update',
        element: (
          <AccessProtectedRoute roles={[UserType.Editor, UserType.Admin]}>
            <UpdateProductPage />
          </AccessProtectedRoute>
        ),
        handle: {
          breadcrumbs: [
            {
              id: 'update-product-crumb',
              path: 'update',
              label: 'update',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
    ],
  },
]
