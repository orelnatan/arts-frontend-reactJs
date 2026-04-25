import { useRef, type PropsWithChildren, type ReactNode } from 'react';

import { useLayoutDimensions } from './hooks/use-layout-dimensions.hook';

import './ShellLayout.scss';

type ShellLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function ShellLayout({ header, sidebar, footer, children }: ShellLayoutProps) {
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const dims = useLayoutDimensions([headerRef, footerRef, sidebarRef]);

  return (
    <div className="shell-layout-main">
      <header className="shell-layout-header" ref={headerRef}>
        {header}
        
        <div id="shell-layout-sub-header-portal-root">
          {/* Target for PageLayout.Header content via Portals */}
        </div>
      </header>

      <div className="shell-layout-inner-layer">
        <aside className="shell-layout-aside"
          ref={sidebarRef}
          style={{
            top: `${dims.headerHeight}px`,
            height: `calc(100vh - ${dims.headerHeight}px - ${dims.footerHeight}px)`,
          }}
        >
          {sidebar}

          <div id="shell-layout-sub-sidebar-portal-root">
            {/* Target for PageLayout.Sidebar content via Portals */}
          </div>
        </aside>

        <main className="shell-layout-content">
          {children}
        </main>
      </div>

      <footer className="shell-layout-footer" 
        ref={footerRef}
      >
        <div id="shell-layout-sub-footer-portal-root">
          {/* Target for PageLayout.Footer content via Portals */}
        </div>

        {footer}
      </footer>
    </div>
  );
}