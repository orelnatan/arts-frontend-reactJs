import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { AuthProtectedRoute } from '@arts/core';

import { ArtsLazy } from './arts.lazy';
import { Brands, Categories, Families, Products, ProductView } from './pages';

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
      {
        path: 'brands/:brandId/categories',
        element: <Categories />,
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families',
        element: <Families />,
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families/:familyId/products',
        element: <Products />,
        children: [
          {
            // Fallback route: Keeps ProductView mounted so cached data can render during the close animation
            path: '',
            element: <ProductView />,
          },
          {
            // Active route: Mounts ProductView normally when a specific product is opened in the drawer
            path: ':productId/product-view',
            element: <ProductView />,
          },
        ]
      },
    ],
  },
];