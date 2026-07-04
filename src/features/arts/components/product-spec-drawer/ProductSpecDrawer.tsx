import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SideDrawer } from '@arts/shared/components'

export default function ProductSpecDrawer() {
  const location = useLocation()
  const navigate = useNavigate()

  const isProductSpecActive = (): boolean => {
    // Matches .../products/[id]/product-spec exactly OR with nested sub-paths
    return /\/products\/\d+\/product-spec(\/|$)/.test(location.pathname)
  }

  const handleClose = () => {
    navigate('../products', { relative: 'path' })
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
