import type { PropsWithChildren } from 'react';

import './AppLayout.scss';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
    </>
  );
}