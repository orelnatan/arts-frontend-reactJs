import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthProvider, ThemeProvider } from './core';

import App from './App.tsx'

import './index.scss';

const config = createTheme({
  fontFamily: 'heebo-regular',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <MantineProvider theme={config}>
            <Notifications />
            <App />
          </MantineProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
