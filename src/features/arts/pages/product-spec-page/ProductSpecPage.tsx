import { useEffect, useRef, useState } from 'react'
import {
  Outlet,
  useBlocker,
  useLocation,
  useOutletContext,
  useParams,
} from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { PageLayout } from '@arts/libs/layout'
import { errorAlert, successAlert } from '@arts/libs/alerts'
import { Caption, SvgIcon } from '@arts/shared/components'
import { cancelCircle } from '@arts/assets/images'
import { useUploadImage } from '@arts/shared/hooks'
import { useDisclosure } from '@mantine/hooks'

import {
  useAddFavorite,
  useDeleteProduct,
  useFavoritesContext,
  useProductsContext,
  useRemoveFavorite,
  useUpdateProduct,
} from '../../hooks'
import type { ProductFormValues } from './pages'
import { ProductIconsBar } from './components'
import { DiscardChangesModal } from '../../components'
import type { Product } from '../../models'
import type {
  productFormState,
  ProductSpecOutletContext,
} from './product-spec-outlet-context.interface'

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

const showSuccessAlert = () => {
  successAlert({
    title: (
      <Caption namespace="arts" keyPrefix="update-product-page">
        product-update-success-title
      </Caption>
    ),
    message: (
      <Caption namespace="arts" keyPrefix="update-product-page">
        product-update-success-note
      </Caption>
    ),
  })
}

export default function ProductSpecPage() {
  const context = useOutletContext<ProductSpecOutletContext>()

  const [
    discardChangesModalOpened,
    { open: showDiscardChangesModal, close: closeDiscardChangesModal },
  ] = useDisclosure(false)

  const unsavedChanges = useRef<boolean>(false)

  const [autoSubmit, setAutoSubmit] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)
  const [productLoaded, setProductLoaded] = useState<boolean>(false)
  const [productNotFound, setProductNotFound] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)

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
    updateProduct,
  } = useProductsContext()

  const { productId, familyId } = useParams()
  const { direction } = useDirectionContext()
  const { isFavorite } = useFavoritesContext()
  const { triggerAddFavorite } = useAddFavorite()
  const { triggerRemoveFavorite } = useRemoveFavorite()
  const { triggerDeleteProduct } = useDeleteProduct()
  const { triggerUpload } = useUploadImage()
  const { triggerUpdate } = useUpdateProduct()
  const location = useLocation()

  const productNumber = Number(productId)
  const familyNumber = Number(familyId)

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      unsavedChanges.current &&
      currentLocation.pathname !== nextLocation.pathname
  )

  /*
    Open the modal when blocker detects an unsaved navigation attempt
  */
  useEffect(() => {
    if (blocker.state === 'blocked') {
      showDiscardChangesModal()
    }
  }, [blocker.state, showDiscardChangesModal])

  /*
    Load the product once when the required product parameters are available.
  */
  useEffect(() => {
    if (productLoaded) return

    setProductLoaded(true)
    loadProduct(productNumber, familyNumber)
  }, [loadProduct, productNumber, familyNumber, productLoaded])

  /*
    Set the product as not found when fetching the product fails.
  */
  useEffect(() => {
    if (errorFetchingProduct) {
      setProductNotFound(true)
    }
  }, [errorFetchingProduct])

  /*
    Restore page state when the location changes.
  */
  useEffect(() => {
    setProductLoaded(false)
    setProductNotFound(false)
    unsavedChanges.current = false
  }, [location])

  const handleAddFavorite = async () => {
    setLoadingToggleFavorite(true)

    try {
      await triggerAddFavorite(productNumber)
      addFavorite(product as Product)

      if (context.closeOnFavoriteToggle) {
        handleClose()
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
        handleClose()
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

      unsavedChanges.current = false
      handleClose()
    } catch (err) {
      showErrorAlert('delete-product-failed', err)
    } finally {
      setLoadingDeleteProduct(false)
    }
  }

  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    setUpdating(true)

    try {
      if (image) {
        values.image = (await triggerUpload(image)).data.display_url
      }

      const updatedProduct = { ...product, ...values } as Product

      await triggerUpdate(updatedProduct)
      updateProduct(updatedProduct)

      showSuccessAlert()
      unsavedChanges.current = false
      if (context.closeOnProductUpdate) {
        handleClose()
      }
    } catch (err) {
      showErrorAlert('product-update-failed', err)
    } finally {
      setUpdating(false)
    }
  }

  const handleAutoSubmit = async (values: ProductFormValues): Promise<void> => {
    setAutoSubmit(false)
    setUpdating(true)

    try {
      if (image) {
        values.image = (await triggerUpload(image)).data.display_url
      }

      const updatedProduct = { ...product, ...values } as Product

      await triggerUpdate(updatedProduct)
      updateProduct(updatedProduct)

      showSuccessAlert()
      blocker.proceed?.()
    } catch (err) {
      showErrorAlert('product-update-failed', err)
    } finally {
      setUpdating(false)
    }
  }

  const handleSaveAndLeave = (): void => {
    setAutoSubmit(true)
    closeDiscardChangesModal()
  }

  const handleDiscardAndLeave = (): void => {
    closeDiscardChangesModal()
    blocker.proceed?.()
  }

  const handleCancelDiscardModal = (): void => {
    closeDiscardChangesModal()
    blocker.reset?.()
  }

  const handleFormValueChange = (state: productFormState): void => {
    unsavedChanges.current = state.hasUnsavedChanges

    setDisabled(!state.hasUnsavedChanges)
  }

  const handleSubmitFailed = (): void => {
    setAutoSubmit(false)
    blocker.reset?.()
  }

  const handleImageChange = (image: string | null): void => {
    setImage(image)
  }

  const handleClose = (): void => {
    context.onClose?.()
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
              onClick={handleClose}
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
                    loading: updating,
                    disabled: disabled,
                    autoSubmit: autoSubmit,
                    onImageChange: handleImageChange,
                    onSubmit: handleSubmit,
                    onAutoSubmit: handleAutoSubmit,
                    onSubmitFailed: handleSubmitFailed,
                    onChange: handleFormValueChange,
                    onClose: handleClose,
                  } satisfies ProductSpecOutletContext
                }
              />
            </>
          )}

          <DiscardChangesModal
            opened={discardChangesModalOpened}
            cancel={handleCancelDiscardModal}
            saveAndLeave={handleSaveAndLeave}
            discardAndLeave={handleDiscardAndLeave}
          />
        </div>
      )}
    </PageLayout>
  )
}
