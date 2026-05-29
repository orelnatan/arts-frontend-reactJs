import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Direction, Locale, Theme, useAuthContext, useThemeContext, useUpdateUser, type User } from '@arts/core';
import { logo, language, moon, statistics, settings, profile, disconnect, sun } from '@arts/assets/images';
import { errorAlert } from '@arts/libs/alerts';
import type { ListItem } from "@arts/shared/models";

import { SvgIcon } from '../svg-icon';
import { MenuBar } from '../menu-bar';
import { Spinner } from '../spinner';
import { UserThumbnail } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

const LANGUAGE_MENU: ListItem[] = [
  {
    id: 'lang-english',
    label: 'English',
    value: Locale.En,
    dir: Direction.LTR
  },
  {
    id: 'lang-hebrew',
    label: 'Hebrew',
    value: Locale.He,
    dir: Direction.RTL
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
      class: 'menu-bar-item-error-state',
      actionKey: 'handleLogout',
    }
]

export default function AppNavbar({ children }: AppNavbarProps) {
  const { user, disconnect } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const { triggerUpdate, loading } = useUpdateUser();
  const navigate = useNavigate();

  const userMenuActions: Record<string, () => void> = {
    handleLogout: () => {
      disconnect();
      navigate('/auth');
    }
  };

  const handleThemeToggle = async (): Promise<void> => {
    const nextTheme = theme === Theme.Hyperion
    ? Theme.Aurora : Theme.Hyperion;

    try {
      const updatedUser = await triggerUpdate({
        ...user as User,
        theme: nextTheme,
      });

      setTheme(updatedUser.theme);
    } catch (err) {      
      errorAlert({ 
        title: 'Failed to toggle theme',
        message: (err as Error).message, 
      });
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
          {loading ? (
            <Spinner size={20} color='var(--color-app-navbar-text)' />
          ) : (
            <SvgIcon 
              icon={theme === Theme.Hyperion ? moon : sun}
              style={{ cursor: "pointer" }}
              onClick={handleThemeToggle}
            />
          )}
        </div>

        <div className='control-system-thumbnail'>
          <MenuBar 
            items={USER_MENU} 
            onSelect={
              item => item.actionKey && userMenuActions[item.actionKey]()
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
