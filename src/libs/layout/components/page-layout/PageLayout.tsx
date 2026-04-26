import { type PropsWithChildren, type ReactNode } from 'react';

import './PageLayout.scss';

type PageLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function PageLayout({ header, sidebar, footer, children }: PageLayoutProps) {
  return (
    <div className="page-layout-main">
      <aside className="page-layout-aside">
        {sidebar}
      </aside>

      <div className="page-layout-inner-layer">
        <header className="page-layout-header">
          {header}
        </header>

        <div className="page-layout-content">
          {children}
        </div>

        <footer className="page-layout-footer">
          {footer}
        </footer>
      </div>
    </div>
  );
}