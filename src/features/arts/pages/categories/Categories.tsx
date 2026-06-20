import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchCategories } from '../../hooks';
import { EntityCard } from '../../components';

import './Categories.scss';

export default function Categories() {  
  const { brandId } = useParams();
  const { categories, loading, error } = useFetchCategories(Number(brandId));
  const navigate = useNavigate();
 
  useEffect(() => {
    if (error) {
      errorAlert({ 
        title: (
          <Caption namespace='arts' keyPrefix='categories-page'>
            fetch-categories-failed
          </Caption>
        ),
        message: error, 
      });
    }
  }, [error]); 

  const handleNaviagation = (categoryId: number) => {
    navigate(`${categoryId}/families`)
  }

  return (
    <PageLayout>
      <div className='categories-page-main'>
        <h1 className='assistant-bold'>
          <Caption namespace='arts' keyPrefix='categories-page'>
            header
          </Caption>
        </h1>

        {loading && <p>Loading...</p>}

        <div className='categories-list-container'>
           <CenteredContentShell 
              elementsWidthPx={275} 
              maxElementsPerRow={4} 
              gap={16}
            >
              {categories.map(category => (
                <EntityCard 
                  key={category.id}
                  entity={category} 
                  view={() => handleNaviagation(category.id)}
                />
              ))}
            </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}