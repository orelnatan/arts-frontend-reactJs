import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { AuthProtectedRoute } from '@arts/core'

import { ArtsLazy } from './arts.lazy'
import {
  FavoritesPage,
  BrandsPage,
  CategoriesPage,
  FamiliesPage,
  ProductsPage,
  productSpecPageRoutes,
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
        path: 'favorites',
        element: <FavoritesPage />,
        children: [...productSpecPageRoutes],
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
        children: [...productSpecPageRoutes],
      },
    ],
  },
]
