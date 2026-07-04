import { useState, useCallback } from 'react'

import { updateTheme } from '../api'
import type { Theme, UserUpdateSuccess } from '../models'

export const useUpdateTheme = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerUpdate = useCallback(
    async (theme: Theme): Promise<UserUpdateSuccess> => {
      setLoading(true)
      setError(null)

      try {
        const data = await updateTheme(theme)

        return data
      } catch (err: unknown) {
        setError(String(err))

        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { triggerUpdate, loading, error }
}
