import { useNavigate } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useProductsContext } from '../../hooks'
import { EntityCard, ProductSpecDrawer } from '../../components'

import './FavoritesPage.scss'

export default function FavoritesPage() {
  const { favorites, loadingFavoritesIds, loadingFavorites } =
    useProductsContext()
  const navigate = useNavigate()

  const showProduct = (productId: number) => {
    navigate(`${productId}/product-spec`)
  }

  return (
    <>
      <PageLayout>
        <div className="favorites-page-main">
          <h1>
            <Caption namespace="arts" keyPrefix="favorites-page">
              favorites-title
            </Caption>
          </h1>

          {(loadingFavoritesIds || loadingFavorites) && <p>Loading...</p>}

          <div className="favorites-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {favorites.map((product) => (
                <EntityCard
                  key={product.id}
                  entity={product}
                  isFavorite={true}
                  view={() => showProduct(product.id)}
                />
              ))}
            </CenteredContentShell>
          </div>
        </div>
      </PageLayout>

      <ProductSpecDrawer
        activeRoutePattern={/\/favorites\/\d+\/product-spec(\/|$)/}
        returnUrl="../favorites"
      />
    </>
  )
}
