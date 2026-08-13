import type { Product } from '../../models'
import type { ProductFormValues } from './pages'

export interface ProductSpecOutletContext {
  product?: Product
  loading?: boolean
  closeOnFavoriteToggle?: boolean
  closeOnProductUpdate?: boolean
  onImageChange?: (value: string | null) => void
  onSubmit?: (values: ProductFormValues) => void
  onClose?: () => void
}
