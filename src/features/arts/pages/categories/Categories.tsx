import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchCategories } from '../../hooks';
import { filterEntities } from '../../utils';
import { ArtsHeader, EntityCard } from '../../components';

import './Categories.scss';

export default function Categories() {  
  const { brandId } = useParams();
  const { categories, loading, error } = useFetchCategories(Number(brandId));
  const [keyword, setKeyword] = useState(''); 
  const navigate = useNavigate();
 
  const filteredCategories = useMemo(() => {
    return filterEntities(categories, keyword)
  }, [categories, keyword])

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
    <PageLayout header={
      <ArtsHeader
        key="categories-header"
        keyPrefix='categories-page'
        title='header'
        search={setKeyword} /> 
      }
    >
      <div className='categories-page-main'>
        {loading && <p>Loading...</p>}

        <div className='categories-list-container'>
           <CenteredContentShell 
              elementsWidthPx={275} 
              maxElementsPerRow={4} 
              gap={16}
            >
              {filteredCategories.map(category => (
                <EntityCard 
                  key={category.id}
                  entity={category} 
                  highlightQuery={keyword}
                  view={() => handleNaviagation(category.id)}
                />
              ))}
            </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}