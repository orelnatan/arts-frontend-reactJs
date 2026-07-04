import { type ReactNode } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

import {
  Locale,
  LogoutModal,
  Theme,
  useAuthContext,
  useLocaleContext,
  useThemeContext,
  useUpdateLocale,
  useUpdateTheme,
} from '@arts/core'
import { artPalette, logo, moon, sun } from '@arts/assets/images'
import { Caption, Spinner, SvgIcon } from '@arts/shared/components'
import { errorAlert } from '@arts/libs/alerts'

import { UserLocaleMenu, UserThumbnailMenu } from './components'

import './AppNavbar.scss'

const showErrorAlert = (key: string, err: unknown) => {
  errorAlert({
    title: (
      <Caption namespace="core" keyPrefix="app-navbar">
        {key}
      </Caption>
    ),
    message: (err as Error).message,
  })
}

interface AppNavbarProps {
  children?: ReactNode
}

export default function AppNavbar({ children }: AppNavbarProps) {
  const { triggerUpdate: triggerUpdateTheme, loading: isThemeLoading } =
    useUpdateTheme()
  const { triggerUpdate: triggerUpdateLocale, loading: isLocaleLoading } =
    useUpdateLocale()
  const [opened, { open, close }] = useDisclosure(false)
  const { user, disconnect } = useAuthContext()
  const { theme, setTheme } = useThemeContext()
  const { locale, setLocale } = useLocaleContext()
  const location = useLocation()
  const navigate = useNavigate()

  const handleThemeChange = async (theme: Theme): Promise<void> => {
    try {
      const data = await triggerUpdateTheme(theme)

      setTheme(data.theme as Theme)
    } catch (err) {
      showErrorAlert('theme-toggle-failed', err)
    }
  }

  const handleLocaleChange = async (locale: Locale): Promise<void> => {
    try {
      const data = await triggerUpdateLocale(locale)

      setLocale(data.locale as Locale)
    } catch (err) {
      showErrorAlert('locale-update-failed', err)
    }
  }

  const handleLogout = () => {
    disconnect()
    navigate('/auth')
  }

  const navigateArts = () => {
    navigate('/arts')
  }

  const isArtsModuleActive = (): boolean => {
    return !!matchPath({ path: '/arts', end: false }, location.pathname)
  }

  return (
    <div className="app-navbar-main">
      <div className="app-navbar-logo">
        <img src={logo} width={38} alt="logo" />
      </div>

      <div className="app-navbar-content">{children}</div>

      <div className="app-navbar-system-controls">
        <div
          className="control-system-arts font-size-20"
          style={{
            color: isArtsModuleActive()
              ? 'var(--color-app-navbar-arts-active)'
              : '',
          }}
        >
          <SvgIcon
            icon={artPalette}
            style={{ cursor: 'pointer' }}
            onClick={navigateArts}
          />
        </div>

        <div className="control-system-language font-size-20">
          <UserLocaleMenu
            value={locale}
            loading={isLocaleLoading}
            onChange={(value) => handleLocaleChange(value)}
          />
        </div>

        <div className="control-system-theme font-size-20">
          {isThemeLoading ? (
            <Spinner size={20} color="var(--color-app-navbar-text)" />
          ) : (
            <SvgIcon
              icon={theme === Theme.Hyperion ? moon : sun}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleThemeChange(
                  theme === Theme.Hyperion ? Theme.Aurora : Theme.Hyperion
                )
              }
            />
          )}
        </div>

        <div className="control-system-thumbnail">
          <UserThumbnailMenu user={user} logout={open} />
        </div>
      </div>

      <LogoutModal opened={opened} onClose={close} onConfirm={handleLogout} />
    </div>
  )
}
