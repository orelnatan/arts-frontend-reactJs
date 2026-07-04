import { useEffect, type ReactNode } from 'react'

import { DirectionContext } from '../contexts'
import { useLocaleContext } from '../hooks'
import { Direction } from '../models'
import { DIRECTION_BY_LOCALE } from '../consts'

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const { locale } = useLocaleContext()

  const direction = DIRECTION_BY_LOCALE[locale] || Direction.LTR

  useEffect(() => {
    document.documentElement.dir = direction
    document.body.dir = direction
  }, [direction])

  return (
    <DirectionContext.Provider value={{ direction }}>
      {children}
    </DirectionContext.Provider>
  )
}
