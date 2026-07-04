import { useOutletContext } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'

import type { ProductSpecOutletContext } from '../../product-spec-outlet-context.interface'

import './UpdateProductPage.scss'

export default function UpdateProductPage() {
  const context = useOutletContext<ProductSpecOutletContext>()

  return (
    <PageLayout>
      <div className="update-product-page-main">
        <h1>This is UpdateProductPage page</h1>

        {JSON.stringify(context.product)}
      </div>
    </PageLayout>
  )
}
