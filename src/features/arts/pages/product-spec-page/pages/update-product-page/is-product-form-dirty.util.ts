import type { Product } from '@arts/features/arts/models'
import { decimalFormatter } from '@arts/shared/utils'

import type { ProductFormValues } from './product-form-values.interface'

export function isProductFormDirty(
  formValues: ProductFormValues,
  product: Product | undefined
): boolean {
  const keys = Object.keys(formValues) as (keyof ProductFormValues)[]

  const cleanForm = cleanObject(formValues, keys)
  const cleanProduct = cleanObject(product as ProductFormValues, keys)

  return JSON.stringify(cleanForm) !== JSON.stringify(cleanProduct)
}

function cleanObject<T extends ProductFormValues>(
  source: T,
  keys: (keyof T)[]
): Record<keyof T, string | number | null> {
  const result = {} as Record<keyof T, string | number | null>

  for (const key of keys) {
    const val = source[key]
    result[key] =
      val !== null && val !== '' && !isNaN(Number(val))
        ? decimalFormatter(Number(val), { decimalScale: 2 })
        : (val as string | number | null)
  }

  return result
}
