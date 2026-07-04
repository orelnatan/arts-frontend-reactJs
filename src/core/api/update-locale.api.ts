import { api } from '@arts/core'

import { Locale, type UserUpdateSuccess } from '../models'

export const updateLocale = (locale: Locale): Promise<UserUpdateSuccess> => {
  return api.PATCH<UserUpdateSuccess>('/update-locale', { locale })
}
