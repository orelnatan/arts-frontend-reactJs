import { Outlet } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import {
  AuthProvider,
  DirectionProvider,
  LocaleProvider,
  NavigationProvider,
  ThemeProvider,
} from './core'
import { LayoutProvider } from './libs/layout'
import { UserAcessProvider } from './libs/user-access'

const MANTINE_CONFIG = createTheme({
  fontFamily: 'heebo-regular',
})

// Wrapper layout route that renders providers INSIDE the router context
export function AppRootProviders() {
  return (
    <AuthProvider>
      <UserAcessProvider>
        <LocaleProvider>
          <DirectionProvider>
            <ThemeProvider>
              <MantineProvider theme={MANTINE_CONFIG}>
                <LayoutProvider>
                  <NavigationProvider>
                    <Notifications />
                    <Outlet />
                  </NavigationProvider>
                </LayoutProvider>
              </MantineProvider>
            </ThemeProvider>
          </DirectionProvider>
        </LocaleProvider>
      </UserAcessProvider>
    </AuthProvider>
  )
}
