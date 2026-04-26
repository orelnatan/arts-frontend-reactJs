import { type PropsWithChildren, type ReactNode } from 'react';

import './ShellLayout.scss';

type ShellLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function ShellLayout({ header, sidebar, footer, children }: ShellLayoutProps) {
  return (
    <div className="shell-layout-main">
      <aside className="shell-layout-aside">
        {sidebar}
      </aside>

      <div className="shell-layout-inner-layer">
        <header className="shell-layout-header">
          {header}
        </header>

        <main className="shell-layout-content">
          {children}
        </main>

        <footer className="shell-layout-footer">
          {footer}
        </footer>
      </div>
    </div>
  );
}