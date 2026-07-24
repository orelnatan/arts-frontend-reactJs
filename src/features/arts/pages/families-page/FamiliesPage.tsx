import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageLayout, ShellHeader } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import { Caption, CenteredContentShell } from '@arts/shared/components'

import { useFamiliesContext } from '../../hooks'
import { filterEntities } from '../../utils'
import { ArtsHeader, EntityCard } from '../../components'

import './FamiliesPage.scss'

export default function FamiliesPage() {
  const { brandId, categoryId } = useParams()
  const { families, loading, error, loadFamilies } = useFamiliesContext()
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const filteredFamilies = useMemo(() => {
    return filterEntities(families[Number(categoryId)], keyword) || []
  }, [families, keyword, categoryId])

  useEffect(() => {
    loadFamilies(Number(categoryId))
  }, [loadFamilies, categoryId])

  useEffect(() => {
    if (error) {
      errorAlert({
        title: (
          <Caption namespace="arts" keyPrefix="families-page">
            fetch-families-failed
          </Caption>
        ),
        message: error,
      })
    }
  }, [error])

  const showProducts = (familyId: number) => {
    navigate(`${familyId}/products`)
  }

  const redirectBack = () => {
    navigate(`/arts/brands/${brandId}/categories`)
  }

  return (
    <>
      <ShellHeader>
        <ArtsHeader
          key="families-header"
          keyPrefix="families-page"
          title="header"
          search={setKeyword}
          redirect={redirectBack}
          withRedirectArrow
        />
      </ShellHeader>

      <PageLayout>
        <div className="families-page-main">
          {loading && <p>Loading...</p>}

          <div className="families-list-container">
            <CenteredContentShell
              elementsWidthPx={275}
              maxElementsPerRow={4}
              gap={16}
            >
              {filteredFamilies.map((family) => (
                <EntityCard
                  key={family.id}
                  entity={family}
                  highlightQuery={keyword}
                  view={() => showProducts(family.id)}
                />
              ))}
            </CenteredContentShell>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
