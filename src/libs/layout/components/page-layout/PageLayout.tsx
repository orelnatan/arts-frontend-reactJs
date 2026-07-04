import { type PropsWithChildren, type ReactNode } from 'react';

import './PageLayout.scss';

type PageLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  headerHeight?: number;
  noPadding?: boolean;
  fullHeight?: boolean;
};

export default function PageLayout({ 
  children,
  noPadding,
  fullHeight
}: PageLayoutProps) {
  return (
    <div className="page-layout-main" style={{
      padding: noPadding ? 0 : 'auto',
      height: fullHeight ? 'var(--full-host-height)' : 'auto'
    }}>
      {children}
    </div>
  );
}