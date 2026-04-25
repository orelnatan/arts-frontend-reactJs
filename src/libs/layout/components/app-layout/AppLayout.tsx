import type { PropsWithChildren } from 'react';

import './AppLayout.scss';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app-layout-main'>
      <div className='app-layout-content-layer'>
        {children}
      </div>
    </div>
  );
}