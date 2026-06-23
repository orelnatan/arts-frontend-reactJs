import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AppNavbar } from '@arts/core';
import { ShellLayout, type ShellLayoutContext } from '@arts/libs/layout';

export default function ArtsShell() {
  const [childHeaderContent, setChildHeaderContent] = useState<React.ReactNode>(null);
  
  return (
    <ShellLayout
      header={childHeaderContent}
      headerOpenedHeight={55}
      headerOpen={true}
      navbar={<AppNavbar />}
      navbarOpenedWidth={65}
      navbarOpen={true}
    >
      <Outlet context={{ setChildHeaderContent } satisfies ShellLayoutContext } />
    </ShellLayout>
  )
}