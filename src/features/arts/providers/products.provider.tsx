import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'

import { ProductsContext } from '../contexts'
import { fetchProducts } from '../api'
import type { Product } from '../models'
import {
  useFavoritesContext,
  useFetchProduct,
  useFetchProductsByIds,
} from '../hooks'

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const {
    favoriteIds,
    addFavoriteId,
    removeFavoriteId,
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
  const [favoritesLoaded, setFavoritesLoaded] = useState<boolean>(false)

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
    if (favoritesLoaded || !favoriteIds.length) return

    const loadFavoriteProducts = async () => {
      try {
        const response = await triggerFetchProductsByIds(favoriteIds)
        setFavorites(response)

        setFavoritesLoaded(true)
      } catch (err) {
        setErrorFetchingFavorites(String(err))
      }
    }

    loadFavoriteProducts()
  }, [triggerFetchProductsByIds, favoriteIds, favorites, favoritesLoaded])

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
      familyId: number
    ): Promise<Product | undefined> => {
      if (isNaN(productId)) return undefined

      setErrorFetchingProduct(null)
      const cachedProduct =
        getProductFromRecords(products, productId, familyId) ??
        getProductFromFavorites(favorites, productId)

      if (cachedProduct) {
        setProduct(cachedProduct)
        return
      }

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

  const updateProduct = useCallback((product: Product) => {
    setProducts((current) => updateRecordProduct(current, product))
    setFavorites((current) => updateFavoriteProduct(current, product))
  }, [])

  const deleteProduct = useCallback((productId: number, familyId: number) => {
    setProducts((current) => ({
      ...current,
      [familyId]: (current[familyId] ?? []).filter(
        (product) => product.id !== productId
      ),
    }))
  }, [])

  const removeFavorite = useCallback(
    (productId: number) => {
      removeFavoriteId(productId)

      setFavorites((current) =>
        current.filter((product) => product.id !== productId)
      )
    },
    [removeFavoriteId]
  )

  const addFavorite = useCallback(
    (product: Product) => {
      addFavoriteId(product.id)

      setFavorites((current) => [...current, product])
    },
    [addFavoriteId]
  )

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
      removeFavorite,
      addFavorite,
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
      removeFavorite,
      addFavorite,
    ]
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

// Pure utility functions

/**
 * Updates an existing product inside its family record.
 */
const updateRecordProduct = (
  products: Record<number, Product[]>,
  product: Product
): Record<number, Product[]> => ({
  ...products,
  [product.familyId]: (products[product.familyId] ?? []).map((item) =>
    item.id === product.id ? product : item
  ),
})

/**
 * Updates an existing product in the favorites list.
 */
const updateFavoriteProduct = (
  favorites: Product[],
  product: Product
): Product[] =>
  favorites.map((item) => (item.id === product.id ? product : item))

/**
 * Returns a product from the family records by its ID.
 */
const getProductFromRecords = (
  productsMap: Record<number, Product[]>,
  productId: number,
  familyId: number
): Product | undefined => {
  return productsMap[familyId]?.find((product) => product.id === productId)
}

/**
 * Returns a favorite product by its ID.
 */
const getProductFromFavorites = (
  favorites: Product[],
  productId: number
): Product | undefined => {
  return favorites.find((product) => product.id === productId)
}
