import { Outlet } from 'react-router-dom';

import './AuthRoot.scss'

export default function AuthRoot() {
  return (
    <div>
      <h1>Auth Layout</h1>

      <Outlet />
    </div>
  )
}
