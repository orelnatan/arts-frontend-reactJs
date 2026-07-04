import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageLayout, ShellHeader } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchCategories } from '../../hooks';
import { filterEntities } from '../../utils';
import { ArtsHeader, EntityCard } from '../../components';

import './CategoriesPage.scss';

export default function CategoriesPage() {  
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

  const showFamilies = (categoryId: number) => {
    navigate(`${categoryId}/families`)
  }

  const redirectBack = () => {
    navigate(`/arts/brands`);
  }

  return (
    <>
      <ShellHeader>
        <ArtsHeader
          key="categories-header"
          keyPrefix='categories-page'
          title='header'
          search={setKeyword}
          redirect={redirectBack}
          withRedirectArrow /> 
      </ShellHeader>

      <PageLayout>
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
                    view={() => showFamilies(category.id)}
                  />
                ))}
              </CenteredContentShell>
          </div>
        </div>
      </PageLayout>
    </>
  )
}