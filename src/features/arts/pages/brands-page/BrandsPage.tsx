import { useEffect, useMemo, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchBrands } from '../../hooks';
import { filterEntities } from '../../utils';
import { ArtsHeader, EntityCard } from '../../components';

import './BrandsPage.scss';

export default function BrandsPage() {  
  const { brands, loading, error } = useFetchBrands();
  const [keyword, setKeyword] = useState(''); 
  const navigate = useNavigate();

   const filteredBrands = useMemo(() => {
    return filterEntities(brands, keyword);
  }, [brands, keyword]);

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
        key="brands-header"
        keyPrefix='brands-page'
        title='header'
        search={setKeyword} /> 
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
            {filteredBrands.map(brand => (
              <EntityCard 
                key={brand.id}
                entity={brand} 
                highlightQuery={keyword}
                view={() => handleNaviagation(brand.id)}
              />
            ))}
          </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}