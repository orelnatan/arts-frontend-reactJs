import { useParams } from 'react-router-dom'

import { useBreadcrumbsContext } from '../../hooks'
import type { Crumb } from '../../models'
import { CrumbItem } from '../crumb-item'
import { CrumbResolver } from '../crumb-resolver'

import './Breadcrumbs.scss'

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbsContext()
  const params = useParams()

  return (
    <div className="breadcrumbs-main">
      {breadcrumbs.map((crumb: Crumb, index: number) => (
        <CrumbResolver crumb={crumb} key={crumb.id(params)}>
          {(resolvedCrumb, loading) => (
            <CrumbItem
              crumb={resolvedCrumb}
              loading={loading}
              isLast={index + 1 === breadcrumbs.length}
            />
          )}
        </CrumbResolver>
      ))}
    </div>
  )
}
