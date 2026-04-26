import { type ReactNode, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { usePortalRoots } from './hooks';

export const SHELL_LAYOUT_SUBHEADER_ROOT_ID = 'shell-layout-sub-header-portal-root';
export const SHELL_LAYOUT_SUBSIDEBAR_ROOT_ID = 'shell-layout-sub-sidebar-portal-root';
export const SHELL_LAYOUT_SUBFOOTER_ROOT_ID = 'shell-layout-sub-footer-portal-root';

type PageLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function PageLayout({ children, header, sidebar, footer }: PageLayoutProps) {
  const roots = usePortalRoots([
    SHELL_LAYOUT_SUBHEADER_ROOT_ID,
    SHELL_LAYOUT_SUBSIDEBAR_ROOT_ID,
    SHELL_LAYOUT_SUBFOOTER_ROOT_ID,
  ]);

  const headerRoot = roots[SHELL_LAYOUT_SUBHEADER_ROOT_ID];
  const sidebarRoot = roots[SHELL_LAYOUT_SUBSIDEBAR_ROOT_ID];
  const footerRoot = roots[SHELL_LAYOUT_SUBFOOTER_ROOT_ID];

  return (
    <>
      {/* Teleport Header content */}
      {header && headerRoot && createPortal(header, headerRoot)}

      {/* Teleport Sidebar content */}
      {sidebar && sidebarRoot && createPortal(sidebar, sidebarRoot)}

      {/* Render Page Content normally in the <main> tag of ShellLayout */}
      {children}

      {/* Teleport Footer content */}
      {footer && footerRoot && createPortal(footer, footerRoot)}
    </>
  );
}