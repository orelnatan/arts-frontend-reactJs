import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthProvider, DirectionProvider, LocaleProvider, ThemeProvider } from './core';

import App from './App.tsx'

import './i18n.ts';
import './index.scss';
import { LayoutProvider } from './libs/layout/index.ts';

const MANTINE_CONFIG = createTheme({
  fontFamily: 'heebo-regular',
});

const TANSTACK_CONFIG = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: false, 
      refetchOnWindowFocus: false, 
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={TANSTACK_CONFIG}>
        <AuthProvider>
          <LocaleProvider>
            <DirectionProvider>
              <ThemeProvider>
                <MantineProvider theme={MANTINE_CONFIG}>
                  <LayoutProvider>
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    <Notifications />
                    <App />
                  </LayoutProvider>
                </MantineProvider>
              </ThemeProvider>
            </DirectionProvider>
          </LocaleProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
