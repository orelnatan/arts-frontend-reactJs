import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { AuthProtectedRoute } from '@arts/core'

import { ArtsLazy } from './arts.lazy'
import {
  BrandsPage,
  CategoriesPage,
  FamiliesPage,
  ProductsPage,
  ProductViewPage,
} from './pages'

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
        element: <BrandsPage />,
      },
      {
        path: 'brands/:brandId/categories',
        element: <CategoriesPage />,
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families',
        element: <FamiliesPage />,
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families/:familyId/products',
        element: <ProductsPage />,
        children: [
          {
            // Fallback route: Keeps ProductViewPage mounted so cached data can render during the close animation
            path: '',
            element: <ProductViewPage />,
          },
          {
            // Active route: Mounts ProductViewPage normally when a specific product is opened in the drawer
            path: ':productId/product-view',
            element: <ProductViewPage />,
          },
        ],
      },
    ],
  },
]
