import { useContext } from 'react'

import { UserAccessContext } from '../contexts'

export const useUserAccessContext = () => {
  const context = useContext(UserAccessContext)

  if (!context) {
    throw new Error(
      'useUserAccessContext must be used within a UserAcessProvider'
    )
  }

  return context
}
