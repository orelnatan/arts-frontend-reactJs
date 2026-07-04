import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { AuthLazy } from './auth.lazy'
import { LoginPage, RegistrationPage } from './pages'

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthLazy />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
    ],
  },
]
