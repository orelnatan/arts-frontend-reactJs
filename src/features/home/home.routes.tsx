import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import type { Crumb } from '@arts/libs/breadcrumbs'

import { HomeLazy } from './home.lazy'
import { DesktopPage, ProfilePage, StatisticsPage } from './pages'

export const homeRoutes: RouteObject[] = [
  {
    path: 'home',
    element: <HomeLazy />,
    handle: {
      breadcrumbs: [
        {
          id: () => 'home-domain-crumb',
          path: 'home',
          label: 'home',
          namespace: 'home',
          keyPrefix: 'breadcrumbs',
        },
      ] satisfies Crumb[],
    },
    children: [
      {
        index: true,
        element: <Navigate to="desktop" replace />,
      },
      {
        path: 'desktop',
        element: <DesktopPage />,
        handle: {
          breadcrumbs: [
            {
              id: () => 'desktop-page-crumb',
              path: 'desktop',
              label: 'desktop',
              namespace: 'home',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        handle: {
          breadcrumbs: [
            {
              id: () => 'profile-page-crumb',
              path: 'profile',
              label: 'profile',
              namespace: 'home',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
        handle: {
          breadcrumbs: [
            {
              id: () => 'statistics-page-crumb',
              path: 'statistics',
              label: 'statistics',
              namespace: 'home',
              keyPrefix: 'breadcrumbs',
            },
          ] satisfies Crumb[],
        },
      },
    ],
  },
]
