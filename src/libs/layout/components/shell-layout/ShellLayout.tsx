import type { ReactNode } from 'react';
import { AppShell } from '@mantine/core';

interface ShellLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  headerHeight?: number;
  navbarWidth?: number;
  asideWidth?: number;
}

export default function ShellLayout({ 
  children,
  header,
  navbar, 
  aside,
  footer, 
  headerHeight = 0, 
  navbarWidth = 0,
  asideWidth = 0
}: ShellLayoutProps) {  
  return (
    <AppShell
      layout="alt"
      withBorder={false}
      header={{ height: header ? headerHeight : 0 }}
      navbar={{
        width: navbar ? navbarWidth : 0,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      aside={{
        width: aside ? asideWidth : 0,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      footer={{ height: footer ? 60 : 0 }}
    >
      <AppShell.Header>
        {header}
      </AppShell.Header>

      <AppShell.Navbar>
        {navbar}
      </AppShell.Navbar>

      <AppShell.Aside>
        {aside}
      </AppShell.Aside>

      <AppShell.Main
        style={{ 
          display: 'flex',
        }}>
          {children}
      </AppShell.Main>

      <AppShell.Footer>
        {footer}
      </AppShell.Footer>
    </AppShell>
  );
}