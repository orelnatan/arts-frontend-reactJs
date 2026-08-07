import { PageLayout } from '@arts/libs/layout'
import { Caption } from '@arts/shared/components'

import './AccessDeniedPage.scss'

export default function AccessDeniedPage() {
  return (
    <PageLayout>
      <div className="access-denied-page">
        <h1 className="assistant-bold">
          <Caption namespace="core" keyPrefix="access-denied-page">
            title
          </Caption>
        </h1>

        <h3 className="assistant-bold">
          <Caption namespace="core" keyPrefix="access-denied-page">
            description
          </Caption>
        </h3>
      </div>
    </PageLayout>
  )
}
