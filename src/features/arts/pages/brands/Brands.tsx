import { useEffect } from 'react'; 

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchBrands } from '../../hooks';
import { EntityCard } from '../../components';

import './Brands.scss';

export default function Brands() {  
  const { brands, loading, error } = useFetchBrands();

  useEffect(() => {
    if (error) {
      errorAlert({ 
        title: (
          <Caption namespace='arts' keyPrefix='brands-page'>
            fetch-brands-failed
          </Caption>
        ),
        message: error, 
      });
    }
  }, [error]); 

  return (
    <PageLayout>
      <div className='brands-page-main'>
        <h1 className='assistant-bold'>
          <Caption namespace='arts' keyPrefix='brands-page'>
            header
          </Caption>
        </h1>

        {loading && <p>Loading brands...</p>}

        <div className='brands-list-container'>
          <CenteredContentShell 
            elementsWidthPx={275} 
            maxElementsPerRow={4} 
            gap={16}
          >
            {brands.map(brand => (
              <EntityCard 
                key={brand.id}
                entity={brand} 
              />
            ))}
          </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}