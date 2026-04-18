import { Outlet } from 'react-router-dom';

import './HomeRoot.scss'

export default function HomeRoot() {
  return (
    <div>
      <h1>Home Layout</h1>

      <Outlet />
    </div>
  )
}
