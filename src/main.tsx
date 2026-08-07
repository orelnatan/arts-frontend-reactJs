import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

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

import App from './App.tsx'

import './i18n.ts'
import './index.scss'

const MANTINE_CONFIG = createTheme({
  fontFamily: 'heebo-regular',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserAcessProvider>
          <LocaleProvider>
            <DirectionProvider>
              <ThemeProvider>
                <MantineProvider theme={MANTINE_CONFIG}>
                  <LayoutProvider>
                    <NavigationProvider>
                      <Notifications />
                      <App />
                    </NavigationProvider>
                  </LayoutProvider>
                </MantineProvider>
              </ThemeProvider>
            </DirectionProvider>
          </LocaleProvider>
        </UserAcessProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
