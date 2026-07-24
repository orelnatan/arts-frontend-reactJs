import { useEffect, useState } from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { PageLayout } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, SvgIcon } from '@arts/shared/components'
import { cancelCircle } from '@arts/assets/images'

import {
  useAddFavorite,
  useFavoritesContext,
  useProductsContext,
  useRemoveFavorite,
} from '../../hooks'
import type { Product } from '../../models'
import { ProductIconsBar } from './components'
import type { ProductSpecOutletContext } from './product-spec-outlet-context.interface'

import './ProductSpecPage.scss'

const showErrorAlert = (key: string, err: unknown) => {
  errorAlert({
    title: (
      <Caption namespace="arts" keyPrefix="product-spec-page">
        {key}
      </Caption>
    ),
    message: (err as Error).message,
  })
}

export default function ProductSpecPage() {
  const context = useOutletContext<ProductSpecOutletContext>()
  const [image, setImage] = useState<string | null>(null)
  const { direction } = useDirectionContext()
  const { productId, familyId } = useParams()
  const productNumber = Number(productId)
  const familyNumber = Number(familyId)

  const { product, loadingProduct, loadProduct, error } = useProductsContext()
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext()
  const { triggerAddFavorite, loading: loadingAddFavorite } = useAddFavorite()
  const { triggerRemoveFavorite, loading: loadingRemoveFavorite } =
    useRemoveFavorite()

  useEffect(() => {
    loadProduct(productNumber, familyNumber)
  }, [loadProduct, productNumber, familyNumber])

  useEffect(() => {
    if (error) {
      showErrorAlert('fetch-product-failed', error)
    }
  }, [error])

  const handleAddFavorite = async () => {
    try {
      await triggerAddFavorite(productNumber)

      addFavorite(productNumber)

      if (context.cloaseOnFavoriteToggle) {
        context.handleClose?.()
      }
    } catch (err) {
      showErrorAlert('add-favorite-failed', err)
    }
  }

  const handleRemoveFavorite = async () => {
    try {
      await triggerRemoveFavorite(productNumber)

      removeFavorite(productNumber)

      if (context.cloaseOnFavoriteToggle) {
        context.handleClose?.()
      }
    } catch (err) {
      showErrorAlert('remove-favorite-failed', err)
    }
  }

  return (
    <PageLayout fullHeight noPadding>
      {loadingProduct ? (
        <p>Loading Product...</p>
      ) : (
        <div className="product-spec-page-main">
          <span
            className="close-circle-icon font-size-24"
            style={{
              [direction === Direction.LTR ? 'right' : 'left']: 0,
            }}
          >
            <SvgIcon
              icon={cancelCircle}
              style={{ cursor: 'pointer' }}
              onClick={context.handleClose}
            />
          </span>

          <img
            src={image ? `data:image/jpeg;base64,${image}` : product?.image}
          />
          <ProductIconsBar
            isFavorite={isFavorite(productNumber)}
            addFavorite={handleAddFavorite}
            removeFavorite={handleRemoveFavorite}
            loading={loadingAddFavorite || loadingRemoveFavorite}
          />

          <Outlet
            context={
              {
                product: product as Product,
                imageChange: (value) => {
                  setImage(value)
                },
              } satisfies ProductSpecOutletContext
            }
          />
        </div>
      )}
    </PageLayout>
  )
}
