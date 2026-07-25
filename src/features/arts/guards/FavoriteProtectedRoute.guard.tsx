import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

import { useFavoritesContext } from '../hooks'
import type { ProductSpecOutletContext } from '../pages'

export const FavoriteProtectedRoute = () => {
  const context = useOutletContext<ProductSpecOutletContext>()
  const { isFavorite, loading } = useFavoritesContext()
  const { productId } = useParams()

  // Show loading while favorites ids are fetched asynchronously...
  if (loading) {
    return <div>Loading favorite...</div>
  }

  // If the product is not favorited, bounce them back to the favorites list
  if (productId && !isFavorite(Number(productId))) {
    return <Navigate to="/arts/favorites" replace />
  }

  // If valid (or if no productId is in params yet), render the nested route
  return <Outlet context={context} />
}
