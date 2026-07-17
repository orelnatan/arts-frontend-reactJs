import { useState, useCallback } from 'react'

import { imageUpload } from '../api'
import type { ImageUploadResponse } from '../models'

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerUpload = useCallback(
    async (base64: string): Promise<ImageUploadResponse> => {
      setLoading(true)
      setError(null)

      try {
        const data = await imageUpload(base64)

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

  return { triggerUpload, loading, error }
}
