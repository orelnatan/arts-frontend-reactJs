import { Suspense } from 'react'
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
import { AppLayout, LayoutProvider } from './libs/layout'
import { UserAcessProvider } from './libs/user-access'
import { BreadcrumbsProvider } from './libs/breadcrumbs'

const MANTINE_CONFIG = createTheme({
  fontFamily: 'heebo-regular',
})

export default function App() {
  return (
    <AuthProvider>
      <UserAcessProvider>
        <LocaleProvider>
          <DirectionProvider>
            <ThemeProvider>
              <MantineProvider theme={MANTINE_CONFIG}>
                <LayoutProvider>
                  <BreadcrumbsProvider>
                    <NavigationProvider>
                      <Notifications />
                      <AppLayout>
                        <Suspense fallback={<div>Loading...</div>}>
                          <Outlet />
                        </Suspense>
                      </AppLayout>
                    </NavigationProvider>
                  </BreadcrumbsProvider>
                </LayoutProvider>
              </MantineProvider>
            </ThemeProvider>
          </DirectionProvider>
        </LocaleProvider>
      </UserAcessProvider>
    </AuthProvider>
  )
}
