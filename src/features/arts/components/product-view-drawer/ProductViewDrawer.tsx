import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { SideDrawer } from '@arts/shared/components';

export default function ProductViewDrawer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isProductViewActive = (): boolean => {
    // Checks if the URL ends exactly with /products/[product-id]/product-view
    return /\/products\/\d+\/product-view\/?$/.test(location.pathname);
  };

  const handleClose = () => {
    navigate('../products', { relative: 'path' });
  };

  return (
    <SideDrawer 
      opened={isProductViewActive()} 
      onClose={handleClose} 
      offset={'var(--spaces-4)'}
      radius={'var(--corner-radius-14)'}
      withOverlay={false}
    >
      <Outlet context={{ handleClose }} />
    </SideDrawer>
  );
}