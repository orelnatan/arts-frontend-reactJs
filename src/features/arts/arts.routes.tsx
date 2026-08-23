import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import type { Crumb } from '@arts/libs/breadcrumbs'

import { ArtsLazy } from './arts.lazy'
import {
  FavoritesPage,
  BrandsPage,
  CategoriesPage,
  FamiliesPage,
  ProductsPage,
  productSpecPageRoutes,
} from './pages'
import { FavoriteProtectedRoute } from './guards'

export const artsRoutes: RouteObject[] = [
  {
    path: 'arts',
    element: <ArtsLazy />,
    handle: {
      breadcrumbs: [
        {
          id: 'arts-crumb',
          path: 'arts',
          label: 'arts',
          namespace: 'arts',
          keyPrefix: 'breadcrumbs',
        },
      ] satisfies Crumb[],
    },
    children: [
      {
        index: true,
        element: <Navigate to="brands" replace />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
        handle: {
          breadcrumbs: [
            {
              id: 'favorites-crumb',
              path: 'favorites',
              label: 'favorites',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
        children: [
          {
            // Pathless route guard wrapper
            element: <FavoriteProtectedRoute />,
            children: [...productSpecPageRoutes],
          },
        ],
      },
      {
        path: 'brands',
        element: <BrandsPage />,
        handle: {
          breadcrumbs: [
            {
              id: 'brands-crumb',
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'brands/:brandId/categories',
        element: <CategoriesPage />,
        handle: {
          breadcrumbs: [
            {
              id: 'brands-crumb',
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-brand-crumb',
              path: 'brandId',
            },
            {
              id: 'categories-crumb',
              path: 'categories',
              label: 'categories',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families',
        element: <FamiliesPage />,
        handle: {
          breadcrumbs: [
            {
              id: 'brands-crumb',
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-brand-crumb',
              path: 'brandId',
            },
            {
              id: 'categories-crumb',
              path: 'categories',
              label: 'categories',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-category-crumb',
              path: 'categoryId',
            },
            {
              id: 'families-crumb',
              path: 'families',
              label: 'families',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'brands/:brandId/categories/:categoryId/families/:familyId/products',
        element: <ProductsPage />,
        children: [...productSpecPageRoutes],
        handle: {
          breadcrumbs: [
            {
              id: 'brands-crumb',
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-brand-crumb',
              path: 'brandId',
            },
            {
              id: 'categories-crumb',
              path: 'categories',
              label: 'categories',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-category-crumb',
              path: 'categoryId',
            },
            {
              id: 'families-crumb',
              path: 'families',
              label: 'families',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: 'selected-product-crumb',
              path: 'categoryId',
            },
            {
              id: 'products-crumb',
              path: 'products',
              label: 'products',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
    ],
  },
]
