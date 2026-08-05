import { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import { appRoutes } from './app.routes'
import { AppLayout } from './libs/layout'
import { useAuthContext } from './core'
import { INVALID_AUTH_SESSION_LABEL } from './auth.consts'

import './App.scss'

export default function App() {
  const { disconnect } = useAuthContext()
  const routes = useRoutes(appRoutes)

  // Event Listener for Invalid Auth Sessions
  useEffect(() => {
    const handleInvalidSession = () => {
      disconnect()
    }

    window.addEventListener(INVALID_AUTH_SESSION_LABEL, handleInvalidSession)
    return () =>
      window.removeEventListener(
        INVALID_AUTH_SESSION_LABEL,
        handleInvalidSession
      )
  }, [disconnect])

  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </AppLayout>
  )
}
