import { useEffect, type PropsWithChildren, type ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { ShellOutletContext } from '../../models';

import './PageLayout.scss';

type PageLayoutProps = PropsWithChildren & {
  header?: ReactNode;
  headerHeight?: number;
  noPadding?: boolean;
  fullHeight?: boolean;
};

export default function PageLayout({ 
  children,
  header = null,
  headerHeight = 0,
  noPadding,
  fullHeight
}: PageLayoutProps) {
  const context = useOutletContext<ShellOutletContext>();
  
  useEffect(() => {
    if (context) {
      context.setChildHeaderContent?.(header);
      context.setChildHeaderHeight?.(headerHeight);
    }

    return () => {
      if (context) {
        context.setChildHeaderContent?.(null);
        context.setChildHeaderHeight?.(0);
      }
    };
  }, [header, headerHeight, context]);

  return (
    <div className="page-layout-main" style={{
      padding: noPadding ? 0 : 'auto',
      height: fullHeight ? 'var(--full-host-height)' : 'auto'
    }}>
      {children}
    </div>
  );
}