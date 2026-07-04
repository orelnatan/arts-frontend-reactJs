import { Suspense, useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import { appRoutes } from './app.routes'
import { AppLayout } from './libs/layout'
import { useAuthContext } from './core'
import { INVALID_AUTH_SESSION_LABEL } from './auth.consts'

import './App.scss'

export default function App() {
  const { disconnect } = useAuthContext()

  const navigate = useNavigate()
  const routes = useRoutes(appRoutes)

  useEffect(() => {
    const logout = () => {
      disconnect()
      navigate('/auth')
    }

    window.addEventListener(INVALID_AUTH_SESSION_LABEL, logout)
    return () => window.removeEventListener(INVALID_AUTH_SESSION_LABEL, logout)
  }, [navigate, disconnect])

  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </AppLayout>
  )
}
