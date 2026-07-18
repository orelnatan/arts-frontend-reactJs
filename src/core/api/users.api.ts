import { api } from '@arts/core'

import { type User } from '../models'

export const fetchUser = (): Promise<User> => {
  return api.GET<User>('/fetch-user')
}
