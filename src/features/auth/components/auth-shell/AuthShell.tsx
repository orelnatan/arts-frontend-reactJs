import { Outlet } from 'react-router-dom';

import { ShellLayout } from '@arts/libs/layout';

import './AuthShell.scss'

export default function AuthShell() {
  return (
    <ShellLayout
      header={<div><h1>HEADER</h1></div>}
      subheader={<div><h1>SUB HEADER</h1></div>}
      sidebar={<div><h1>SIDEBAR</h1></div>}
      footer={<div><h1>FOOTER</h1></div>}
    >
      <Outlet />
    </ShellLayout>
  )
}
