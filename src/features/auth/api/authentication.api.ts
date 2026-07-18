import { api } from '@arts/core'

import type { LoginFormValues } from '../pages'
import { type LoginJwt } from '../models'

export const authLogin = (credentials: LoginFormValues): Promise<LoginJwt> => {
  return api.POST<LoginJwt>('/login', credentials)
}
