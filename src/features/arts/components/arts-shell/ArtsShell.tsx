import { Outlet } from 'react-router-dom'

import { AppNavbar } from '@arts/core'
import { ShellLayout, useLayoutContext } from '@arts/libs/layout'
import { Breadcrumbs } from '@arts/libs/breadcrumbs'

export default function ArtsShell() {
  const { header } = useLayoutContext()

  return (
    <ShellLayout
      header={
        <>
          {header}
          {<Breadcrumbs />}
        </>
      }
      headerOpenedHeight={93}
      headerOpen={true}
      navbar={<AppNavbar />}
      navbarOpenedWidth={65}
      navbarOpen={true}
    >
      <Outlet />
    </ShellLayout>
  )
}
