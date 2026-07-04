import type { Product } from '../../models'

export interface ProductSpecOutletContext {
  product?: Product
  handleClose?: () => void
}
