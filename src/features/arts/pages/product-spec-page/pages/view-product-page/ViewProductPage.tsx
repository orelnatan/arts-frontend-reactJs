import { useOutletContext } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'

import type { ProductSpecOutletContext } from '../../product-spec-outlet-context.interface'

import './ViewProductPage.scss'
import { Caption } from '@arts/shared/components'

export default function ViewProductPage() {
  const context = useOutletContext<ProductSpecOutletContext>()
  const product = context?.product

  return (
    <PageLayout>
      <div className="view-product-page-main">
        <h2 className="assistant-bold">{product?.name}</h2>
        <p>{product?.description}</p>

        <div className="product-details-container">
          <span className="font-size-18 assistant-bold">
            <Caption namespace="arts" keyPrefix="view-product-page">
              general
            </Caption>
          </span>

          <ul>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  id
                </Caption>
                :
              </strong>{' '}
              {product?.id}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  index
                </Caption>
                :
              </strong>{' '}
              {product?.index}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  serial
                </Caption>
                :
              </strong>{' '}
              {product?.serial}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  familyId
                </Caption>
                :
              </strong>{' '}
              {product?.familyId}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  added
                </Caption>
                :
              </strong>{' '}
              {product?.added}
            </li>
          </ul>
        </div>

        <div className="product-details-container">
          <span className="font-size-18 assistant-bold">
            <Caption namespace="arts" keyPrefix="view-product-page">
              specs
            </Caption>
          </span>

          <ul>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  height
                </Caption>
                :
              </strong>{' '}
              {product?.height}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  width
                </Caption>
                :
              </strong>{' '}
              {product?.width}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  weight
                </Caption>
                :
              </strong>{' '}
              {product?.weight}
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  price
                </Caption>
                :
              </strong>{' '}
              ${product ? (product.price / 100).toFixed(2) : ''}
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
