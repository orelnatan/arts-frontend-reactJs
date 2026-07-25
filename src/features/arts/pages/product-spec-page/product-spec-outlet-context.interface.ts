import type { Product } from '../../models'

export interface ProductSpecOutletContext {
  product?: Product
  closeOnFavoriteToggle?: boolean
  closeOnProductUpdate?: boolean
  imageChange?: (value: string | null) => void
  handleClose?: () => void
}
