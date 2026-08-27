import type { Params } from 'react-router-dom'

export interface Crumb {
  id: (params: Params) => string
  path: string
  label?: string
  image?: string
  color?: string
  skip?: boolean
  namespace?: string
  keyPrefix?: string
  disabled?: boolean
  cacheKey?: (params: Params) => string
  resolve?: (params: Params) => Promise<Partial<Crumb>>
}
