import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@arts/core';
import type { ListItem } from "@arts/shared/models";
import { logo, language, moon, statistics, settings, profile, disconnect } from '@arts/assets/images';

import { SvgIcon } from '../svg-icon';
import { MenuBar } from '../menu-bar';
import { UserThumbnail } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

const LANGUAGE_MENU: ListItem[] = [
  {
    id: 'lang-english',
    label: 'English',
  },
  {
    id: 'lang-hebrew',
    label: 'Hebrew',
  }
]

const USER_MENU: ListItem[] = [
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
      color: 'var(--color-error)',
      actionKey: 'handleLogout',
    }
]

export default function AppNavbar({ children }: AppNavbarProps) {
  const { user, disconnect } = useAuthContext();
  const navigate = useNavigate();

  const userMenuActions: Record<string, () => void> = {
    handleLogout: () => {
      disconnect();
      navigate('/auth');
    }
  };

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
          <MenuBar 
            items={LANGUAGE_MENU}
            onSelect={item => console.log("Selected item:", item)}
            position='top-end'>
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
          <MenuBar 
            items={USER_MENU} 
            onSelect={
              item => item.actionKey && userMenuActions[item.actionKey]?.()
            }
            position='top-end'
          >
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
