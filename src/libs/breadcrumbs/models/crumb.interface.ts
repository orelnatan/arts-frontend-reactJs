import type { Params } from 'react-router-dom'

export interface Crumb {
  id: (params: Params) => string
  path: string
  url?: string
  label?: string
  image?: string
  icon?: string
  color?: string
  hidden?: boolean
  namespace?: string
  keyPrefix?: string
  disabled?: boolean
  cacheKey?: (params: Params) => string
  resolve?: (params: Params) => Promise<Partial<Crumb>>
}
