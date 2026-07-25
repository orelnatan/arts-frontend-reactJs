import type { Product } from '../models'

/**
 * Pure utility to replace an item in an array by ID
 */
export const updateListItem = (
  list: Product[] = [],
  updatedItem: Product
): Product[] =>
  list.map((item) => (item.id === updatedItem.id ? updatedItem : item))

/**
 * Pure utility to update a product inside the products record dictionary
 */
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

/**
 * Attempts to retrieve a cached product from either state map before falling back to API.
 */
export const findCachedProduct = (
  productsMap: Record<number, Product[]>,
  favorites: Product[],
  productId: number,
  familyId?: number
): Product | undefined => {
  return (
    findProductInRecord(productsMap, productId, familyId) ??
    findProductInFavorites(favorites, productId)
  )
}

/**
 * Finds a product inside a specific family group within the products map.
 */
export const findProductInRecord = (
  productsMap: Record<number, Product[]>,
  productId: number,
  familyId?: number
): Product | undefined => {
  if (familyId === undefined) return undefined
  return productsMap[familyId]?.find((product) => product.id === productId)
}

/**
 * Finds a product in the list of favorite items.
 */
export const findProductInFavorites = (
  favorites: Product[],
  productId: number
): Product | undefined => {
  return favorites.find((product) => product.id === productId)
}
