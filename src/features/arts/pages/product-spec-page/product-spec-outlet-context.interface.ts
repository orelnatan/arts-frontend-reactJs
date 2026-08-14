import type { Product } from '../../models'
import type { ProductFormValues } from './pages'

export interface productFormState {
  value: ProductFormValues
  valid: boolean
  touched: boolean
}

export interface ProductSpecOutletContext {
  product?: Product
  loading?: boolean
  closeOnFavoriteToggle?: boolean
  closeOnProductUpdate?: boolean
  onImageChange?: (value: string | null) => void
  onSubmit?: (values: ProductFormValues) => void
  onChange?: (state: productFormState) => void
  onClose?: () => void
}
