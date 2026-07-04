import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@arts/core';
import { ShellLayout, useLayoutContext } from '@arts/libs/layout';

export default function ArtsShell() {
  const { header } = useLayoutContext();
  
  return (
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
  )
}