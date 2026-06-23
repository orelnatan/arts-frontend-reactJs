import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchProducts } from '../../hooks';
import { ArtsHeader, EntityCard } from '../../components';

import './Products.scss';

export default function Products() {  
  const { familyId } = useParams();
  const { products, loading, error } = useFetchProducts(Number(familyId));
  const navigate = useNavigate();
 
  useEffect(() => {
    if (error) {
      errorAlert({ 
        title: (
          <Caption namespace='arts' keyPrefix='products-page'>
            fetch-products-failed
          </Caption>
        ),
        message: error, 
      });
    }
  }, [error]); 

  const handleNaviagation = (productId: number) => {
    navigate(`${productId}/product-view`)
  }

  return (
    <PageLayout header={
      <ArtsHeader
        keyPrefix='products-page'
        title='header' /> 
      }
    >
      <div className='products-page-main'>
        {loading && <p>Loading...</p>}

        <div className='products-list-container'>
          <CenteredContentShell 
              elementsWidthPx={275} 
              maxElementsPerRow={4} 
              gap={16}
            >
              {products.map(product => (
                <EntityCard 
                  key={product.id}
                  entity={product} 
                  view={() => handleNaviagation(product.id)}
                />
              ))}
            </CenteredContentShell>
        </div>

        <Outlet />
      </div>
    </PageLayout>
  )
}