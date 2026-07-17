import { api } from '@arts/core'

import type { ImageUploadResponse } from '../models'

export const imageUpload = async (
  base64Url: string
): Promise<ImageUploadResponse> => {
  return api.POST<ImageUploadResponse>('/upload-image', {
    image: base64Url,
  })
}
