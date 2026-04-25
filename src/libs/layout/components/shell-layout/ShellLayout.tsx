import { useRef, type PropsWithChildren, type ReactNode } from 'react';

import { useLayoutDimensions } from './hooks/use-layout-dimensions.hook';

import './ShellLayout.scss';

type ShellLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  subheader?: ReactNode; // New Prop
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function ShellLayout({ 
  header, 
  subheader, 
  sidebar, 
  footer, 
  children 
}: ShellLayoutProps) {
  const headerRef = useRef<HTMLElement>(null);
  const subheaderRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // Pass refs in the order the hook expects: [header, subheader, footer, sidebar]
  const dims = useLayoutDimensions([headerRef, subheaderRef, footerRef, sidebarRef]);

  // The combined offset for everything below the headers
  const totalTopOffset = dims.headerHeight + dims.subheaderHeight;

  return (
    <div className="shell-layout-main">
      <header className="shell-layout-header"
        ref={headerRef}
      >
        {header}
      </header>

      <header className="shell-layout-subheader"
        ref={subheaderRef} 
        style={{ top: `${dims.headerHeight}px` }}
      >
        {subheader}
        
        <div id="shell-layout-subheader-portal-root"></div>
      </header>

      <div className="shell-layout-inner-layer">
        <aside className="shell-layout-aside"
          ref={sidebarRef}
          style={{
            top: `${totalTopOffset}px`,
            height: `calc(100vh - ${totalTopOffset}px - ${dims.footerHeight}px)`,
          }}
        >
          {sidebar}
        </aside>

        <main className="shell-layout-content">
          {children}
        </main>
      </div>

      <footer className="shell-layout-footer"
        ref={footerRef}
      >
        {footer}
      </footer>
    </div>
  );
}