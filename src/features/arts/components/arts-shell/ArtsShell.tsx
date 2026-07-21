import { Outlet } from 'react-router-dom'

import { AppNavbar } from '@arts/core'
import { ShellLayout, useLayoutContext } from '@arts/libs/layout'

import { FavoritesProvider } from '../../providers'

export default function ArtsShell() {
  const { header } = useLayoutContext()

  return (
    <FavoritesProvider>
      <ShellLayout
        header={header}
        headerOpenedHeight={55}
        headerOpen={true}
        navbar={<AppNavbar />}
        navbarOpenedWidth={65}
        navbarOpen={true}
      >
        <Outlet />
      </ShellLayout>
    </FavoritesProvider>
  )
}
