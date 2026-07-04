import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { PageLayout } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, SvgIcon } from '@arts/shared/components'
import { cancelCircle } from '@arts/assets/images'

import { useFetchProduct } from '../../hooks'
import type { Product } from '../../models'

import './ProductViewPage.scss'

interface ProductViewOutletContext {
  handleClose: () => void
}

export default function ProductViewPage() {
  const context = useOutletContext<ProductViewOutletContext>()
  const { direction } = useDirectionContext()
  const { familyId, productId } = useParams()
  const { product, error } = useFetchProduct(
    Number(productId),
    Number(familyId)
  )
  // Caches the product data locally so it remains available when the route changes back to empty
  const [productClone, setProductClone] = useState<Product | null>(null)

  // Updates the clone during render phase to keep data stable during close transitions
  if (product && product !== productClone) {
    setProductClone(product)
  }

  useEffect(() => {
    if (error) {
      errorAlert({
        title: (
          <Caption namespace="arts" keyPrefix="product-view-page">
            fetch-product-failed
          </Caption>
        ),
        message: error,
      })
    }
  }, [error])

  return (
    <PageLayout fullHeight noPadding>
      <div className="product-view-page-main">
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

        <img src={productClone?.image} />
      </div>
    </PageLayout>
  )
}
