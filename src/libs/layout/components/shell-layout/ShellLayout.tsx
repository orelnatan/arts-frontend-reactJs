import type { PropsWithChildren, ReactNode } from 'react';
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
  return (
    <div className="shell-layout-main">
      <header className="shell-layout-header">{header}</header>

      <div className="shell-layout-inner-layer">
        <aside className="shell-layout-sidebar">{sidebar}</aside>

        <main className="shell-layout-content">{children}</main>
      </div>

      <footer className="shell-layout-footer">{footer}</footer>
    </div>
  );
}