import type { ReactNode } from 'react';
import { AppShell } from '@mantine/core';

interface ShellLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
}

export default function ShellLayout({ children, header, sidebar, footer }: ShellLayoutProps) {  
  return (
    <AppShell
      layout="alt"
      withBorder={false}
      header={{ height: header ? 60 : 0 }}
      navbar={{
        width: sidebar ? 285 : 0,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      footer={{ height: footer ? 60 : 0 }}
    >
      <AppShell.Header>
        {header}
      </AppShell.Header>

      <AppShell.Navbar>
        {sidebar}
      </AppShell.Navbar>

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