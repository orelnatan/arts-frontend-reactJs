import { useState, useCallback } from 'react'

import { updateLocale } from '../api'
import type { Locale, UserUpdateSuccess } from '../models'

export const useUpdateLocale = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerUpdate = useCallback(
    async (locale: Locale): Promise<UserUpdateSuccess> => {
      setLoading(true)
      setError(null)

      try {
        const data = await updateLocale(locale)

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
