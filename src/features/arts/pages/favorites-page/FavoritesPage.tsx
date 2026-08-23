import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNavigationContext } from '@arts/core'
import { PageLayout, ShellHeader } from '@arts/libs/layout'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useProductsContext } from '../../hooks'
import { filterEntities } from '../../utils'
import { ArtsHeader, EntityCard, ProductSpecDrawer } from '../../components'

import './FavoritesPage.scss'

export default function FavoritesPage() {
  const { previousLocation } = useNavigationContext()
  const { favorites, loadingFavoritesIds, loadingFavorites } =
    useProductsContext()

  const [keyword, setKeyword] = useState<string>('')
  const [lastUrl, setLastUrl] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (lastUrl) return

    const initLastUrl = async () => {
      setLastUrl(previousLocation)
    }

    initLastUrl()
  }, [previousLocation, lastUrl])

  const filteredFavorites = useMemo(() => {
    return filterEntities(favorites, keyword) || []
  }, [favorites, keyword])

  const showProduct = (productId: number) => {
    navigate(`${productId}/product-spec`)
  }

  const redirect = () => {
    navigate(lastUrl ? lastUrl : '/home')
  }

  const isLoading = loadingFavoritesIds || loadingFavorites
  const isEmpty = !isLoading && !filteredFavorites.length
  const withArrow = lastUrl?.split('/')[1] === 'arts'

  return (
    <>
      <ShellHeader>
        <ArtsHeader
          key="favorites-header"
          keyPrefix="favorites-page"
          title="favorites-title"
          search={setKeyword}
          redirect={redirect}
          withRedirectArrow={withArrow}
        />
      </ShellHeader>

      <PageLayout>
        <div className="favorites-page-main">
          {isLoading && <p>Loading...</p>}

          <div className="favorites-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {isEmpty && (
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
        closeOnFavoriteToggle
      />
    </>
  )
}
