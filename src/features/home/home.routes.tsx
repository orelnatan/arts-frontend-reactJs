import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { HomeLazy } from './home.lazy'
import { DesktopPage, ProfilePage, StatisticsPage } from './pages'

export const homeRoutes: RouteObject[] = [
  {
    path: 'home',
    element: <HomeLazy />,
    children: [
      {
        index: true,
        element: <Navigate to="desktop" replace />,
      },
      {
        path: 'desktop',
        element: <DesktopPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
    ],
  },
]
