import { hasLength, type FormValidateInput } from '@mantine/form'

import type { ProductFormValues } from './product-form-values.interface'

export const VALIDATION_SCHEMA: FormValidateInput<ProductFormValues> = {
  name: (value: string) => {
    return hasLength({ min: 3, max: 35 }, 'validation.name-length')(value)
  },
}
