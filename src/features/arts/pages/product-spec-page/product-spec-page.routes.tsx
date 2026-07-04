import { Navigate, type RouteObject } from 'react-router-dom'

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
    children: [
      {
        index: true,
        element: <Navigate to="view" replace />,
      },
      {
        path: 'view',
        element: <ViewProductPage />,
      },
      {
        path: 'update',
        element: <UpdateProductPage />,
      },
    ],
  },
]
