import { useBreadcrumbsContext } from '../../hooks'
import type { Crumb } from '../../models'
import { CrumbItem } from '../crumb-item'

import './Breadcrumbs.scss'

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbsContext()

  return (
    <div className="breadcrumbs-main">
      {breadcrumbs.map((crumb: Crumb, index: number) => (
        <CrumbItem
          crumb={crumb}
          key={crumb.id + '-' + index}
          isLast={index + 1 === breadcrumbs.length}
        />
      ))}
    </div>
  )
}
