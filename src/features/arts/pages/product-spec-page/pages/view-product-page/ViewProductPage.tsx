import { useOutletContext } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'
import { Caption, NumericPrettier } from '@arts/shared/components'
import { dateFormatter } from '@arts/shared/utils'

import type { ProductSpecOutletContext } from '../../product-spec-outlet-context.interface'

import './ViewProductPage.scss'

export default function ViewProductPage() {
  const context = useOutletContext<ProductSpecOutletContext>()
  const product = context?.product

  return (
    <PageLayout key="view-product-page-layout" noPadding>
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
              {dateFormatter(product?.added)}
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
              <NumericPrettier
                value={product?.height}
                displayType="text"
                decimalScale={2}
                namespace="arts"
                keyPrefix="view-product-page"
                suffix="cm"
              />
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  width
                </Caption>
                :
              </strong>{' '}
              <NumericPrettier
                value={product?.width}
                displayType="text"
                decimalScale={2}
                namespace="arts"
                keyPrefix="view-product-page"
                suffix="cm"
              />
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  weight
                </Caption>
                :
              </strong>{' '}
              <NumericPrettier
                value={product?.weight}
                displayType="text"
                decimalScale={2}
                namespace="arts"
                keyPrefix="view-product-page"
                suffix="kg"
              />
            </li>
            <li>
              <strong>
                <Caption namespace="arts" keyPrefix="view-product-page">
                  price
                </Caption>
                :
              </strong>{' '}
              <NumericPrettier
                value={product?.price}
                thousandSeparator={true}
                displayType="text"
                namespace="arts"
                keyPrefix="view-product-page"
                suffix="usd"
              />
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
