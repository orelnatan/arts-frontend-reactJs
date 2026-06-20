import { type PropsWithChildren, type ReactNode } from 'react';

import './PageLayout.scss';

type PageLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  noPadding?: boolean;
};

export default function PageLayout({ children, noPadding }: PageLayoutProps) {
  return (
    <div className="page-layout-main" style={{
      padding: noPadding ? 0 : 'auto'
    }}>
      {children}
    </div>
  );
}