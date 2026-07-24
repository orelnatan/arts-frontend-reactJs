import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SideDrawer } from '@arts/shared/components'

interface ProductSpecDrawerProps {
  activeRoutePattern: RegExp
  returnUrl: string
}

export default function ProductSpecDrawer({
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
      <Outlet context={{ handleClose }} />
    </SideDrawer>
  )
}
