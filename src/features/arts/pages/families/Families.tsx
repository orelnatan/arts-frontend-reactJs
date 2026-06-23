import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageLayout } from '@arts/libs/layout';
import { errorAlert } from '@arts/libs/alerts';
import { Caption, CenteredContentShell } from '@arts/shared/components';

import { useFetchFamilies } from '../../hooks';
import { ArtsHeader, EntityCard } from '../../components';

import './Families.scss';

export default function Families() {  
  const { categoryId } = useParams();
  const { families, loading, error } = useFetchFamilies(Number(categoryId));
  const navigate = useNavigate();
 
  useEffect(() => {
    if (error) {
      errorAlert({ 
        title: (
          <Caption namespace='arts' keyPrefix='families-page'>
            fetch-families-failed
          </Caption>
        ),
        message: error, 
      });
    }
  }, [error]); 

  const handleNaviagation = (familyId: number) => {
    navigate(`${familyId}/products`)
  }

  return (
   <PageLayout header={
      <ArtsHeader
        keyPrefix='families-page'
        title='header' /> 
      }
    >
      <div className='families-page-main'>
        {loading && <p>Loading...</p>}

        <div className='families-list-container'>
           <CenteredContentShell 
              elementsWidthPx={275} 
              maxElementsPerRow={4} 
              gap={16}
            >
              {families.map(family => (
                <EntityCard 
                  key={family.id}
                  entity={family} 
                  view={() => handleNaviagation(family.id)}
                />
              ))}
            </CenteredContentShell>
        </div>
      </div>
    </PageLayout>
  )
}