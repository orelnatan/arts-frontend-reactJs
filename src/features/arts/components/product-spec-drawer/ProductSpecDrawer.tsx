import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SideDrawer } from '@arts/shared/components'

import type { ProductSpecOutletContext } from '../../pages'

interface ProductSpecDrawerProps {
  activeRoutePattern: RegExp
  returnUrl: string
  closeOnFavoriteToggle?: boolean
  closeOnProductUpdate?: boolean
}

export default function ProductSpecDrawer({
  closeOnFavoriteToggle,
  closeOnProductUpdate,
  activeRoutePattern,
  returnUrl,
}: ProductSpecDrawerProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isProductSpecActive = (): boolean => {
    return activeRoutePattern.test(location.pathname)
  }

  const handleClose = () => {
    navigate(returnUrl, { relative: 'path' })
  }

  return (
    <SideDrawer
      opened={isProductSpecActive()}
      onClose={handleClose}
      offset={'var(--spaces-4)'}
      radius={'var(--corner-radius-14)'}
      withOverlay={false}
    >
      <Outlet
        context={
          {
            handleClose,
            closeOnFavoriteToggle,
            closeOnProductUpdate,
          } satisfies ProductSpecOutletContext
        }
      />
    </SideDrawer>
  )
}
