import { Outlet } from 'react-router-dom';

import { ShellLayout } from '@arts/libs/layout';
import { AppNavbar } from '@arts/shared/components';

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
