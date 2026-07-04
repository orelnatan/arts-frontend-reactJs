import { useOutletContext } from 'react-router-dom'

import { PageLayout } from '@arts/libs/layout'

import type { ProductSpecOutletContext } from '../../product-spec-outlet-context.interface'

import './ViewProductPage.scss'

export default function ViewProductPage() {
  const context = useOutletContext<ProductSpecOutletContext>()

  return (
    <PageLayout>
      <div className="view-product-page-main">
        <h1>This is ViewProductPage page</h1>

        {JSON.stringify(context.product)}
      </div>
    </PageLayout>
  )
}
