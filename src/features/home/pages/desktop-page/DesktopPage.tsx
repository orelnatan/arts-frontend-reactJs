import { useAuthContext } from '@arts/core'
import { PageLayout } from '@arts/libs/layout'

import './DesktopPage.scss'

export default function DesktopPage() {
  const { user } = useAuthContext()

  return (
    <PageLayout>
      <h1>Welcome {user?.name}!</h1>

      <div>{JSON.stringify(user)}</div>
    </PageLayout>
  )
}
