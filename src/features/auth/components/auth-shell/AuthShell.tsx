import { Outlet } from 'react-router-dom'

import { ShellLayout } from '@arts/libs/layout'

import { AuthHeader } from '../auth-header'

export default function AuthShell() {
  return (
    <ShellLayout
      header={<AuthHeader />}
      headerOpenedHeight={40}
      headerOpen={true}
    >
      <Outlet />
    </ShellLayout>
  )
}
