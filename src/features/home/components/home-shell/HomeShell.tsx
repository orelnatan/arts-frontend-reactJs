import { Outlet } from 'react-router-dom'

import { AppNavbar } from '@arts/core'
import { ShellLayout } from '@arts/libs/layout'
import { Breadcrumbs } from '@arts/libs/breadcrumbs'

export default function HomeShell() {
  return (
    <ShellLayout
      header={<Breadcrumbs />}
      headerOpenedHeight={38}
      headerOpen={true}
      navbar={<AppNavbar />}
      navbarOpenedWidth={65}
      navbarOpen={true}
    >
      <Outlet />
    </ShellLayout>
  )
}
