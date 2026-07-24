import type { Product } from '../models'

// Pure utility to replace an item in an array by ID
export const updateListItem = (
  list: Product[] = [],
  updatedItem: Product
): Product[] =>
  list.map((item) => (item.id === updatedItem.id ? updatedItem : item))

// Pure utility to update a product inside the products record dictionary
export const updateProductsRecord = (
  prev: Record<number, Product[]>,
  updatedProduct: Product
): Record<number, Product[]> => {
  const familyId = updatedProduct.familyId
  if (!prev[familyId]) return prev

  return {
    ...prev,
    [familyId]: updateListItem(prev[familyId], updatedProduct),
  }
}
