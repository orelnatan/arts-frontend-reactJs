import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { Locale, LogoutModal, Theme, useAuthContext, useLocaleContext, useThemeContext, useUpdateUser, type User } from '@arts/core';
import { logo, moon, sun } from '@arts/assets/images';
import { Caption, Spinner, SvgIcon } from '@arts/shared/components';
import { errorAlert } from '@arts/libs/alerts';

import { UserLocaleMenu, UserThumbnailMenu } from './components';

import './AppNavbar.scss'

interface AppNavbarProps {
  children?: ReactNode;
}

export default function AppNavbar({ children }: AppNavbarProps) {
  const [isThemeLoading, setIsThemeLoading] = useState(false);
  const [isLocaleLoading, setIsLocaleLoading] = useState(false);
  
  const [opened, { open, close }] = useDisclosure(false);
  const { user, disconnect } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const { locale, setLocale } = useLocaleContext();
  const { triggerUpdate } = useUpdateUser();
  const navigate = useNavigate();

  const handleThemeChange = async (theme: Theme): Promise<void> => {
    setIsThemeLoading(true);

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
      setIsThemeLoading(false);
    }
  };

  const handleLocaleChange = async (locale: Locale): Promise<void> => {
    setIsLocaleLoading(true);

    try {
      const updatedUser = await triggerUpdate({
        ...user as User,
        locale,
      });

      setLocale(updatedUser.locale);
    } catch (err) {      
      errorAlert({ 
        title: <Caption namespace='core' keyPrefix='app-navbar'>
          locale-update-failed</Caption>,
        message: (err as Error).message, 
      });
    } finally {
      setIsLocaleLoading(false);
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
          <UserLocaleMenu
            value={locale}
            loading={isLocaleLoading}
            onChange={value => 
              handleLocaleChange(value)}
          />
        </div>

        <div className='control-system-theme font-size-20'>
          {isThemeLoading ? (
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
          <UserThumbnailMenu
            user={user}
            logout={open}
          />
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
