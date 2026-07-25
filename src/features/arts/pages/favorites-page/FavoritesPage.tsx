import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageLayout, ShellHeader } from '@arts/libs/layout'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useProductsContext } from '../../hooks'
import { filterEntities } from '../../utils'
import { ArtsHeader, EntityCard, ProductSpecDrawer } from '../../components'

import './FavoritesPage.scss'

export default function FavoritesPage() {
  const [keyword, setKeyword] = useState('')
  const { favorites, loadingFavoritesIds, loadingFavorites } =
    useProductsContext()
  const navigate = useNavigate()

  const filteredFavorites = useMemo(() => {
    return filterEntities(favorites, keyword) || []
  }, [favorites, keyword])

  const showProduct = (productId: number) => {
    navigate(`${productId}/product-spec`)
  }

  const loading = loadingFavoritesIds || loadingFavorites
  const empty = !loading && !filteredFavorites.length

  return (
    <>
      <ShellHeader>
        <ArtsHeader
          key="favorites-header"
          keyPrefix="favorites-page"
          title="favorites-title"
          search={setKeyword}
        />
      </ShellHeader>

      <PageLayout>
        <div className="favorites-page-main">
          {loading && <p>Loading...</p>}

          <div className="favorites-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {empty && (
                <h2
                  className="text-align-center assistant-bold"
                  style={{ width: '100%' }}
                >
                  <Caption namespace="shared">empty-list</Caption>
                </h2>
              )}

              {filteredFavorites.map((product) => (
                <EntityCard
                  key={product.id}
                  entity={product}
                  isFavorite={true}
                  highlightQuery={keyword}
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
