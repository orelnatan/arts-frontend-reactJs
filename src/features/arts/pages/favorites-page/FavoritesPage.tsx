import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useFavoritesContext, useFetchProductsByIds } from '../../hooks'
import { EntityCard, ProductSpecDrawer } from '../../components'
import type { Product } from '../../models'

import './FavoritesPage.scss'

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const { favoriteIds } = useFavoritesContext()
  const { triggerFetchProductsByIds, error, loading } = useFetchProductsByIds()
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await triggerFetchProductsByIds(favoriteIds)

        setProducts(products)
      } catch (err) {
        console.error('Error while fetching products: ', err)

        errorAlert({
          title: (
            <Caption namespace="arts" keyPrefix="favorites-page">
              fetch-favorites-failed
            </Caption>
          ),
          message: error,
        })
      }
    }

    getProducts()
  }, [favoriteIds, error, triggerFetchProductsByIds, setProducts])

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

          {loading && <p>Loading...</p>}

          <div className="favorites-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {products.map((product) => (
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
