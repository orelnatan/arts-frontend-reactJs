import { Outlet } from 'react-router-dom';

import './HomeShell.scss';

export default function HomeShell() {
  return (
    <div>
      <h1>Home Shell</h1>

      <Outlet />
    </div>
  )
}
