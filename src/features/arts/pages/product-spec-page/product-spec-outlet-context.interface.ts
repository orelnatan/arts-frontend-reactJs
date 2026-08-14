import type { Product } from '../../models'
import type { ProductFormValues } from './pages'

export interface productFormState {
  hasUnsavedChanges: boolean
}

export interface ProductSpecOutletContext {
  product?: Product
  loading?: boolean
  autoSubmit?: boolean
  closeOnFavoriteToggle?: boolean
  closeOnProductUpdate?: boolean
  onImageChange?: (value: string | null) => void
  onSubmit?: (values: ProductFormValues) => void
  onAutoSubmit?: (values: ProductFormValues) => void
  onSubmitFailed?: () => void
  onChange?: (state: productFormState) => void
  onClose?: () => void
}
