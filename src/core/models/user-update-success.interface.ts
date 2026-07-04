import type { Locale } from './locale.enum'
import type { Theme } from './theme.enum'

export interface UserUpdateSuccess {
  success: boolean
  message: string
  theme?: Theme
  locale?: Locale
}
