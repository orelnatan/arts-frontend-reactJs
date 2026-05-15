import type { ReactNode } from 'react';

import { useAuth } from '@arts/core';
import { logo } from '@arts/assets/images';

import { UserThumbnail } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

export default function AppNavbar({ children }: AppNavbarProps) {
  const { user } = useAuth()

  return (
    <div className='app-navbar-main'>
      <div className='app-navbar-logo'>
        <img src={logo} alt="logo" width={38} />
      </div>
      
      <div className='app-navbar-content'>
        {children}
      </div>

      <div className='app-navbar-user-thumbnail'>
        <UserThumbnail image={user?.avatar} name={user?.name} />
      </div>
    </div>
  )
}
