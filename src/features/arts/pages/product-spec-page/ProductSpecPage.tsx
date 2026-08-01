import { useEffect, useState } from 'react'
import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { PageLayout } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, SvgIcon } from '@arts/shared/components'
import { cancelCircle } from '@arts/assets/images'

import {
  useAddFavorite,
  useDeleteProduct,
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
  const [productLoaded, setProductLoaded] = useState<boolean>(false)
  const [productNotFound, setProductNotFound] = useState<boolean>(false)
  const [loadingToggleFavorite, setLoadingToggleFavorite] =
    useState<boolean>(false)
  const [loadingDeleteProduct, setLoadingDeleteProduct] =
    useState<boolean>(false)
  const {
    product,
    loadingProduct,
    errorFetchingProduct,
    loadProduct,
    deleteProduct,
    addFavorite,
    removeFavorite,
  } = useProductsContext()
  const { productId, familyId } = useParams()
  const { direction } = useDirectionContext()
  const { isFavorite } = useFavoritesContext()
  const { triggerAddFavorite } = useAddFavorite()
  const { triggerRemoveFavorite } = useRemoveFavorite()
  const { triggerDeleteProduct } = useDeleteProduct()
  const location = useLocation()

  const productNumber = Number(productId)
  const familyNumber = Number(familyId)

  useEffect(() => {
    if (productLoaded) return

    setProductLoaded(true)
    loadProduct(productNumber, familyNumber)
  }, [loadProduct, productNumber, familyNumber, productLoaded])

  useEffect(() => {
    if (errorFetchingProduct) {
      setProductNotFound(true)
    }
  }, [errorFetchingProduct, context])

  useEffect(() => {
    setProductLoaded(false)
    setProductNotFound(false)
  }, [location])

  const handleAddFavorite = async () => {
    setLoadingToggleFavorite(true)

    try {
      await triggerAddFavorite(productNumber)
      addFavorite(product as Product)

      if (context.closeOnFavoriteToggle) {
        context.handleClose?.()
      }
    } catch (err) {
      showErrorAlert('add-favorite-failed', err)
    } finally {
      setLoadingToggleFavorite(false)
    }
  }

  const handleRemoveFavorite = async () => {
    setLoadingToggleFavorite(true)

    try {
      await triggerRemoveFavorite(productNumber)
      removeFavorite(productNumber)

      if (context.closeOnFavoriteToggle) {
        context.handleClose?.()
      }
    } catch (err) {
      showErrorAlert('remove-favorite-failed', err)
    } finally {
      setLoadingToggleFavorite(false)
    }
  }

  const handleDeleteProduct = async () => {
    setLoadingDeleteProduct(true)

    try {
      await triggerDeleteProduct(productNumber)
      deleteProduct(productNumber, Number(product?.familyId))

      if (isFavorite(productNumber)) {
        await triggerRemoveFavorite(productNumber)
        removeFavorite(productNumber)
      }
    } catch (err) {
      showErrorAlert('delete-product-failed', err)
    } finally {
      setLoadingDeleteProduct(false)
      context.handleClose?.()
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

          {productNotFound ? (
            <div className="product-not-found">
              <span className="font-italic assistant-bold font-size-24">
                <Caption namespace="arts" keyPrefix="product-spec-page">
                  product-not-found
                </Caption>
              </span>
            </div>
          ) : (
            <>
              <img
                src={image ? `data:image/jpeg;base64,${image}` : product?.image}
              />

              <ProductIconsBar
                isFavorite={isFavorite(productNumber)}
                addFavorite={handleAddFavorite}
                removeFavorite={handleRemoveFavorite}
                deleteProduct={handleDeleteProduct}
                loadingFavoriteToggle={loadingToggleFavorite}
                loadingProductDeletion={loadingDeleteProduct}
              />

              <Outlet
                context={
                  {
                    product: product as Product,
                    closeOnProductUpdate: context.closeOnProductUpdate,
                    handleClose: context.handleClose,
                    imageChange: (value) => {
                      setImage(value)
                    },
                  } satisfies ProductSpecOutletContext
                }
              />
            </>
          )}
        </div>
      )}
    </PageLayout>
  )
}
