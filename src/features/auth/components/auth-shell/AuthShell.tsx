import { Outlet } from 'react-router-dom';

import './AuthShell.scss'

export default function AuthShell() {
  return (
    <div className='auth-shell-main'>
      <h1>Auth Shell</h1>

      <Outlet />
    </div>
  )
}
