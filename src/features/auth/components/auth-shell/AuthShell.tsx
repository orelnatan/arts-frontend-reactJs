import { Outlet } from 'react-router-dom';

import { ShellLayout } from '@arts/libs/layout';

import { AuthHeader } from '../auth-header';

import './AuthShell.scss'

export default function AuthShell() {
  return (
    <ShellLayout
      header={<AuthHeader />}
      headerHeight={40}
    >
      <Outlet />
    </ShellLayout>
  )
}
