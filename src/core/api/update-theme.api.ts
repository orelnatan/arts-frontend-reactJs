import { api } from '@arts/core'

import { Theme, type UserUpdateSuccess } from '../models'

export const updateTheme = (theme: Theme): Promise<UserUpdateSuccess> => {
  return api.PATCH<UserUpdateSuccess>('/update-theme', { theme })
}
