import type { PropsWithChildren, ReactNode } from 'react';

import './ShellLayout.scss';

const HEADER_DEFAULT_HEIGHT = '60px';
const FOOTER_DEFAULT_HEIGHT = '40px';
const SIDEBAR_DEFAULT_WIDTH = '250px';

type ShellLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  headerHeight?: string;
  footerHeight?: string;
  sidebarWidth?: string;
};

export default function ShellLayout({
  header,
  sidebar,
  footer,
  children,
  headerHeight = HEADER_DEFAULT_HEIGHT,
  footerHeight = FOOTER_DEFAULT_HEIGHT,
  sidebarWidth = SIDEBAR_DEFAULT_WIDTH,
}: ShellLayoutProps) {
  const hHeight = header ? headerHeight : '0px';
  const fHeight = footer ? footerHeight : '0px';
  const sWidth = sidebar ? sidebarWidth : '0px';

  return (
    <div className="shell-layout-main">
      <header className="shell-layout-header" style={{ height: hHeight }}>
        {header}
      </header>
      
      <div className="shell-layout-inner-layer">
        <aside className="shell-layout-aside" style={{
            width: sWidth,
            top: hHeight,
            height: `calc(100vh - ${hHeight} - ${fHeight})`,
          }}>
          {sidebar}
        </aside>

        <main className="shell-layout-content">
          {children}
        </main>
      </div>

      <footer className="shell-layout-footer" style={{ height: fHeight }}>
        {footer}
      </footer>
    </div>
  );
}