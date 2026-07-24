import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageLayout, ShellHeader } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useFavoritesContext, useFetchProducts } from '../../hooks'
import { filterEntities } from '../../utils'
import { ArtsHeader, EntityCard, ProductSpecDrawer } from '../../components'

import './ProductsPage.scss'

export default function ProductsPage() {
  const { isFavorite } = useFavoritesContext()
  const { brandId, categoryId, familyId } = useParams()
  const { products, loading, error } = useFetchProducts(Number(familyId))
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const filteredProducts = useMemo(() => {
    return filterEntities(products, keyword)
  }, [products, keyword])

  useEffect(() => {
    if (error) {
      errorAlert({
        title: (
          <Caption namespace="arts" keyPrefix="products-page">
            fetch-products-failed
          </Caption>
        ),
        message: error,
      })
    }
  }, [error])

  const showProduct = (productId: number) => {
    navigate(`${productId}/product-spec`)
  }

  const redirectBack = () => {
    navigate(`/arts/brands/${brandId}/categories/${categoryId}/families`)
  }

  return (
    <>
      <ShellHeader>
        <ArtsHeader
          key="products-header"
          keyPrefix="products-page"
          title="header"
          search={setKeyword}
          redirect={redirectBack}
          withRedirectArrow
        />
      </ShellHeader>

      <PageLayout>
        <div className="products-page-main">
          {loading && <p>Loading...</p>}

          <div className="products-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {filteredProducts.map((product) => (
                <EntityCard
                  key={product.id}
                  entity={product}
                  highlightQuery={keyword}
                  isFavorite={isFavorite(product.id)}
                  view={() => showProduct(product.id)}
                />
              ))}
            </CenteredContentShell>
          </div>
        </div>
      </PageLayout>

      <ProductSpecDrawer
        activeRoutePattern={/\/products\/\d+\/product-spec(\/|$)/}
        returnUrl="../products"
      />
    </>
  )
}
