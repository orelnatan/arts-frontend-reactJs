import { Navigate } from 'react-router-dom'
import type { Params, RouteObject } from 'react-router-dom'

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
import {
  brandCrumbResolver,
  categoryCrumbResolver,
  familyCrumbResolver,
} from './utils'

export const artsRoutes: RouteObject[] = [
  {
    path: 'arts',
    element: <ArtsLazy />,
    handle: {
      breadcrumbs: [
        {
          id: () => 'arts-domain-crumb',
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
              id: () => 'favorites-page-crumb',
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
              id: () => 'brands-page-crumb',
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
              id: () => `categories-page-brands-crumb`,
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `brand-${params.brandId}-crumb`,
              path: 'brandId',
              cacheKey: (params) => `brand:${params.brandId}`,
              resolve: (params: Params) => {
                return brandCrumbResolver(params.brandId)
              },
            },
            {
              id: () => 'categories-page-categories-crumb',
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
              id: () => `families-page-brands-crumb`,
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `brand-${params.brandId}-crumb`,
              path: 'brandId',
              cacheKey: (params) => `brand:${params.brandId}`,
              resolve: (params: Params) => {
                return brandCrumbResolver(params.brandId)
              },
            },
            {
              id: () => 'families-page-categories-crumb',
              path: 'categories',
              label: 'categories',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `category-${params.categoryId}-crumb`,
              path: 'categoryId',
              cacheKey: (params) => `category:${params.categoryId}`,
              resolve: (params: Params) => {
                return categoryCrumbResolver(params.categoryId)
              },
            },
            {
              id: () => 'families-page-families-crumb',
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
              id: () => 'products-page-brands-crumb',
              path: 'brands',
              label: 'brands',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `brand-${params.brandId}-crumb`,
              path: 'brandId',
              cacheKey: (params) => `brand:${params.brandId}`,
              resolve: (params: Params) => {
                return brandCrumbResolver(params.brandId)
              },
            },
            {
              id: () => 'products-page-categories-crumb',
              path: 'categories',
              label: 'categories',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `category-${params.categoryId}-crumb`,
              path: 'categoryId',
              cacheKey: (params) => `category:${params.categoryId}`,
              resolve: (params: Params) => {
                return categoryCrumbResolver(params.categoryId)
              },
            },
            {
              id: () => 'products-page-families-crumb',
              path: 'families',
              label: 'families',
              namespace: 'arts',
              keyPrefix: 'breadcrumbs',
            },
            {
              id: (params) => `family-${params.familyId}-crumb`,
              path: 'familyId',
              cacheKey: (params) => `family:${params.familyId}`,
              resolve: (params: Params) => {
                return familyCrumbResolver(params.familyId)
              },
            },
            {
              id: () => 'products-page-products-crumb',
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
