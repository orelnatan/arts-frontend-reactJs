import { useState, useRef, useLayoutEffect, type PropsWithChildren, type ReactNode } from 'react';

import './ShellLayout.scss';

type ShellLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function ShellLayout({
  header,
  sidebar,
  footer,
  children,
}: ShellLayoutProps) {
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  // Measure once on mount
  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.offsetWidth);
    }
  }, []); // Empty dependency array = run once after initial render

  return (
    <div className="shell-layout-main">
      <header ref={headerRef} className="shell-layout-header">
        {header}
      </header>

      <div className="shell-layout-inner-layer">
        <aside
          ref={sidebarRef}
          className="shell-layout-aside"
          style={{
            top: `${headerHeight}px`,
            width: sidebarWidth > 0 ? `${sidebarWidth}px` : 'auto',
            height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
          }}
        >
          {sidebar}
        </aside>

        <main className="shell-layout-content">
          {children}
        </main>
      </div>

      <footer ref={footerRef} className="shell-layout-footer">
        {footer}
      </footer>
    </div>
  );
}