import { useEffect } from 'react';

import { PageLayout } from '@arts/libs/layout';

import { useFetchBrands } from '../../hooks';

import './Brands.scss';

export default function Brands() {  
  const { triggerFetch, loading, error } = useFetchBrands();
  
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await triggerFetch();

        console.log('Brands:', data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      }
    };

    loadBrands();
  }, [triggerFetch]);

  return (
    <PageLayout>
      <div>
        This is Brands page
      </div>
    </PageLayout>
  )
}

