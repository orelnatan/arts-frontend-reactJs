import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@arts/core';
import { ShellLayout } from '@arts/libs/layout';

import './HomeShell.scss';

export default function HomeShell() {
  return (
    <ShellLayout
      navbar={<AppNavbar />}
      navbarWidth={65}
    >
      <Outlet />
    </ShellLayout>
  )
}
