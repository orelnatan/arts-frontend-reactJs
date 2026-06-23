import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchBrands } from '../../hooks';
import { ArtsHeader, EntityCard } from '../../components';

import './Brands.scss';

export default function Brands() {  
  const { brands, loading, error } = useFetchBrands();
  const navigate = useNavigate();

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

  const handleNaviagation = (brandId: number) => {
    navigate(`${brandId}/categories`)
  }

  return (
    <PageLayout header={
      <ArtsHeader
        keyPrefix='brands-page'
        title='header' /> 
      }
    >
      <div className='brands-page-main'>
        {loading && <p>Loading...</p>}

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
                view={() => handleNaviagation(brand.id)}
              />
            ))}
          </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}