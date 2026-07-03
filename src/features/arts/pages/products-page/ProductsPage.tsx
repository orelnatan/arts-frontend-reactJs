import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchProducts } from '../../hooks';
import { filterEntities } from '../../utils';
import { ArtsHeader, EntityCard, ProductViewDrawer } from '../../components';

import './ProductsPage.scss';

export default function ProductsPage() {  
  const { brandId, categoryId, familyId } = useParams();
  const { products, loading, error } = useFetchProducts(Number(familyId));
  const [keyword, setKeyword] = useState(''); 
  const navigate = useNavigate();
 
  const filteredProducts = useMemo(() => {
    return filterEntities(products, keyword)
  }, [products, keyword])

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

  const showProduct = (productId: number) => {
    navigate(`${productId}/product-view`)
  }

  const redirectBack = () => {
    navigate(`/arts/brands/${brandId}/categories/${categoryId}/families`);
  }

  return (
    <PageLayout header={
      <ArtsHeader
        key='products-header'
        keyPrefix='products-page'
        title='header'
        search={setKeyword}
        redirect={redirectBack}
        withRedirectArrow /> 
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
              {filteredProducts.map(product => (
                <EntityCard 
                  key={product.id}
                  entity={product} 
                  highlightQuery={keyword}
                  view={() => showProduct(product.id)}
                />
              ))}
            </CenteredContentShell>
        </div>

        <ProductViewDrawer />
      </div>
    </PageLayout>
  )
}