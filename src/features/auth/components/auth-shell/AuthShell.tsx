import { Outlet } from 'react-router-dom';

import { ShellLayout } from '@arts/libs/layout';

import './AuthShell.scss'

export default function AuthShell() {
  return (
    <ShellLayout
      header={<h1>HEADER</h1>}
      sidebar={<div>SIDEBAR</div>}
      footer={<h2>FOOTER</h2>}
    >
      <Outlet />
    </ShellLayout>
  )
}
