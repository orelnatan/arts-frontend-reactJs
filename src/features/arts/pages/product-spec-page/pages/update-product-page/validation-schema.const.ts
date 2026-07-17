import { hasLength, type FormValidateInput } from '@mantine/form'

import type { ProductFormValues } from './product-form-values.interface'

export const VALIDATION_SCHEMA: FormValidateInput<ProductFormValues> = {
  name: (value: string) => {
    return hasLength({ min: 3, max: 35 }, 'validation.name-length')(value)
  },
  description: (value: string) => {
    return hasLength(
      { min: 15, max: 250 },
      'validation.description-length'
    )(value)
  },
  height: (value: number) => {
    return (
      (typeof value !== 'number' || isNaN(value)
        ? 'validation.height-required'
        : null) ||
      (value <= 0 ? 'validation.height-positive' : null) ||
      (value > 10000 ? 'validation.height-too-large' : null)
    )
  },
  weight: (value: number) => {
    return (
      (typeof value !== 'number' || isNaN(value)
        ? 'validation.weight-required'
        : null) ||
      (value <= 0 ? 'validation.weight-positive' : null) ||
      (value > 50000 ? 'validation.weight-too-heavy' : null)
    )
  },
  width: (value: number) => {
    return (
      (typeof value !== 'number' || isNaN(value)
        ? 'validation.width-required'
        : null) ||
      (value <= 0 ? 'validation.width-positive' : null) ||
      (value > 10000 ? 'validation.width-too-large' : null)
    )
  },
  price: (value: number) => {
    return (
      (typeof value !== 'number' || isNaN(value)
        ? 'validation.price-required'
        : null) ||
      (value < 0 ? 'validation.price-negative' : null) ||
      (value > 1000000 ? 'validation.price-too-high' : null)
    )
  },
}
