import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@arts/core';
import { ShellLayout } from '@arts/libs/layout';

export default function ArtsShell() {
  return (
    <ShellLayout
      navbar={<AppNavbar />}
      navbarWidth={65}
    >
      <Outlet />
    </ShellLayout>
  )
}
