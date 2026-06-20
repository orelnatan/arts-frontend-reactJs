import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@arts/core';
import { ShellLayout } from '@arts/libs/layout';

export default function ArtsShell() {
  return (
    <ShellLayout
      navbar={<AppNavbar />}
      navbarOpenedWidth={65}
      navbarOpen={true}
    >
      <Outlet />
    </ShellLayout>
  )
}