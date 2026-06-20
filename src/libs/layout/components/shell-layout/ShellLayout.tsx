import type { ReactNode } from 'react';

import { AppShell } from '@mantine/core';

interface ShellLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  headerOpenedHeight?: number; // Height when header is OPEN
  headerClosedHeight?: number; // Height when header is CLOSED
  headerOpen?: boolean;         // Controls header state
  navbarOpenedWidth?: number;  // Width when navbar is OPEN
  navbarClosedWidth?: number;  // Width when navbar is CLOSED
  navbarOpen?: boolean;         // Controls navbar state
  asideOpenedWidth?: number;   // Width when aside is OPEN
  asideClosedWidth?: number;   // Width when aside is CLOSED
  asideOpen?: boolean;         // Controls aside state
}

export default function ShellLayout({ 
  children,
  header,
  navbar, 
  aside,
  footer, 
  headerOpenedHeight = 0,
  headerClosedHeight = 0,
  headerOpen = false,
  navbarOpenedWidth = 0,
  navbarClosedWidth = 0, 
  navbarOpen = false,
  asideOpenedWidth = 0,
  asideClosedWidth = 0,
  asideOpen = false,
}: ShellLayoutProps) {  

  // Calculate dynamic dimensions based on open/closed states
  const headerHeight = headerOpen ? headerOpenedHeight : headerClosedHeight;
  const navbarWidth = navbarOpen ? navbarOpenedWidth : navbarClosedWidth;
  const asideWidth = asideOpen ? asideOpenedWidth : asideClosedWidth;

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
      transitionDuration={300}
      transitionTimingFunction="ease"
      footer={{ height: footer ? 60 : 0 }}
    >
      <AppShell.Header
        style={{
          transition: 'height 300ms ease',
          overflow: 'hidden',
        }}
      >
        {header}
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          transition: 'width 300ms ease',
          overflow: 'hidden',
        }}
      >
        {navbar}
      </AppShell.Navbar>

      <AppShell.Aside
        style={{
          transition: 'width 300ms ease', 
          overflow: 'hidden', 
        }}
      >
        {aside}
      </AppShell.Aside>

      <AppShell.Main style={{ display: 'flex' }}>
        {children}
      </AppShell.Main>

      <AppShell.Footer>
        {footer}
      </AppShell.Footer>
    </AppShell>
  );
}