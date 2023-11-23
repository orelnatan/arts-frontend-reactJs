import React, { ReactElement } from 'react';

import { LayoutHeader } from '../layout-header';
import { LayoutSidebar } from '../layout-sidebar';
import { LayoutFooter } from '../layout-footer';

import './root-layout.scss';

type RootLayoutProps = {
  forRoot?: boolean;
  children: ReactElement[] | ReactElement;
};

const LAYOUT: Record<string, ReactElement> = {
  header: <React.Fragment></React.Fragment>,
  sidebar: <React.Fragment></React.Fragment>,
  content: <React.Fragment></React.Fragment>,
  footer: <React.Fragment></React.Fragment>,
}

export function RootLayout(props: RootLayoutProps) {
  React.Children.forEach(props.children, (child: ReactElement) => {
    if(child.type === LayoutHeader) {
      LAYOUT.header = child;
    } else if(child.type === LayoutSidebar) {
      LAYOUT.sidebar = child;
    } else if(child.type === LayoutFooter) {
      LAYOUT.footer = child;
    } else {
      LAYOUT.content = child;
    }
  });

  return (
      <div className="root-layout-main" style={{ position: props.forRoot ? 'absolute' : 'static' }}>
        <div className="layout-top">
          <div className="layout-header-container">
            <header>
              { LAYOUT.header }
            </header>
          </div>
      </div>

      <div className="layout-body">
        <div className="layout-sidebar-container">
          <aside>
            { LAYOUT.sidebar }
          </aside>
        </div>

        <div className="inner-content-container">
          <section>
            { LAYOUT.content }
          </section>
        </div>
      </div>

      <div className="layout-bottom">
        <div className="layout-footer-container">
          <footer>
            { LAYOUT.footer }
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
