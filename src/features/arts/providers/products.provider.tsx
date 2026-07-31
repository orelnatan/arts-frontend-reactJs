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
  const {
    favoriteIds,
    error: errorFetchingFavoritesIds,
    loading: loadingFavoritesIds,
  } = useFavoritesContext()
  const { triggerFetchProductsByIds, loading: loadingFavorites } =
    useFetchProductsByIds()
  const { getProduct, loading: loadingProduct } = useFetchProduct()
  const [favorites, setFavorites] = useState<Product[]>([])
  const [products, setProducts] = useState<Record<number, Product[]>>({})
  const [product, setProduct] = useState<Product | null>(null)
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)

  const [errorFetchingProducts, setErrorFetchingProducts] = useState<
    string | null
  >(null)
  const [errorFetchingProduct, setErrorFetchingProduct] = useState<
    string | null
  >(null)
  const [errorFetchingFavorites, setErrorFetchingFavorites] = useState<
    string | null
  >(null)

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        const response = await triggerFetchProductsByIds(favoriteIds)
        setFavorites(response)
      } catch (err) {
        setErrorFetchingFavorites(String(err))
      }
    }

    loadFavoriteProducts()
  }, [triggerFetchProductsByIds, setFavorites, favoriteIds])

  const loadProducts = useCallback(
    async (familyId: number) => {
      if (products[familyId]) return

      setLoadingProducts(true)
      setErrorFetchingProducts(null)

      try {
        const data = await fetchProducts(familyId)
        setProducts((prev) => ({
          ...prev,
          [familyId]: data,
        }))
      } catch (err) {
        setErrorFetchingProducts(String(err))
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

      setErrorFetchingProduct(null)
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
        setErrorFetchingProduct(String(err))
        return undefined
      }
    },
    [products, favorites, getProduct]
  )

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) => updateProductsRecord(prev, updatedProduct))
    setFavorites((prev) => updateListItem(prev, updatedProduct))
  }, [])

  const deleteProduct = useCallback((productId: number) => {
    setProducts((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([fid, list]) => [
          fid,
          list.filter((product) => product.id !== productId),
        ])
      )
    )

    setProduct((prev) => (prev?.id === productId ? null : prev))
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
      errorFetchingProduct,
      errorFetchingProducts,
      errorFetchingFavorites,
      errorFetchingFavoritesIds,
      loadProducts,
      loadProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      product,
      favorites,
      loadingProducts,
      loadingProduct,
      loadingFavorites,
      loadingFavoritesIds,
      errorFetchingProduct,
      errorFetchingProducts,
      errorFetchingFavorites,
      errorFetchingFavoritesIds,
      loadProducts,
      loadProduct,
      updateProduct,
      deleteProduct,
    ]
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
