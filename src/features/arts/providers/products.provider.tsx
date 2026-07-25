import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'

import { ProductsContext } from '../contexts'
import {
  useFavoritesContext,
  useFetchProduct,
  useFetchProductsByIds,
} from '../hooks'
import { fetchProducts } from '../api'
import type { Product } from '../models'
import {
  findCachedProduct,
  updateListItem,
  updateProductsRecord,
} from './providers-utils'

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { favoriteIds, loading: loadingFavoritesIds } = useFavoritesContext()
  const { triggerFetchProductsByIds, loading: loadingFavorites } =
    useFetchProductsByIds()
  const { getProduct, loading: loadingProduct } = useFetchProduct()
  const [favorites, setFavorites] = useState<Product[]>([])
  const [products, setProducts] = useState<Record<number, Product[]>>({})
  const [product, setProduct] = useState<Product | null>(null)
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        const response = await triggerFetchProductsByIds(favoriteIds)
        setFavorites(response)
      } catch (err) {
        setError(String(err))
      }
    }

    loadFavoriteProducts()
  }, [triggerFetchProductsByIds, setFavorites, favoriteIds])

  const loadProducts = useCallback(
    async (familyId: number) => {
      if (products[familyId]) return

      setLoadingProducts(true)
      setError(null)

      try {
        const data = await fetchProducts(familyId)
        setProducts((prev) => ({
          ...prev,
          [familyId]: data,
        }))
      } catch (err) {
        setError(String(err))
      } finally {
        setLoadingProducts(false)
      }
    },
    [products]
  )

  const loadProduct = useCallback(
    async (
      productId: number,
      familyId?: number
    ): Promise<Product | undefined> => {
      if (isNaN(productId)) return undefined

      setError(null)
      // Check cached state first (record map or favorites)
      const cachedProduct = findCachedProduct(
        products,
        favorites,
        productId,
        familyId
      )
      if (cachedProduct) {
        setProduct(cachedProduct)
        return cachedProduct
      }

      // Fallback to network request
      try {
        const fetchedProduct = await getProduct(productId)
        setProduct(fetchedProduct)
        return fetchedProduct
      } catch (err) {
        setError(String(err))
        return undefined
      }
    },
    [products, favorites, getProduct]
  )

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) => updateProductsRecord(prev, updatedProduct))
    setFavorites((prev) => updateListItem(prev, updatedProduct))
  }, [])

  const value = useMemo(
    () => ({
      products,
      product,
      favorites,
      loadingProducts,
      loadingProduct,
      loadingFavorites,
      loadingFavoritesIds,
      error,
      loadProducts,
      loadProduct,
      updateProduct,
    }),
    [
      products,
      product,
      favorites,
      loadingProducts,
      loadingProduct,
      loadingFavorites,
      loadingFavoritesIds,
      error,
      loadProducts,
      loadProduct,
      updateProduct,
    ]
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
