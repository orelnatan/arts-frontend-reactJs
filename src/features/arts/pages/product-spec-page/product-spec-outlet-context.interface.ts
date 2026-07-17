import type { Product } from '../../models'

export interface ProductSpecOutletContext {
  product?: Product
  imageChange?: (value: string | null) => void
  handleClose?: () => void
}
