import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { type Crumb } from '../../models'
import { useBreadcrumbsContext } from '../../hooks'

interface CrumbResolverProps {
  crumb: Crumb
  children: (resolvedCrumb: Crumb, loading: boolean) => ReactNode
}

export default function CrumbResolver({ crumb, children }: CrumbResolverProps) {
  const params = useParams()
  const { getCrumbData, saveCrumbData, hasCacheWithKey } =
    useBreadcrumbsContext()
  const [resolvedCrumb, setResolvedCrumb] = useState<Crumb>(crumb)
  const resolving = useRef<boolean>(false)

  /*
    Triggers async data resolution whenever the crumb definition or URL params change
  */
  useEffect(() => {
    const initCrumb = async () => {
      if (resolving.current) return

      resolving.current = true

      if (crumb.resolve) {
        try {
          const cacheKey = crumb.cacheKey
            ? String(crumb.cacheKey(params))
            : undefined

          const hasCachedData =
            cacheKey !== undefined && hasCacheWithKey(cacheKey)

          const crumbData = hasCachedData
            ? getCrumbData(cacheKey)
            : await crumb.resolve(params)

          setResolvedCrumb({ ...crumb, ...crumbData })

          if (cacheKey && !hasCachedData) {
            saveCrumbData(cacheKey, crumbData as Partial<Crumb>)
          }
        } catch (exp) {
          console.log(exp)
        } finally {
          resolving.current = false
        }
      } else {
        setResolvedCrumb(crumb)
        resolving.current = false
      }
    }

    initCrumb()
  }, [crumb, params, saveCrumbData, getCrumbData, hasCacheWithKey])

  /*
    Using React "render-props" pattern - Executes the render prop callback with the resolved breadcrumb data and current loading state
  */
  return children(resolvedCrumb, resolving.current)
}
