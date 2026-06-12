import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { Direction, Locale, LogoutModal, Theme, useAuthContext, useLocaleContext, useThemeContext, useUpdateUser, type User } from '@arts/core';
import { logo, language, moon, statistics, settings, profile, disconnect, sun } from '@arts/assets/images';
import { Caption, MenuBar, Spinner, SvgIcon } from '@arts/shared/components';
import type { ListItem } from "@arts/shared/models";
import { errorAlert } from '@arts/libs/alerts';

import { UserThumbnail } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

const LANGUAGE_MENU: ListItem[] = [
  {
    id: 'lang-english',
    label: 'language-menu.english',
    value: Locale.En,
    dir: Direction.LTR,
  },
  {
    id: 'lang-hebrew',
    label: 'language-menu.hebrew',
    value: Locale.He,
    dir: Direction.RTL
  }
]

const USER_MENU: ListItem[] = [
    {
      id: 'system-profile',
      label: 'user-menu.profile-label',
      icon: <SvgIcon icon={profile} />,
    },
    {
      id: 'system-settings',
      label: 'user-menu.settings-label',
      icon: <SvgIcon icon={settings} />,
    },
    {
      id: 'system-statistics',
      label: 'user-menu.statistics-label',
      icon: <SvgIcon icon={statistics} />,
    },
    {
      id: 'system-logout',
      label: 'user-menu.logout-label',
      icon: <SvgIcon icon={disconnect} />,
      class: 'menu-bar-item-error-state',
      actionKey: 'showLogoutModal',
    }
]

export default function AppNavbar({ children }: AppNavbarProps) {
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [isLocaleChanging, setIsLocaleChanging] = useState(false);
  
  const { user, disconnect } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const { setLocale } = useLocaleContext();
  const { triggerUpdate } = useUpdateUser();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const userMenuActions: Record<string, () => void> = {
    showLogoutModal: () => {
      open();
    }
  };

  const handleThemeChange = async (theme: Theme): Promise<void> => {
    setIsThemeChanging(true);

    try {
      const updatedUser = await triggerUpdate({
        ...user as User,
        theme
      });

      setTheme(updatedUser.theme);
    } catch (err) {      
      errorAlert({ 
        title: <Caption namespace='core' keyPrefix='app-navbar'>
          theme-toggle-failed</Caption>,
        message: (err as Error).message, 
      });
    } finally {
      setIsThemeChanging(false);
    }
  };

  const handleLocaleChange = async (locale: Locale): Promise<void> => {
    setIsLocaleChanging(true);

    try {
      const updatedUser = await triggerUpdate({
        ...user as User,
        locale,
      });

      setLocale(updatedUser.locale);
    } catch (err) {      
      errorAlert({ 
        title: <Caption namespace='core' keyPrefix='app-navbar'>
          locale-change-failed</Caption>,
        message: (err as Error).message, 
      });
    } finally {
      setIsLocaleChanging(false);
    }
  }

  const handleLogout = () => {
    disconnect();
    navigate('/auth');
  }

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
            namespace='core'
            keyPrefix='app-navbar'
            disabled={isLocaleChanging}
            items={LANGUAGE_MENU}
            onSelect={item => handleLocaleChange(item.value as Locale)}
            position='top-end'
          >
            {isLocaleChanging ? (
              <Spinner size={20} color='var(--color-app-navbar-text)' />
            ) : (
              <SvgIcon 
                icon={language}
                style={{ cursor: "pointer" }}
              />
            )}
          </MenuBar>
        </div>

        <div className='control-system-theme font-size-20'>
          {isThemeChanging ? (
            <Spinner size={20} color='var(--color-app-navbar-text)' />
          ) : (
            <SvgIcon 
              icon={theme === Theme.Hyperion ? moon : sun}
              style={{ cursor: "pointer" }}
              onClick={() => handleThemeChange(
                theme === Theme.Hyperion ? Theme.Aurora : Theme.Hyperion)}
            />
          )}
        </div>

        <div className='control-system-thumbnail'>
          <MenuBar 
            namespace='core'
            keyPrefix='app-navbar'
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

      <LogoutModal 
        opened={opened} 
        onClose={close} 
        onConfirm={handleLogout} 
      />
    </div>
  )
}
