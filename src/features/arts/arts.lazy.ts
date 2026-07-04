import { lazy } from 'react'

export const ArtsLazy = lazy(() =>
  import('./components').then((m) => ({ default: m.ArtsShell }))
)
