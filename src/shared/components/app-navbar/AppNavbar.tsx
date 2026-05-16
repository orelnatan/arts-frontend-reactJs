import type { ReactNode } from 'react';

import { useAuth } from '@arts/core';
import type { ListItem } from "@arts/shared/models";
import { logo, language, moon, statistics, settings, profile, disconnect } from '@arts/assets/images';

import { SvgIcon } from '../svg-icon';
import { MenuBar } from '../menu-bar';
import { UserThumbnail } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

const languageItems: ListItem[] = [
  {
    id: 'lang-english',
    label: 'English',
  },
  {
    id: 'lang-hebrew',
    label: 'Hebrew',
  }
]

const systemItems: ListItem[] = [
  {
    id: 'system-profile',
    label: 'Profile',
    icon: <SvgIcon icon={profile} />,
  },
   {
    id: 'system-statistics',
    label: 'Settings',
    icon: <SvgIcon icon={settings} />,
  },
  {
    id: 'system-settings',
    label: 'Statistics',
    icon: <SvgIcon icon={statistics} />,
  },
  {
    id: 'system-logout',
    label: 'Logout',
    icon: <SvgIcon icon={disconnect} />,
    color: 'var(--color-error)'
  }
]

export default function AppNavbar({ children }: AppNavbarProps) {
  const { user } = useAuth();

  return (
    <div className='app-navbar-main'>
      <div className='app-navbar-logo'>
        <img src={logo} alt="logo" width={38} />
      </div>
      
      <div className='app-navbar-content'>
        {children}
      </div>

      <div className='app-navbar-system-controls'>
        <div className='control-system-language font-size-20'>
          <MenuBar items={languageItems} position='top-end'>
            <SvgIcon 
              icon={language}
              style={{ cursor: "pointer" }}
            />
          </MenuBar>
        </div>

        <div className='control-system-theme font-size-20'>
          <SvgIcon 
            icon={moon}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className='control-system-thumbnail'>
          <MenuBar items={systemItems} position='top-end'>
            <UserThumbnail 
              image={user?.avatar}
              name={user?.name}
            />
          </MenuBar>
        </div>
      </div>
    </div>
  )
}
