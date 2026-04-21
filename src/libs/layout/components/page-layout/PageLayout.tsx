import type { ReactNode } from 'react';

import './PageLayout.scss'

type PageLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
};

export default function PageLayout({
  children,
  header,
  sidebar,
}: PageLayoutProps) {
  return (
    <div className='page-layout-main'>
      <div className='page-layout-content'>
         {children}
      </div>
    </div>
  );
}